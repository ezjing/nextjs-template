'use client';

import { useEffect, useState } from 'react';

import type { Member, MemberCreateInput, MemberUpdateInput } from '@/entities/member/model/memberTypes';
import { Button } from '@/shared/ui/button/Button';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Input } from '@/shared/ui/input/Input';
import { Select } from '@/shared/ui/select/Select';

interface MemberFormDialogProps {
  open: boolean;
  onClose: () => void;
  /** undefined이면 등록, Member이면 수정 */
  member?: Member;
  onSubmit: (data: MemberCreateInput | MemberUpdateInput) => void;
  loading?: boolean;
}

const USE_YN_OPTIONS = [
  { value: 'Y', label: '사용' },
  { value: 'N', label: '미사용' },
];

const EMPTY_FORM = {
  coCd: '',
  id: '',
  name: '',
  pw: '',
  employeeNo: '',
  tel: '',
  depCd: '',
  position: '',
  rank: '',
  authCd: '',
  custCd: '',
  useYn: 'Y',
  tbmYn: 'N',
  approvalYn: 'N',
};

export function MemberFormDialog({ open, onClose, member, onSubmit, loading }: MemberFormDialogProps) {
  const isEdit = !!member;
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY_FORM, string>>>({});

  useEffect(() => {
    if (open) {
      if (member) {
        setForm({
          coCd: member.coCd ?? '',
          id: member.id ?? '',
          name: member.name ?? '',
          pw: '',
          employeeNo: member.employeeNo ?? '',
          tel: member.tel ?? '',
          depCd: member.depCd ?? '',
          position: member.position ?? '',
          rank: member.rank ?? '',
          authCd: member.authCd ?? '',
          custCd: member.custCd ?? '',
          useYn: member.useYn ?? 'Y',
          tbmYn: member.tbmYn ?? 'N',
          approvalYn: member.approvalYn ?? 'N',
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setErrors({});
    }
  }, [open, member]);

  const set = (key: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = '이름은 필수 항목입니다.';
    if (!isEdit) {
      if (!form.coCd.trim()) next.coCd = '회사코드는 필수 항목입니다.';
      if (!form.id.trim()) next.id = 'ID는 필수 항목입니다.';
      if (!form.pw.trim()) next.pw = '비밀번호는 필수 항목입니다.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit) {
      const updateData: MemberUpdateInput = {
        name: form.name,
        employeeNo: form.employeeNo || undefined,
        tel: form.tel || undefined,
        depCd: form.depCd || undefined,
        position: form.position || undefined,
        rank: form.rank || undefined,
        authCd: form.authCd || undefined,
        custCd: form.custCd || undefined,
        useYn: form.useYn,
        tbmYn: form.tbmYn || undefined,
        approvalYn: form.approvalYn || undefined,
      };
      onSubmit(updateData);
    } else {
      const createData: MemberCreateInput = {
        coCd: form.coCd,
        id: form.id,
        name: form.name,
        pw: form.pw,
        employeeNo: form.employeeNo || undefined,
        tel: form.tel || undefined,
        depCd: form.depCd || undefined,
        position: form.position || undefined,
        rank: form.rank || undefined,
        authCd: form.authCd || undefined,
        custCd: form.custCd || undefined,
        useYn: form.useYn,
        tbmYn: form.tbmYn || undefined,
        approvalYn: form.approvalYn || undefined,
      };
      onSubmit(createData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEdit ? '회원 수정' : '회원 등록'}
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            취소
          </Button>
          <Button form="member-form" type="submit" loading={loading}>
            {isEdit ? '수정' : '등록'}
          </Button>
        </div>
      }
    >
      <form id="member-form" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* 등록 전용 필드 */}
        {!isEdit && (
          <>
            <Input label="회사코드 *" value={form.coCd} onChange={set('coCd')} error={errors.coCd} fullWidth />
            <Input label="ID *" value={form.id} onChange={set('id')} error={errors.id} fullWidth />
            <Input label="비밀번호 *" type="password" value={form.pw} onChange={set('pw')} error={errors.pw} fullWidth />
          </>
        )}

        {/* 공통 필드 */}
        <Input
          label="이름 *"
          value={form.name}
          onChange={set('name')}
          error={errors.name}
          fullWidth
          className={!isEdit ? '' : 'col-span-2'}
        />
        <Input label="사번" value={form.employeeNo} onChange={set('employeeNo')} fullWidth />
        <Input label="연락처" value={form.tel} onChange={set('tel')} fullWidth />
        <Input label="부서코드" value={form.depCd} onChange={set('depCd')} fullWidth />
        <Input label="직위" value={form.position} onChange={set('position')} fullWidth />
        <Input label="직급" value={form.rank} onChange={set('rank')} fullWidth />
        <Input label="권한코드" value={form.authCd} onChange={set('authCd')} fullWidth />
        <Select
          label="사용여부"
          options={USE_YN_OPTIONS}
          value={form.useYn}
          onChange={set('useYn')}
          fullWidth
        />
        <Select
          label="TBM여부"
          options={USE_YN_OPTIONS}
          value={form.tbmYn}
          onChange={set('tbmYn')}
          fullWidth
        />
        <Select
          label="승인여부"
          options={USE_YN_OPTIONS}
          value={form.approvalYn}
          onChange={set('approvalYn')}
          fullWidth
        />
      </form>
    </Dialog>
  );
}
