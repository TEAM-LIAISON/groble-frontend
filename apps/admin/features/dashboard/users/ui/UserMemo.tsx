import { Button, TextAreaTextField } from '@groble/ui';
import React, { useState } from 'react';
import { updateAdminMemo } from '../model/userApi';

export default function UserMemo({
  adminMemo,
  nickname,
}: {
  adminMemo?: string;
  nickname: string;
}) {
  const [memo, setMemo] = useState(adminMemo || '');
  const [savedMemo, setSavedMemo] = useState(adminMemo || '');

  const isChanged = memo !== savedMemo; // 변경 여부 판단 (서버 저장된 내용과 비교)

  const handleUpdateMemo = async () => {
    try {
      const response = await updateAdminMemo(nickname, memo);
      if (response.code === 200) {
        alert('관리자 메모가 수정되었습니다.');
        // 입력값은 그대로 유지하고, 저장 기준값만 현재 입력값으로 갱신
        setSavedMemo(memo);
      } else {
        alert('관리자 메모 수정에 실패했습니다.');
      }
    } catch (e) {
      alert('관리자 메모 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className=" bg-white py-6 px-8 mt-4 rounded-2xl flex flex-col gap-3">
        <h3 className="text-headline-1 font-bold text-label-normal">메모</h3>
        <TextAreaTextField
          type="border"
          className=""
          rows={3}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

        <div className="w-full flex justify-end">
          <Button
            onClick={isChanged ? handleUpdateMemo : undefined}
            group="solid"
            type="secondary"
            size="small"
            disabled={!isChanged}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
