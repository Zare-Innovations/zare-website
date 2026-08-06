import RootStyleRegistry from "@/providers/mantine";
import { Providers } from "@/store/provider";

import { NavBar } from "./_components/nav-bar";
import Footer from "./_components/footer";

// The current marketing pages are built on Mantine and use RTK Query for the
// jobs list, so both providers are still needed here. They were moved down
// from the root layout in M0 so the admin panel and the marketing site stop
// sharing one runtime. The rebuilt `(site)` route group will not include them.

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <RootStyleRegistry>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <div>{children}</div>
          <Footer />
        </div>
      </RootStyleRegistry>
    </Providers>
  );
}
