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
        className="relative rounded-control p-2 text-fg-muted hover:bg-surface-muted"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-card border border-border bg-surface shadow-popover">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-fg">알림</h3>
            <button className="text-xs text-primary-fg hover:underline">모두 읽음</button>
          </div>
          <ul className="divide-y divide-border">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={cn(
                  'flex items-start gap-3 px-4 py-3 text-sm hover:bg-surface-subtle',
                  n.unread && 'bg-primary-subtle',
                )}
              >
                <div className="mt-1 flex h-2 w-2 shrink-0 items-center justify-center">
                  {n.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-fg-secondary">{n.text}</p>
                  <p className="mt-0.5 text-xs text-fg-subtle">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-4 py-2">
            <button className="w-full text-center text-xs text-primary-fg hover:underline">
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
        className="flex items-center gap-2 rounded-control px-2 py-1.5 text-sm hover:bg-surface-muted"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-fg-on-primary">
          A
        </div>
        <span className="hidden font-medium text-fg-secondary sm:block">Admin</span>
        <ChevronDown className="h-4 w-4 text-fg-subtle" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-44 rounded-card border border-border bg-surface py-1 shadow-popover">
          {items.map((item) => (
            <button
              key={item.label}
              className="w-full px-4 py-2 text-left text-sm text-fg-secondary hover:bg-surface-subtle"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-border" />
          <button className="w-full px-4 py-2 text-left text-sm text-danger-fg hover:bg-surface-subtle">
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
    <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* 왼쪽: 햄버거 + 검색 */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-control p-2 text-fg-muted hover:bg-surface-muted lg:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <Menu className="h-5 w-5" />
          </button>

          <button className="flex items-center gap-2 rounded-control border border-border px-3 py-1.5 text-sm text-fg-muted hover:border-border-strong">
            <Search className="h-4 w-4" />
            <span className="hidden sm:block">검색...</span>
            <kbd className="hidden rounded-control-xs bg-surface-muted px-1.5 py-0.5 text-xs text-fg-subtle sm:block">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* 오른쪽: 액션들 */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleDark}
            className="rounded-control p-2 text-fg-muted hover:bg-surface-muted"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button className="rounded-control p-2 text-fg-muted hover:bg-surface-muted">
            <HelpCircle className="h-5 w-5" />
          </button>

          <NotificationDropdown />

          <div className="mx-2 h-6 w-px bg-surface-strong" />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
