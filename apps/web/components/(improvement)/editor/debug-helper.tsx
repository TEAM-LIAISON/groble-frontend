'use client';

import { useEffect, useState } from 'react';

interface DebugLog {
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
}

export function ImageUploadDebugHelper() {
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 콘솔 로그를 가로채서 디버그 패널에 표시
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    const addLog = (type: DebugLog['type'], message: string) => {
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-49), { timestamp, type, message }]);
    };

    console.error = (...args) => {
      originalConsoleError(...args);
      const message = args.join(' ');
      if (
        message.includes('ImageUpload') ||
        message.includes('이미지') ||
        message.includes('업로드') ||
        message.includes('💥')
      ) {
        addLog('error', message);
      }
    };

    console.warn = (...args) => {
      originalConsoleWarn(...args);
      const message = args.join(' ');
      if (message.includes('⚠️')) {
        addLog('warning', message);
      }
    };

    // 키보드 단축키로 디버그 패널 토글 (Ctrl+Shift+D)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      console.warn = originalConsoleWarn;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const clearLogs = () => setLogs([]);

  const getLogColor = (type: DebugLog['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-700"
          title="디버그 패널 열기 (Ctrl+Shift+D)"
        >
          🐛 디버그
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex h-96 w-96 flex-col rounded-lg border border-gray-700 bg-gray-900 shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-700 p-3">
        <h3 className="text-sm font-semibold text-white">
          🐛 이미지 업로드 디버그
        </h3>
        <div className="flex gap-2">
          <button
            onClick={clearLogs}
            className="rounded px-2 py-1 text-xs text-gray-400 hover:text-white"
            title="로그 지우기"
          >
            🗑️
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="rounded px-2 py-1 text-xs text-gray-400 hover:text-white"
            title="닫기"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto p-3 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            아직 로그가 없습니다.
            <br />
            이미지를 드래그하거나 붙여넣기해보세요.
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="shrink-0 text-gray-500">{log.timestamp}</span>
              <span className={`${getLogColor(log.type)} break-all`}>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-700 p-3 text-xs text-gray-400">
        <div className="mb-1">💡 디버깅 팁:</div>
        <div>• 네트워크 탭에서 API 요청 확인</div>
        <div>• CORS 에러가 있는지 콘솔 확인</div>
        <div>• 파일 크기와 타입 제한 확인</div>
        <div>• Ctrl+Shift+D로 패널 토글</div>
      </div>
    </div>
  );
}

export default ImageUploadDebugHelper;
