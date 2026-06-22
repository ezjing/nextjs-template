'use client';

import { useState } from 'react';

import { MemberFcmTable } from '@/features/member-list/ui/MemberFcmTable';
import { MemberTable } from '@/features/member-list/ui/MemberTable';

export function CommunityUsersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | undefined>(undefined);

  const handleSelectMember = (id: string, name: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setSelectedName(name);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">회원 목록</h1>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          TB_BS_MEMBER 테이블의 전체 회원을 조회합니다.
        </p>
      </div>

      <MemberTable selectedId={selectedId} onSelectId={handleSelectMember} />

      {selectedId && (
        <MemberFcmTable selectedId={selectedId} selectedName={selectedName} />
      )}
    </>
  );
}
