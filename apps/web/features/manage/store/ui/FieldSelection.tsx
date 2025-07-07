'use client';

import { useState } from 'react';

/**
 * 분야 수단 선택 컴포넌트
 */
export default function FieldSelection() {
  const [selectedField, setSelectedField] = useState('유형 선택');
  const [urlInput, setUrlInput] = useState('');
  const [links, setLinks] = useState([
    { id: 1, type: '인스타그램', url: 'www.instagram.com/willowowl' },
    { id: 2, type: '오픈카톡', url: 'www.openkakao.com/willowowl' },
    { id: 3, type: '기타', url: 'www.instagram.com/willowowl' },
  ]);

  const handleAddLink = () => {
    if (selectedField !== '유형 선택' && urlInput.trim()) {
      const newLink = {
        id: Date.now(),
        type: selectedField,
        url: urlInput.trim(),
      };
      setLinks([...links, newLink]);
      setUrlInput('');
      setSelectedField('유형 선택');
    }
  };

  const handleRemoveLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        <h3 className="text-body-1-semibold text-label-normal">분야 수단</h3>
        <span className="text-system-error">*</span>
      </div>

      <div className="flex items-center space-x-2">
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="px-4 py-3 border border-line-normal rounded-lg focus:border-primary-normal focus:outline-none"
        >
          <option value="유형 선택">유형 선택</option>
          <option value="인스타그램">인스타그램</option>
          <option value="오픈카톡">오픈카톡</option>
          <option value="유튜브">유튜브</option>
          <option value="기타">기타</option>
        </select>

        <input
          type="text"
          placeholder="URL을 입력해주세요"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="flex-1 px-4 py-3 border border-line-normal rounded-lg 
                     focus:border-primary-normal focus:outline-none
                     placeholder:text-label-alternative"
        />

        <button
          onClick={handleAddLink}
          className="px-4 py-2 bg-primary-normal text-white rounded-lg hover:bg-primary-strong transition-colors"
        >
          <span className="text-body-2-normal">추가하기</span>
        </button>
      </div>

      {/* 추가된 링크들 */}
      {links.length > 0 && (
        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-3 bg-surface-neutral rounded-lg"
            >
              <span className="text-body-2-normal text-label-normal">
                {link.type} | {link.url}
              </span>
              <button
                onClick={() => handleRemoveLink(link.id)}
                className="text-label-alternative hover:text-system-error"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
