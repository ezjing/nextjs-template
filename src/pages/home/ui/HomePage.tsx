'use client';

import { useState } from 'react';

import { Icon } from '@/shared/config/icons';
import { BottomSheet } from '@/shared/ui/bottom-sheet/BottomSheet';
import { Button } from '@/shared/ui/button/Button';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Input } from '@/shared/ui/input/Input';
import { Select } from '@/shared/ui/select/Select';
import { Textarea } from '@/shared/ui/textarea/Textarea';

const ROLE_OPTIONS = [
  { value: 'admin', label: '관리자' },
  { value: 'user', label: '일반 사용자' },
  { value: 'guest', label: '게스트' },
];

export function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

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

        {/* Dialog / BottomSheet */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Dialog · BottomSheet
          </h2>
          <div className="flex gap-3">
            <Button onClick={() => setDialogOpen(true)}>Dialog 열기</Button>
            <Button variant="secondary" onClick={() => setSheetOpen(true)}>
              BottomSheet 열기
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
    </main>
  );
}
