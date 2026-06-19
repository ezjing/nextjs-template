'use client';

import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  AUTH_CD,
  AUTH_CD_OPTIONS,
  type AuthCd,
  type Member,
  type MemberCreateInput,
  type MemberUpdateInput,
} from '@/entities/member/model/memberTypes';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button/Button';
import { Select } from '@/shared/ui/select/Select';
import { useSnackbar } from '@/shared/ui/snackbar/Snackbar';
import { Table, type TableColumn } from '@/shared/ui/table/Table';

import { MemberFormDialog } from './MemberFormDialog';
import { useMemberListQuery } from '../model/useMemberListQuery';
import { useCreateMember, useRemoveMember, useUpdateMember } from '../model/useMemberMutations';

interface MemberTableProps {
  selectedId?: string | null;
  onSelectId?: (id: string, name: string) => void;
}

export function MemberTable({ selectedId, onSelectId }: MemberTableProps) {
  const [authCd, setAuthCd] = useState<AuthCd>(AUTH_CD.TEST);
  const { data: members = [], isLoading, isError, error } = useMemberListQuery(authCd);
  const snackbar = useSnackbar();

  const createMutation = useCreateMember();
  const updateMutation = useUpdateMember();
  const removeMutation = useRemoveMember();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Member | undefined>(undefined);

  const openCreate = () => {
    setEditTarget(undefined);
    setDialogOpen(true);
  };

  const openEdit = (member: Member) => {
    setEditTarget(member);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditTarget(undefined);
  };

  const handleSubmit = async (data: MemberCreateInput | MemberUpdateInput) => {
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, data: data as MemberUpdateInput });
        snackbar.success('회원 정보가 수정되었습니다.');
      } else {
        await createMutation.mutateAsync(data as MemberCreateInput);
        snackbar.success('회원이 등록되었습니다.');
      }
      handleClose();
    } catch {
      snackbar.error(editTarget ? '회원 수정에 실패했습니다.' : '회원 등록에 실패했습니다.');
    }
  };

  const handleDelete = async (member: Member) => {
    if (!confirm(`'${member.name}' 회원을 삭제하시겠습니까?`)) return;
    try {
      await removeMutation.mutateAsync(member.id);
      snackbar.success('회원이 삭제되었습니다.');
    } catch {
      snackbar.error('회원 삭제에 실패했습니다.');
    }
  };

  const columns: TableColumn<Member>[] = [
    { key: 'id', header: 'ID', width: 120 },
    { key: 'name', header: '이름', width: 100 },
    { key: 'employeeNo', header: '사번', width: 90 },
    { key: 'depCd', header: '부서', width: 90 },
    { key: 'position', header: '직위', width: 80 },
    { key: 'rank', header: '직급', width: 80 },
    { key: 'tel', header: '연락처', width: 130 },
    { key: 'authCd', header: '권한', width: 80 },
    {
      key: 'useYn',
      header: '사용여부',
      align: 'center',
      width: 90,
      render: (row) => (
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
            row.useYn === 'Y'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
          )}
        >
          {row.useYn === 'Y' ? '사용' : '미사용'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'center',
      width: 90,
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(row); }}
            className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-violet-600 dark:hover:bg-slate-700 dark:hover:text-violet-400"
            aria-label="수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(row); }}
            className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-700 dark:hover:text-rose-400"
            aria-label="삭제"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  if (isError) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-12 dark:border-red-800/40 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : '회원 목록을 불러오는 중 오류가 발생했습니다.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 툴바 */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <Select
            label="권한"
            options={AUTH_CD_OPTIONS}
            value={authCd}
            onChange={(e) => setAuthCd(e.target.value as AuthCd)}
            className="w-40"
          />
          <p className="pb-2 text-sm text-slate-500 dark:text-slate-400">
            {isLoading ? '불러오는 중...' : `총 ${members.length}명`}
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={openCreate}
        >
          회원 등록
        </Button>
      </div>

      {/* 테이블 */}
      <Table<Member>
        columns={columns}
        data={members}
        rowKey={(row) => row.id}
        loading={isLoading}
        loadingRows={8}
        emptyText="회원 데이터가 없습니다."
        hoverable
        onRowClick={(row) => onSelectId?.(row.id, row.name)}
        rowClassName={(row) =>
          row.id === selectedId
            ? 'bg-violet-50 dark:bg-violet-900/20 !hover:bg-violet-100'
            : undefined
        }
      />

      {/* 등록/수정 다이얼로그 */}
      <MemberFormDialog
        open={dialogOpen}
        onClose={handleClose}
        member={editTarget}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
