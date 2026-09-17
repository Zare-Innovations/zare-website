# Password-locking /portal on the server

The staff portal ships inside the website: `/portal` is part of the same
Next.js app, image and container, and deploys with it. Nothing about the
build, `Dockerfile`, `docker-compose.yaml` or `deploy.sh` changes.

What this document adds is a **temporary password lock**. The portal is still
the demo build, so until real staff sign-in exists nginx asks for a username
and password before any `/portal` page is served. It is a change to the
server's nginx configuration only, made by whoever has SSH access. About 15
minutes.

```
browser ──https──▶ nginx
                     ├─ /portal, /portal/*  ──▶ password lock ──▶ website container
                     └─ everything else     ──▶ website container, as today
```

## What the lock does and does not cover

- **Covers** every portal page and every page request: `/portal`,
  `/portal/login`, `/portal/queue` and so on, including the data requests
  Next.js makes when navigating inside the portal.
- **Does not cover** the JavaScript and CSS files under `/_next/static/`. The
  website and the portal are one app, so they share that folder, and locking
  it would lock the whole website. Those files are unlisted and named by
  content hash, but anyone who finds a portal file's URL could download it,
  and **the demo's seed data (invented names and phone numbers) is inside
  that JavaScript.** Acceptable for a demo behind a lock; it goes away when
  data comes from a database instead of being bundled. Do not put real
  candidate data into the seed.

## Before you start

- [ ] SSH access to the server, with `sudo`.
- [ ] The website is already served over HTTPS by this nginx. Basic auth
      sends the password with every request, so it must never run over plain
      HTTP. Check: `curl -sI http://zareinnovations.com | head -3` should be a
      `301` to `https://`.
- [ ] The branch containing the portal is deployed, so
      `https://zareinnovations.com/portal/login` shows the sign-in page.
      (Deploy first and add the lock straight after, or add the lock first:
      it simply guards a 404 until the deploy lands.)
- [ ] Somewhere safe to keep the password, like the team's password manager.

## 1. Create the password

```bash
sudo apt-get install -y apache2-utils          # provides htpasswd
openssl rand -base64 24                         # a strong password; save it in the password manager
sudo htpasswd -c /etc/nginx/zare-portal.htpasswd zare
sudo chown root:www-data /etc/nginx/zare-portal.htpasswd
sudo chmod 640 /etc/nginx/zare-portal.htpasswd
```

- `htpasswd` asks for the password; paste the generated one.
- `zare` is the username. Use one shared login, or one per person: run
  `htpasswd` again **without** `-c` for each extra user (`-c` overwrites the
  file).
- Keep the default hash, as shown. Do not add `-B`: nginx 1.18 on older Ubuntu
  cannot read bcrypt hashes, and everyone would be locked out.

## 2. Find how nginx reaches the website today

```bash
grep -rln "server_name.*zareinnovations.com" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/
```

Open that file. Inside the `server { ... }` block with `listen 443`, find the
`location / { ... }` block. Note its `proxy_pass` line and any `proxy_set_header`
lines. With the repo's `docker-compose.yaml` defaults the target is port
`3555`, for example `proxy_pass http://127.0.0.1:3555;`, but use whatever is
actually there.

## 3. Add the lock

**a. The rate limit zone** (the `http` block; Ubuntu's `nginx.conf` includes
`conf.d` there, check with `grep -n "conf.d" /etc/nginx/nginx.conf`):

```bash
echo 'limit_req_zone $binary_remote_addr zone=zare_portal:10m rate=10r/s;' \
  | sudo tee /etc/nginx/conf.d/zare-portal-ratelimit.conf
```

**b. Two locations**, inside the same `server` block as `location /`, anywhere
in the block. Copy the `proxy_pass` and `proxy_set_header` lines **exactly**
from the website's `location /` in place of the two example lines:

```nginx
    # ---- Zare Bench staff portal: temporary password lock -----------------
    # Remove both blocks (or just their auth_basic lines) once the portal has
    # real staff sign-in. See docs/bench/DEPLOY.md in the website repo.

    location = /portal {
        auth_basic           "Zare Bench - staff only";
        auth_basic_user_file /etc/nginx/zare-portal.htpasswd;
        limit_req            zone=zare_portal burst=60 nodelay;
        limit_req_status     429;

        proxy_pass http://127.0.0.1:3555;          # same as location /
        proxy_set_header Host $host;               # same as location /
        proxy_set_header Authorization "";         # the lock's credentials stop here
    }

    # ^~ so no regex location elsewhere in this server block can take /portal
    # requests first.
    location ^~ /portal/ {
        auth_basic           "Zare Bench - staff only";
        auth_basic_user_file /etc/nginx/zare-portal.htpasswd;
        limit_req            zone=zare_portal burst=60 nodelay;
        limit_req_status     429;

        proxy_pass http://127.0.0.1:3555;          # same as location /
        proxy_set_header Host $host;               # same as location /
        proxy_set_header Authorization "";
    }
```

Three details matter:

- **`proxy_pass` has no path after the port.** nginx then forwards `/portal/…`
  unchanged, which is what the app expects.
- **No `add_header` in these blocks.** In nginx, any `add_header` inside a
  location silently discards every `add_header` inherited from the server
  block, which would drop the site's security headers (HSTS and the like) for
  `/portal`. The app already sends `X-Robots-Tag: noindex` itself.
- **The burst of 60** lets a normal page load through (it is 20–30 requests)
  while a password-guessing script hits the 10-per-second ceiling.

**c. Test, then reload.** `reload` keeps existing connections; there is no
downtime.

```bash
sudo nginx -t && sudo systemctl reload nginx
```

If `nginx -t` reports an error, do not reload: remove the two blocks and read
the message.

## 4. Check it

```bash
# Locked without the password
curl -s -o /dev/null -w '%{http_code}\n' https://zareinnovations.com/portal/login          # 401

# Open with it
curl -s -o /dev/null -w '%{http_code}\n' -u zare https://zareinnovations.com/portal/login  # 200 (asks for the password)

# The website is unaffected and still needs no password
curl -s -o /dev/null -w '%{http_code}\n' https://zareinnovations.com/                     # 200
curl -s -o /dev/null -w '%{http_code}\n' https://zareinnovations.com/work                 # 200
```

Then in a browser, open **https://zareinnovations.com/portal**: the browser
asks for the username and password, then the Zare Bench sign-in page appears.

## Undoing it

Remove the two `location` blocks, then `sudo nginx -t && sudo systemctl reload
nginx`. The portal is then open to anyone who visits `/portal`, so only do this
once it has real sign-in, or remove the portal from the app first.

## Recommended: block repeated wrong passwords

Basic auth has no lockout of its own. fail2ban's built-in `nginx-http-auth`
filter bans an address after repeated failures:

```bash
sudo apt-get install -y fail2ban
sudo tee /etc/fail2ban/jail.d/zare-portal.local >/dev/null <<'EOF'
[nginx-http-auth]
enabled  = true
maxretry = 5
findtime = 10m
bantime  = 1h
EOF
sudo systemctl restart fail2ban
sudo fail2ban-client status nginx-http-auth
```

## Worth checking while you are there

The website's `docker-compose.yaml` publishes its container as `3555:3000`,
which Docker binds on **all** interfaces. Unless a firewall blocks it, the
site, and now the portal, is reachable at `http://<server-ip>:3555`, which
bypasses nginx, HTTPS and this lock. Check with `sudo ss -ltnp | grep 3555`.
If it shows `0.0.0.0:3555`, either firewall the port or change the mapping to
`127.0.0.1:3555:3000`. That is a change to `docker-compose.yaml`, which needs a
maintainer.
