'use client';
import { useProfileQuery } from '@/store/api/auth/auth.api';
import { siteUrl } from '@/constants';
import { Avatar, Tooltip } from '@mantine/core';
import {
  IconArchive,
  IconArrowUpRight,
  IconBriefcase,
  IconChartBar,
  IconChevronDown,
  IconChevronRight,
  IconClockHour4,
  IconFileText,
  IconHelpCircle,
  IconLogout,
  IconPlus,
  IconSettings,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons-react';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const NEW_JOB_ROUTE = '/admin/job/new';

function initialsFromName(name?: string): string {
  if (!name) return 'AD';
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((p) => p.toLowerCase() !== 'null');
  if (parts.length === 0) return 'AD';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type LeafLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  external?: boolean;
};

function NavLeaf({
  href,
  label,
  icon,
  active,
  indent,
  external,
}: LeafLink & { active: boolean; indent?: boolean }) {
  const commonClass = `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors
    ${indent ? 'ml-4 pl-4 border-l border-white/10' : ''}
    ${
      active
        ? 'bg-[#00a9ab] text-white font-medium shadow-[0_1px_0_rgba(255,255,255,0.05)]'
        : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClass}
      >
        {icon}
        <span className="flex-1">{label}</span>
        <IconArrowUpRight size={14} className="opacity-60" />
      </a>
    );
  }
  return (
    <Link href={href} className={commonClass}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const [jobsOpen, setJobsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const { data: profile } = useProfileQuery();
  const displayName = useMemo(() => {
    if (!profile?.name) return 'Admin';
    return profile.name.replace(/^null\s+/i, '').trim() || 'Admin';
  }, [profile?.name]);
  const initials = useMemo(() => initialsFromName(profile?.name), [profile?.name]);

  const logout = () => {
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    router.push('/admin/login');
  };

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="h-screen bg-[#0a293b] text-white flex flex-col text-sm">
      {/* Profile */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <Avatar
            radius="xl"
            size={40}
            styles={{
              placeholder: {
                backgroundColor: '#00a9ab',
                color: 'white',
                fontWeight: 600,
                fontSize: 14,
              },
            }}
          >
            {initials}
          </Avatar>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#00a9ab]">
              Admin
            </div>
            <Tooltip label={profile?.email ?? ''} disabled={!profile?.email}>
              <div className="font-medium truncate max-w-[160px]">
                {displayName}
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/10 mx-5" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Main
          </div>

          {/* Job Management group */}
          <div>
            <button
              onClick={() => setJobsOpen((v) => !v)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors
                ${
                  isActive('/admin/job') ||
                  isActive('/admin/pending-approvals') ||
                  isActive('/admin/expired-jobs')
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              aria-expanded={jobsOpen}
            >
              <IconChartBar size={18} />
              <span className="flex-1 text-left font-medium">Job Management</span>
              {jobsOpen ? (
                <IconChevronDown size={14} />
              ) : (
                <IconChevronRight size={14} />
              )}
            </button>

            {jobsOpen && (
              <div className="mt-1 space-y-1">
                <NavLeaf
                  href="/admin/job"
                  label="All Job Posts"
                  icon={<IconBriefcase size={16} />}
                  indent
                  active={isActive('/admin/job', true)}
                />
                <NavLeaf
                  href={NEW_JOB_ROUTE}
                  label="Create New Job Post"
                  icon={<IconPlus size={16} />}
                  indent
                  active={pathname === NEW_JOB_ROUTE}
                />
                <NavLeaf
                  href="/admin/pending-approvals"
                  label="Pending Approvals"
                  icon={<IconClockHour4 size={16} />}
                  indent
                  active={isActive('/admin/pending-approvals')}
                />
                <NavLeaf
                  href="/admin/expired-jobs"
                  label="Expired & Closed Jobs"
                  icon={<IconArchive size={16} />}
                  indent
                  active={isActive('/admin/expired-jobs')}
                />
              </div>
            )}
          </div>

          <div className="mt-1 space-y-1">
            <NavLeaf
              href="/admin/applicants"
              label="Applicants"
              icon={<IconUsers size={18} />}
              active={isActive('/admin/applicants')}
            />
            <NavLeaf
              href="/admin/users"
              label="Users"
              icon={<IconUserCircle size={18} />}
              active={isActive('/admin/users')}
            />
            <NavLeaf
              href="/admin/contract-generator"
              label="Contract Generator"
              icon={<IconFileText size={18} />}
              active={isActive('/admin/contract-generator')}
            />
          </div>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            System
          </div>
          <div className="space-y-1">
            <NavLeaf
              href="/admin/settings"
              label="Settings"
              icon={<IconSettings size={18} />}
              active={isActive('/admin/settings')}
            />
            <NavLeaf
              href="/admin/help"
              label="Help & Support"
              icon={<IconHelpCircle size={18} />}
              active={isActive('/admin/help')}
            />
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-5 space-y-3 border-t border-white/10">
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#00a9ab] to-[#0d7c8b] p-3 text-white transition hover:from-[#0dc0c3] hover:to-[#0d7c8b]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 backdrop-blur-sm">
            <span className="text-sm font-bold">Z</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold leading-tight">
              Zare Innovations
            </div>
            <div className="text-[11px] opacity-90">Visit the public site</div>
          </div>
          <IconArrowUpRight
            size={16}
            className="opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-red-500/10 transition-colors"
        >
          <IconLogout size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
