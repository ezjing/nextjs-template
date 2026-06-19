/**
 * Lucide 아이콘 래핑 — ICON_TYPES에 등록 후 name으로 사용
 *
 * @example
 * import { Icon } from '@/shared/config/icons';
 *
 * function MyComponent() {
 *   return (
 *     <div>
 *       <Icon name="home" size={20} className="text-blue-500" />
 *       <Icon name="settings" />
 *     </div>
 *   );
 * }
 */
import {
  Home,
  LogIn,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Check,
  Info,
  User,
  Settings,
  Bell,
  Calendar,
  Clock,
  Paperclip,
  Upload,
  FileText,
  MoreHorizontal,
  MoreVertical,
  Inbox,
  type LucideIcon,
} from 'lucide-react';

export const ICON_TYPES = {
  home: Home,
  user: User,
  settings: Settings,
  bell: Bell,
  logIn: LogIn,
  logOut: LogOut,
  menu: Menu,
  x: X,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  search: Search,
  plus: Plus,
  pencil: Pencil,
  trash2: Trash2,
  alertCircle: AlertCircle,
  alertTriangle: AlertTriangle,
  checkCircle: CheckCircle,
  check: Check,
  info: Info,
  calendar: Calendar,
  clock: Clock,
  paperclip: Paperclip,
  upload: Upload,
  fileText: FileText,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,
  inbox: Inbox,
} satisfies Record<string, LucideIcon>;

export type IconType = keyof typeof ICON_TYPES;

export interface IconProps {
  name: IconType;
  size?: number | string;
  className?: string;
}

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const TargetIcon = ICON_TYPES[name];

  if (!TargetIcon) {
    console.warn(`Icon "${name}"을 찾을 수 없습니다.`);
    return null;
  }

  return <TargetIcon size={size} className={className} {...props} />;
}
