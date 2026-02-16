'use client';
import { useProfileQuery } from '@/store/api/auth/auth.api';
import { Avatar } from '@mantine/core';
import {
  IconCalendar,
  IconChartBar,
  IconChevronDown,
  IconChevronUp,
  IconHelpCircle,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  // useRouter
} from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const [jobManagementExpanded, setJobManagementExpanded] = useState(true);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
   const router = useRouter();

   const { data: profile} = useProfileQuery();

  // const router = useRouter();
  const pathname = usePathname();

  const logout = () => {

            deleteCookie("access_token");
        deleteCookie("refresh_token");
        router.push("/admin/login");
  }

  return (
    <div className="h-screen bg-[#0a293b] text-white flex flex-col text-sm">
      {/* Admin Section */}
      <div className="px-6 py-6 ">
        <div className="flex items-center gap-3">
          <Avatar>AS</Avatar>
          <div className="flex justify-between">
            <div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                ADMIN
              </div>
              <div className="font-medium text-nowrap">{profile?.name ||''}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#00a9ab] mx-6 mb-8"></div>

      {/* Main Navigation */}
      <div className="flex-1 px-6">
        <div className="text-sm text-gray-400 uppercase tracking-wide mb-4">
          MAIN
        </div>

        {/* Job Management */}
        <div className="mb-6">
          <button
            onClick={() => setJobManagementExpanded(!jobManagementExpanded)}
            className={`w-full flex items-center justify-between p-3 rounded-lg  hover:bg-[#00a9ab]/90 transition-colors
              ${pathname.startsWith('/admin/job') ? 'bg-[#00a9ab] text-white' : 'text-gray-400 hover:text-white'}
              `}
          >
            <div className="flex items-center gap-3">
              <IconChartBar className="w-5 h-5" />
              <span className="font-medium">Job Management</span>
            </div>
            {jobManagementExpanded ? (
              <IconChevronUp className="w-4 h-4" />
            ) : (
              <IconChevronDown className="w-4 h-4" />
            )}
          </button>

          {jobManagementExpanded && (
            <div className="mt-2 ml-4 border-l-2 border-[#00a9ab] pl-4 space-y-2">
              <Link
                href={'/admin/job'}
                className={`block ${pathname == '/admin/job' ? 'bg-[#00a9ab] px-4 font-medium text-white' : 'text-gray-400'}  py-2 rounded-lg cursor-pointer`}
              >
                All Job Posts
              </Link>
              <Link
                href={'/admin/job/+'}
                className={` block  ${
                  pathname.startsWith('/admin/job/')
                    ? 'bg-[#00a9ab] px-4 font-medium text-white'
                    : 'text-gray-400'
                } py-2 rounded-lg  cursor-pointer`}
              >
                Create New Job Post
              </Link>
              <div className="text-gray-400 py-2">Pending Approvals</div>
              <div className="text-gray-400 py-2">Expired & Closed Jobs</div>
            </div>
          )}
        </div>

        {/* Applicants */}
        <div className="mb-8">
          <div
            className={`flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-colors cursor-pointer  rounded-lg
              ${pathname.startsWith('/admin/applicants') ? 'bg-[#00a9ab] text-white' : 'text-gray-400 hover:text-white'}
              `}
          >
            <IconCalendar className="w-5 h-5" />
            <Link href="/admin/applicants">Applicants</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#00a9ab] mb-8"></div>

        {/* Settings Section */}
        <div className="mb-8">
          <div className="text-sm text-gray-400 uppercase tracking-wide mb-4">
            SETTINGS
          </div>
          <button
            onClick={() => setSettingsExpanded(!settingsExpanded)}
            className="w-full flex items-center justify-between p-3 text-gray-400 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <IconSettings className="w-5 h-5" />
              <span>Settings</span>
            </div>
            {settingsExpanded ? (
              <IconChevronUp className="w-4 h-4" />
            ) : (
              <IconChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6 space-y-4">
        {/* Zare Innovations Card */}
        <div className="bg-[#00a9ab] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-black transform rotate-12"></div>
            </div>
            <div>
              <div className="font-bold text-lg">Zare</div>
              <div className="text-sm opacity-90">Innovations</div>
            </div>
          </div>
          <div className="text-sm font-medium">Go To Zare&apos;s Site</div>
        </div>

        {/* Help */}
        <div className="flex items-center gap-3 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
          <IconHelpCircle className="w-5 h-5" />
          <span>Help</span>
        </div>

        {/* Logout */}
        <div  onClick={logout} className="flex items-center gap-3 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
          <IconLogout className="w-5 h-5" />
          <span>Logout Account</span>
        </div>
      </div>
    </div>
  );
}
