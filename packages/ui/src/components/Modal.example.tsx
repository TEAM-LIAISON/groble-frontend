import React, { useState } from 'react';
import Modal from './Modal';

// 기본 사용 예시
export const BasicModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        모달 열기
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="판매자로 전환할까요?"
        subText="언제든 구매자로 전환할 수 있어요"
        actionButton="전환하기"
        secondaryButton="닫기"
        onActionClick={handleConfirm}
      />
    </div>
  );
};

// 위험한 액션 모달 예시
export const DangerModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        삭제 모달 열기
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="정말 삭제하시겠습니까?"
        subText="삭제된 데이터는 복구할 수 없습니다"
        actionButton="삭제하기"
        secondaryButton="취소"
        onActionClick={handleDelete}
        actionButtonColor="danger"
      />
    </div>
  );
};

// 간단한 확인 모달 예시 (subText 없음)
export const SimpleModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        간단한 모달 열기
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="작업을 완료하시겠습니까?"
        actionButton="확인"
        onActionClick={handleConfirm}
      />
    </div>
  );
};

// Textarea 포함 모달 예시
export const TextareaModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const handleSubmit = () => {
    setIsModalOpen(false);
    setTextareaValue(''); // 모달 닫힐 때 초기화
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTextareaValue(''); // 모달 닫힐 때 초기화
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        피드백 모달 열기
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        title="피드백을 보내주세요"
        subText="여러분의 의견이 서비스 개선에 도움이 됩니다"
        actionButton="제출하기"
        secondaryButton="취소"
        onActionClick={handleSubmit}
        onSecondaryClick={handleClose}
        hasTextarea={true}
        textareaValue={textareaValue}
        onTextareaChange={setTextareaValue}
        textareaPlaceholder="피드백을 입력해 주세요..."
        textareaLabel="피드백 내용"
        textareaRequired={true}
        textareaMaxLength={500}
        textareaRows={5}
      />
    </div>
  );
};

// 신고하기 모달 예시 (위험한 액션 + textarea)
export const ReportModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const handleReport = () => {
    setIsModalOpen(false);
    setReportReason('');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setReportReason('');
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        신고하기 모달 열기
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        title="신고하기"
        subText="신고 사유를 자세히 작성해 주세요"
        actionButton="신고 제출"
        secondaryButton="취소"
        onActionClick={handleReport}
        onSecondaryClick={handleClose}
        actionButtonColor="danger"
        hasTextarea={true}
        textareaValue={reportReason}
        onTextareaChange={setReportReason}
        textareaPlaceholder="신고 사유를 상세히 입력해 주세요..."
        textareaLabel="신고 사유"
        textareaRequired={true}
        textareaMaxLength={1000}
        textareaRows={6}
      />
    </div>
  );
};
