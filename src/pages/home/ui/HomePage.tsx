'use client';

import { useState } from 'react';

import { Icon } from '@/shared/config/icons';
import { Accordion } from '@/shared/ui/accordion/Accordion';
import { Alert } from '@/shared/ui/alert/Alert';
import { Avatar } from '@/shared/ui/avatar/Avatar';
import { Badge } from '@/shared/ui/badge/Badge';
import { BottomSheet } from '@/shared/ui/bottom-sheet/BottomSheet';
import { Button } from '@/shared/ui/button/Button';
import { Card } from '@/shared/ui/card/Card';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';
import { Combobox } from '@/shared/ui/combobox/Combobox';
import { DatePicker } from '@/shared/ui/date-picker/DatePicker';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Drawer } from '@/shared/ui/drawer/Drawer';
import { Dropdown } from '@/shared/ui/dropdown/Dropdown';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';
import { FileInput } from '@/shared/ui/input/FileInput';
import { Input } from '@/shared/ui/input/Input';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import { Progress } from '@/shared/ui/progress/Progress';
import { Radio, RadioGroup } from '@/shared/ui/radio/Radio';
import { Select } from '@/shared/ui/select/Select';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import { Slider } from '@/shared/ui/slider/Slider';
import { useSnackbar } from '@/shared/ui/snackbar/Snackbar';
import { Spinner } from '@/shared/ui/spinner/Spinner';
import { Stepper } from '@/shared/ui/stepper/Stepper';
import { Table, type TableColumn } from '@/shared/ui/table/Table';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { Tag } from '@/shared/ui/tag/Tag';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import { TimePicker } from '@/shared/ui/time-picker/TimePicker';
import { Toggle } from '@/shared/ui/toggle/Toggle';
import { Tooltip } from '@/shared/ui/tooltip/Tooltip';

const ROLE_OPTIONS = [
  { value: 'admin', label: '관리자' },
  { value: 'user', label: '일반 사용자' },
  { value: 'guest', label: '게스트' },
];

const COUNTRY_OPTIONS = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'fr', label: '프랑스' },
  { value: 'de', label: '독일' },
  { value: 'gb', label: '영국' },
];

interface MemberRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
}

const MEMBERS: MemberRow[] = [
  { id: 1, name: '김철수', email: 'chulsoo@example.com', role: '관리자', status: 'active' },
  { id: 2, name: '이영희', email: 'younghee@example.com', role: '일반 사용자', status: 'active' },
  { id: 3, name: '박민수', email: 'minsoo@example.com', role: '게스트', status: 'pending' },
];

const FAQ_ITEMS = [
  { value: 'q1', title: '무료 체험 기간이 있나요?', content: '네, 가입 후 14일간 모든 기능을 무료로 사용할 수 있습니다.' },
  { value: 'q2', title: '결제 수단은 무엇이 있나요?', content: '신용카드, 계좌이체, 간편결제를 지원합니다.' },
  { value: 'q3', title: '언제든 해지할 수 있나요?', content: '네, 설정 페이지에서 즉시 해지할 수 있으며 위약금은 없습니다.' },
];

const STEPS = [
  { label: '장바구니', description: '상품 확인' },
  { label: '배송 정보', description: '주소 입력' },
  { label: '결제', description: '결제 수단' },
  { label: '완료', description: '주문 완료' },
];

export function HomePage() {
  const snackbar = useSnackbar();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const [agree, setAgree] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [plan, setPlan] = useState('user');
  const [darkMode, setDarkMode] = useState(false);
  const [notify, setNotify] = useState(true);

  const [floatingValue, setFloatingValue] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState('profile');
  const [page, setPage] = useState(1);
  const [combo, setCombo] = useState<string | null>(null);
  const [volume, setVolume] = useState(40);
  const [tags, setTags] = useState(['React', 'Next.js', 'TypeScript']);
  const [tableLoading, setTableLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);

  const tableColumns: TableColumn<MemberRow>[] = [
    { key: 'name', header: '이름' },
    { key: 'email', header: '이메일' },
    {
      key: 'role',
      header: '역할',
      render: (row) => (
        <Badge variant={row.role === '관리자' ? 'primary' : 'default'}>{row.role}</Badge>
      ),
    },
    {
      key: 'status',
      header: '상태',
      align: 'center',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'warning'} dot pill>
          {row.status === 'active' ? '활성' : '대기'}
        </Badge>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl space-y-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Step 5 — 기초 컴포넌트</h1>
          <p className="mt-1 text-sm text-slate-500">
            shared/ui 에 등록된 공통 UI 컴포넌트 쇼케이스입니다.
          </p>
        </div>

        {/* Button */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Button</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<Icon name="plus" size={16} />}>아이콘 왼쪽</Button>
            <Button rightIcon={<Icon name="chevronRight" size={16} />}>아이콘 오른쪽</Button>
          </div>
        </section>

        {/* Input */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Input</h2>
          <Input
            label="이메일"
            type="email"
            placeholder="example@email.com"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />
          <Input
            label="검색"
            placeholder="검색어를 입력하세요"
            leftAddon={<Icon name="search" size={16} />}
            fullWidth
          />
          <Input label="에러 상태" placeholder="입력해주세요" error="필수 입력 항목입니다." fullWidth />
          <Input
            label="힌트 텍스트"
            placeholder="사용자명"
            hint="영문, 숫자 조합 4~20자"
            fullWidth
          />
        </section>

        {/* Input — Floating Label */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Input · Floating Label
          </h2>
          <Input
            floatingLabel
            label="이름"
            value={floatingValue}
            onChange={(e) => setFloatingValue(e.target.value)}
            fullWidth
          />
          <Input
            floatingLabel
            label="이메일"
            type="email"
            leftAddon={<Icon name="user" size={16} />}
            fullWidth
          />
          <Input floatingLabel label="비밀번호" type="password" error="8자 이상 입력해주세요." fullWidth />
        </section>

        {/* Input — File Attachment */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            File Attachment
          </h2>
          <FileInput
            label="첨부파일"
            value={files}
            onChange={setFiles}
            multiple
            accept="image/*,.pdf"
            hint="이미지 또는 PDF, 여러 개 첨부 가능"
            fullWidth
          />
        </section>

        {/* Textarea */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Textarea</h2>
          <Textarea
            label="메모"
            placeholder="내용을 입력하세요..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            rows={3}
            fullWidth
          />
          <Textarea
            label="에러 상태"
            placeholder="내용을 입력하세요..."
            error="최소 10자 이상 입력해주세요."
            fullWidth
          />
        </section>

        {/* Select */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Select</h2>
          <Select
            label="역할 선택"
            options={ROLE_OPTIONS}
            placeholder="역할을 선택하세요"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            fullWidth
          />
          <Select
            label="에러 상태"
            options={ROLE_OPTIONS}
            placeholder="선택하세요"
            error="필수 선택 항목입니다."
            fullWidth
          />
        </section>

        {/* Checkbox */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Checkbox</h2>
          <Checkbox
            label="이용약관에 동의합니다"
            description="서비스 이용을 위해 필수로 동의해야 합니다."
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <Checkbox
            label="마케팅 정보 수신 (선택)"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          <Checkbox label="비활성화 상태" disabled />
        </section>

        {/* Radio */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Radio</h2>
          <RadioGroup label="요금제 선택" value={plan} onChange={setPlan} name="plan">
            <Radio value="guest" label="게스트" description="기본 기능만 사용" />
            <Radio value="user" label="일반 사용자" description="대부분의 기능 사용" />
            <Radio value="admin" label="관리자" description="모든 기능 + 관리 권한" />
          </RadioGroup>
        </section>

        {/* Toggle */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Toggle</h2>
          <Toggle
            label="다크 모드"
            description="화면을 어두운 테마로 표시합니다."
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <Toggle
            label="알림 받기"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
          <div className="flex gap-6">
            <Toggle size="sm" label="Small" defaultChecked />
            <Toggle size="lg" label="Large" defaultChecked />
          </div>
        </section>

        {/* Badge */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Badge</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" dot pill>
              온라인
            </Badge>
            <Badge variant="warning" dot pill>
              대기중
            </Badge>
            <Badge variant="error" dot pill>
              오류
            </Badge>
            <Badge variant="primary" leftIcon={<Icon name="bell" size={12} />}>
              새 알림
            </Badge>
          </div>
        </section>

        {/* DatePicker / TimePicker */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            DatePicker · TimePicker
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DatePicker
              label="예약 날짜"
              value={date}
              onChange={setDate}
              hint="달력에서 날짜를 선택하세요"
              fullWidth
            />
            <TimePicker
              label="예약 시간"
              value={time}
              onChange={setTime}
              minuteStep={10}
              hint="10분 단위 선택"
              fullWidth
            />
          </div>
          <TimePicker label="12시간 표기" value={time} onChange={setTime} use24Hour={false} fullWidth />
        </section>

        {/* Snackbar */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Snackbar</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => snackbar.success('저장이 완료되었습니다.')}
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => snackbar.warning('필수 항목을 입력해주세요.')}
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() => snackbar.error('저장 중 오류가 발생했습니다.')}
            >
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                snackbar.info('새 업데이트가 있습니다.', {
                  actionLabel: '새로고침',
                  onAction: () => snackbar.success('새로고침했습니다.'),
                })
              }
            >
              Info + Action
            </Button>
          </div>
        </section>

        {/* Spinner */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Spinner</h2>
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="md" showLabel label="불러오는 중..." />
          </div>
        </section>

        {/* Progress */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Progress</h2>
          <Progress value={30} showLabel />
          <Progress value={70} variant="success" showLabel />
          <Progress value={90} variant="warning" showLabel />
          <Progress indeterminate />
        </section>

        {/* Skeleton */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Skeleton</h2>
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={48} height={48} />
            <div className="flex-1">
              <Skeleton variant="text" lines={3} width="100%" />
            </div>
          </div>
          <Skeleton variant="rect" width="100%" height={80} />
        </section>

        {/* Avatar */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Avatar</h2>
          <div className="flex items-center gap-4">
            <Avatar name="김철수" size="sm" />
            <Avatar name="이영희" size="md" status="online" />
            <Avatar name="박민수" size="lg" status="busy" />
            <Avatar src="https://i.pravatar.cc/100?img=12" name="유저" size="lg" status="online" />
            <Avatar name="사각형" shape="square" size="lg" />
          </div>
        </section>

        {/* Tooltip */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Tooltip</h2>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="위쪽 툴팁입니다" placement="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="아래쪽 툴팁입니다" placement="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="삭제하기" placement="right">
              <Button variant="ghost" size="sm">
                <Icon name="trash2" size={16} />
              </Button>
            </Tooltip>
          </div>
        </section>

        {/* Tabs */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Tabs</h2>
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            items={[
              { value: 'profile', label: '프로필', icon: <Icon name="user" size={16} />, content: <p className="text-sm text-slate-600 dark:text-slate-300">프로필 탭 내용입니다.</p> },
              { value: 'settings', label: '설정', icon: <Icon name="settings" size={16} />, content: <p className="text-sm text-slate-600 dark:text-slate-300">설정 탭 내용입니다.</p> },
              { value: 'noti', label: '알림', content: <p className="text-sm text-slate-600 dark:text-slate-300">알림 탭 내용입니다.</p>, disabled: true },
            ]}
          />
          <Tabs
            variant="pill"
            fullWidth
            items={[
              { value: 'day', label: '일간', content: <p className="text-sm text-slate-600 dark:text-slate-300">일간 통계</p> },
              { value: 'week', label: '주간', content: <p className="text-sm text-slate-600 dark:text-slate-300">주간 통계</p> },
              { value: 'month', label: '월간', content: <p className="text-sm text-slate-600 dark:text-slate-300">월간 통계</p> },
            ]}
          />
        </section>

        {/* Alert */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Alert</h2>
          <Alert variant="success" title="저장 완료" >변경사항이 정상적으로 저장되었습니다.</Alert>
          <Alert variant="warning" title="주의">입력값을 다시 한 번 확인해주세요.</Alert>
          {alertOpen && (
            <Alert variant="error" title="오류 발생" onClose={() => setAlertOpen(false)}>
              네트워크 연결을 확인해주세요.
            </Alert>
          )}
          <Alert variant="info">새로운 버전이 출시되었습니다.</Alert>
        </section>

        {/* Tag */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Tag · Chip</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="primary">기본</Tag>
            <Tag variant="success">성공</Tag>
            <Tag variant="info" leftIcon={<Icon name="bell" size={12} />}>알림</Tag>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((t) => (
              <Tag key={t} variant="default" onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
                {t}
              </Tag>
            ))}
            {tags.length === 0 && <span className="text-sm text-slate-400">모든 태그를 삭제했습니다.</span>}
          </div>
        </section>

        {/* Card */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Card</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Card
              title="기본 카드"
              description="설명 텍스트가 들어갑니다."
              actions={
                <Dropdown
                  align="end"
                  trigger={
                    <Button variant="ghost" size="sm">
                      <Icon name="moreHorizontal" size={18} />
                    </Button>
                  }
                  items={[
                    { label: '수정', icon: <Icon name="pencil" size={16} /> },
                    { label: '삭제', icon: <Icon name="trash2" size={16} />, danger: true, divider: true },
                  ]}
                />
              }
              footer={<Button size="sm" fullWidth>자세히 보기</Button>}
            >
              <p className="text-sm text-slate-600 dark:text-slate-300">
                카드 본문 영역입니다. 헤더, 본문, 푸터로 구성됩니다.
              </p>
            </Card>
            <Card title="호버 카드" hoverable>
              <p className="text-sm text-slate-600 dark:text-slate-300">마우스를 올리면 그림자가 강조됩니다.</p>
            </Card>
          </div>
        </section>

        {/* Dropdown */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Dropdown</h2>
          <Dropdown
            trigger={<Button variant="outline" rightIcon={<Icon name="chevronDown" size={16} />}>메뉴 열기</Button>}
            items={[
              { label: '프로필 보기', icon: <Icon name="user" size={16} /> },
              { label: '설정', icon: <Icon name="settings" size={16} /> },
              { label: '로그아웃', icon: <Icon name="logOut" size={16} />, danger: true, divider: true },
            ]}
          />
        </section>

        {/* Accordion */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Accordion</h2>
          <Accordion items={FAQ_ITEMS} defaultValue="q1" />
        </section>

        {/* Combobox */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Combobox</h2>
          <Combobox
            label="국가 검색"
            options={COUNTRY_OPTIONS}
            value={combo}
            onChange={setCombo}
            placeholder="국가를 검색하세요"
            hint="입력하여 검색할 수 있습니다"
            fullWidth
          />
        </section>

        {/* Slider */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Slider</h2>
          <Slider
            label="볼륨"
            value={volume}
            onChange={setVolume}
            showValue
            formatValue={(v) => `${v}%`}
            fullWidth
          />
        </section>

        {/* Stepper */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Stepper</h2>
          <Stepper steps={STEPS} current={2} />
        </section>

        {/* Table */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Table</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setTableLoading((v) => !v)}>
              {tableLoading ? '로딩 끄기' : '로딩 보기'}
            </Button>
          </div>
          <Table
            columns={tableColumns}
            data={tableLoading ? [] : MEMBERS}
            rowKey={(row) => row.id}
            loading={tableLoading}
            onRowClick={(row) => snackbar.info(`${row.name} 선택됨`)}
          />
        </section>

        {/* Pagination */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Pagination</h2>
          <Pagination page={page} totalPages={10} onChange={setPage} />
        </section>

        {/* EmptyState */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">EmptyState</h2>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700">
            <EmptyState
              title="아직 데이터가 없습니다"
              description="첫 항목을 추가하여 시작해보세요."
              action={<Button size="sm" leftIcon={<Icon name="plus" size={16} />}>새로 만들기</Button>}
            />
          </div>
        </section>

        {/* Dialog / BottomSheet / Drawer */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Dialog · BottomSheet · Drawer
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setDialogOpen(true)}>Dialog 열기</Button>
            <Button variant="secondary" onClick={() => setSheetOpen(true)}>
              BottomSheet 열기
            </Button>
            <Button variant="outline" onClick={() => setDrawerOpen(true)}>
              Drawer 열기
            </Button>
          </div>
        </section>
      </div>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="회원 정보 확인"
        description="아래 내용을 확인하고 저장해주세요."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setDialogOpen(false)}>저장</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="이름" placeholder="홍길동" fullWidth />
          <Input label="이메일" type="email" placeholder="hong@example.com" fullWidth />
          <Select label="역할" options={ROLE_OPTIONS} placeholder="선택" fullWidth />
        </div>
      </Dialog>

      {/* BottomSheet */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="옵션 선택"
        footer={
          <Button fullWidth onClick={() => setSheetOpen(false)}>
            확인
          </Button>
        }
      >
        <div className="space-y-3 pt-2">
          <Input label="메모" placeholder="메모를 입력하세요" fullWidth />
          <Textarea label="상세 내용" rows={3} fullWidth />
        </div>
      </BottomSheet>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="필터"
        side="right"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              초기화
            </Button>
            <Button onClick={() => setDrawerOpen(false)}>적용</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Select label="역할" options={ROLE_OPTIONS} placeholder="선택" fullWidth />
          <Checkbox label="활성 사용자만" defaultChecked />
          <Slider label="최소 점수" value={50} showValue fullWidth onChange={() => {}} />
        </div>
      </Drawer>
    </main>
  );
}
