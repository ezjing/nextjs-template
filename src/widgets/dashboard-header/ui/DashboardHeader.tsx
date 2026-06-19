'use client';

import { Bell, ChevronDown, HelpCircle, Menu, Moon, Search, Sun } from 'lucide-react';
import { useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface Notification {
  id: number;
  text: string;
  time: string;
  unread: boolean;
}

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    { id: 1, text: '새 주문이 접수되었습니다', time: '2분 전', unread: true },
    { id: 2, text: '서버 CPU 사용률 90% 초과', time: '15분 전', unread: true },
    { id: 3, text: '월간 리포트가 준비되었습니다', time: '1시간 전', unread: false },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">알림</h3>
            <button className="text-xs text-violet-600 hover:underline">모두 읽음</button>
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={cn(
                  'flex items-start gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50',
                  n.unread && 'bg-violet-50/50 dark:bg-violet-900/10',
                )}
              >
                <div className="mt-1 flex h-2 w-2 shrink-0 items-center justify-center">
                  {n.unread && <span className="h-2 w-2 rounded-full bg-violet-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-200">{n.text}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 px-4 py-2 dark:border-gray-700">
            <button className="w-full text-center text-xs text-violet-600 hover:underline">
              모든 알림 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);

  const items = [
    { label: '내 프로필', path: '/profile' },
    { label: '설정', path: '/settings/account' },
    { label: '도움말', path: '/help' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
          A
        </div>
        <span className="hidden font-medium text-gray-700 dark:text-gray-200 sm:block">Admin</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {items.map((item) => (
            <button
              key={item.label}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-gray-100 dark:border-gray-700" />
          <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function DashboardHeader({ sidebarOpen, setSidebarOpen }: DashboardHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode((v) => !v);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* 왼쪽: 햄버거 + 검색 */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <Menu className="h-5 w-5" />
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:border-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500">
            <Search className="h-4 w-4" />
            <span className="hidden sm:block">검색...</span>
            <kbd className="hidden rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-400 dark:bg-gray-700 sm:block">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* 오른쪽: 액션들 */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleDark}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <HelpCircle className="h-5 w-5" />
          </button>

          <NotificationDropdown />

          <div className="mx-2 h-6 w-px bg-gray-200 dark:bg-gray-700" />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
