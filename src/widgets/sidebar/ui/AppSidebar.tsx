'use client';

import {
  BarChart2,
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  PanelLeft,
  PanelLeftClose,
  Settings,
  ShoppingCart,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface NavChild {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  path?: string;
  exact?: boolean;
  badge?: number;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/',
    exact: true,
  },
  {
    label: 'Analytics',
    icon: BarChart2,
    path: '/analytics',
  },
  {
    label: 'E-Commerce',
    icon: ShoppingCart,
    children: [
      { label: 'Customers', path: '/ecommerce/customers' },
      { label: 'Orders', path: '/ecommerce/orders' },
      { label: 'Invoices', path: '/ecommerce/invoices' },
    ],
  },
  {
    label: 'Community',
    icon: Users,
    children: [
      { label: 'Users', path: '/community/users' },
      { label: 'Profile', path: '/community/profile' },
      { label: 'Feed', path: '/community/feed' },
    ],
  },
  {
    label: 'Inbox',
    icon: Inbox,
    path: '/inbox',
    badge: 4,
  },
  {
    label: 'Calendar',
    icon: Calendar,
    path: '/calendar',
  },
  {
    label: 'Settings',
    icon: Settings,
    children: [
      { label: 'My Account', path: '/settings/account' },
      { label: 'Notifications', path: '/settings/notifications' },
      { label: 'Plans', path: '/settings/plans' },
    ],
  },
];

interface NavGroupProps {
  item: NavItem;
  setSidebarExpanded: (expanded: boolean) => void;
}

function NavGroup({ item, setSidebarExpanded }: NavGroupProps) {
  const pathname = usePathname();
  const isChildActive = item.children?.some((c) => pathname === c.path) ?? false;
  const [open, setOpen] = useState(isChildActive);

  return (
    <li>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          setSidebarExpanded(true);
        }}
        className={cn(
          'flex w-full items-center gap-3 rounded-control px-3 py-2 text-sm font-medium transition-colors',
          isChildActive
            ? 'bg-primary-subtle text-primary-fg'
            : 'text-fg-secondary hover:bg-surface-muted',
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        <span className="sidebar-label flex-1 text-left">{item.label}</span>
        <ChevronDown
          className={cn(
            'sidebar-label h-4 w-4 shrink-0 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <ul className="mt-1 space-y-0.5 pl-8">
          {item.children?.map((child) => {
            const isActive = pathname === child.path;
            return (
              <li key={child.path}>
                <Link
                  href={child.path}
                  className={cn(
                    'block rounded-control px-3 py-1.5 text-sm transition-colors',
                    isActive
                      ? 'text-primary-fg'
                      : 'text-fg-muted hover:text-fg-secondary',
                  )}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

interface AppSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AppSidebar({ sidebarOpen, setSidebarOpen }: AppSidebarProps) {
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    // localStorage(외부 시스템)에서 저장된 사이드바 상태를 마운트 후 1회 동기화
    const stored = localStorage.getItem('sidebar-expanded');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored !== null) setSidebarExpanded(stored === 'true');
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* 모바일 backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-overlay transition-opacity lg:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
      />

      {/* 사이드바 */}
      <div
        id="sidebar"
        ref={sidebar}
        className={cn(
          'no-scrollbar fixed left-0 top-0 z-40 flex h-screen w-64 flex-col overflow-y-scroll bg-surface transition-all duration-300 ease-in-out lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:overflow-y-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-64',
          !sidebarExpanded && 'lg:w-[70px]',
        )}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-control bg-primary">
              <Zap className="h-5 w-5 text-fg-on-primary" />
            </div>
            <span
              className={cn(
                'sidebar-label text-lg font-bold text-fg',
                !sidebarExpanded && 'lg:hidden',
              )}
            >
              Mosaic
            </span>
          </Link>

          {/* 모바일 닫기 버튼 */}
          <button
            ref={trigger}
            className="text-fg-subtle hover:text-fg-secondary lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        </div>

        {/* 구분선 */}
        <div className="mx-4 mb-4 border-t border-border" />

        {/* 네비게이션 */}
        <nav className="flex-1 px-3">
          <p
            className={cn(
              'sidebar-label mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-fg-subtle',
              !sidebarExpanded && 'lg:hidden',
            )}
          >
            Pages
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <NavGroup key={item.label} item={item} setSidebarExpanded={setSidebarExpanded} />
              ) : (
                <li key={item.path}>
                  <Link
                    href={item.path ?? '/'}
                    className={cn(
                      'flex items-center gap-3 rounded-control px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.path
                        ? 'bg-primary-subtle text-primary-fg'
                        : 'text-fg-secondary hover:bg-surface-muted',
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={cn('sidebar-label flex-1', !sidebarExpanded && 'lg:hidden')}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="sidebar-label flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-fg-on-primary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* 접기/펼치기 버튼 (데스크탑 전용) */}
        <div className="mt-auto hidden p-4 lg:block">
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="flex w-full items-center justify-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-fg-muted hover:bg-surface-subtle"
          >
            {sidebarExpanded ? (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span className="sidebar-label">Collapse</span>
              </>
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
