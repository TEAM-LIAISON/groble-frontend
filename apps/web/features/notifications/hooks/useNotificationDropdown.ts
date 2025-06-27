import { useState, useEffect, useRef } from 'react';

interface UseNotificationDropdownProps {
  onClose?: () => void;
}

/**
 * 알림 드롭다운 상태 관리 훅
 */
export const useNotificationDropdown = ({
  onClose,
}: UseNotificationDropdownProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        closeDropdown();
        setIsDeleteMode(false);
      }
    };

    // 모바일에서 드롭다운이 열렸을 때 스크롤 방지
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 버튼 재클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!buttonRef.current?.contains(e.target as Node)) {
        return;
      }
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isOpen]);

  // 드롭다운이 닫힐 때 삭제 모드도 종료
  useEffect(() => {
    if (!isOpen) {
      setIsDeleteMode(false);
    }
  }, [isOpen]);

  return {
    isOpen,
    isDeleteMode,
    dropdownRef,
    buttonRef,
    toggleDropdown,
    closeDropdown,
    toggleDeleteMode,
  };
};
