import { Modal } from '@groble/ui';

interface ModalState {
  isOpen: boolean;
  contentId: number | null;
}

interface ProductsPageModalsProps {
  editModal: ModalState;
  deleteModal: ModalState;
  stopModal: ModalState;
  cannotDeleteModal: ModalState;
  cannotSaleModal: ModalState;
  setEditModal: (state: ModalState) => void;
  setDeleteModal: (state: ModalState) => void;
  setStopModal: (state: ModalState) => void;
  setCannotDeleteModal: (state: ModalState) => void;
  setCannotSaleModal: (state: ModalState) => void;
  handlers: {
    handleEditContent: (contentId: number) => void;
    handleDeleteContent: (contentId: number) => void;
    handleStopContent: (contentId: number) => void;
  };
}

export default function ProductsPageModals({
  editModal,
  deleteModal,
  stopModal,
  cannotDeleteModal,
  cannotSaleModal,
  setEditModal,
  setDeleteModal,
  setStopModal,
  setCannotDeleteModal,
  setCannotSaleModal,
  handlers,
}: ProductsPageModalsProps) {
  return (
    <>
      {/* 수정하기 모달 */}
      <Modal
        isOpen={editModal.isOpen}
        onRequestClose={() => setEditModal({ isOpen: false, contentId: null })}
        title="정말 수정하시겠습니까?"
        subText="수정을 시작하면 편집 페이지로 이동됩니다."
        actionButton="수정하기"
        secondaryButton="취소"
        onActionClick={() =>
          editModal.contentId && handlers.handleEditContent(editModal.contentId)
        }
      />

      {/* 삭제하기 모달 */}
      <Modal
        isOpen={deleteModal.isOpen}
        onRequestClose={() =>
          setDeleteModal({ isOpen: false, contentId: null })
        }
        title="정말 삭제하시겠습니까?"
        subText="삭제된 콘텐츠는 복구할 수 없습니다."
        actionButton="삭제하기"
        secondaryButton="취소"
        onActionClick={() =>
          deleteModal.contentId &&
          handlers.handleDeleteContent(deleteModal.contentId)
        }
        actionButtonColor="danger"
      />

      {/* 중단하기 모달 */}
      <Modal
        isOpen={stopModal.isOpen}
        onRequestClose={() => setStopModal({ isOpen: false, contentId: null })}
        title="판매를 중단할까요?"
        subText={[
          '언제든 다시 시작할 수 있어요.',
          '[작성중]에서 판매하기를 선택해주세요.',
        ]}
        actionButton="중단하기"
        secondaryButton="취소"
        onActionClick={() =>
          stopModal.contentId && handlers.handleStopContent(stopModal.contentId)
        }
        actionButtonColor="primary"
      />

      {/* 삭제할 수 없어요 모달 */}
      <Modal
        isOpen={cannotDeleteModal.isOpen}
        onRequestClose={() =>
          setCannotDeleteModal({ isOpen: false, contentId: null })
        }
        title="삭제할 수 없어요"
        subText={[
          '판매된 이력이 있는 상품은 삭제할 수 없습니다.',
          '판매를 멈추려면 [중단하기] 버튼을 눌러주세요.',
        ]}
        actionButton="중단하기"
        secondaryButton="취소"
        onActionClick={() =>
          cannotDeleteModal.contentId &&
          handlers.handleStopContent(cannotDeleteModal.contentId)
        }
        actionButtonColor="primary"
      />

      {/* 아직 판매할 수 없어요 모달 */}
      <Modal
        isOpen={cannotSaleModal.isOpen}
        onRequestClose={() =>
          setCannotSaleModal({ isOpen: false, contentId: null })
        }
        title="아직 판매할 수 없어요"
        subText="판매를 위해 필요한 내용을 먼저 채워주세요."
        actionButton="수정하기"
        secondaryButton="취소"
        onActionClick={() =>
          cannotSaleModal.contentId &&
          handlers.handleEditContent(cannotSaleModal.contentId)
        }
        actionButtonColor="primary"
      />
    </>
  );
}
