/**
 * 마켓 로고 업로드 컴포넌트
 */
export default function MarketLogoUpload() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-body-1-semibold text-label-normal">마켓 로고</h3>
        <span className="text-body-3-normal text-label-alternative">
          선택사항
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* 현재 로고 */}
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        </div>

        {/* 업로드 버튼 */}
        <button className="px-4 py-2 border border-line-normal rounded-lg hover:bg-surface-neutral transition-colors">
          <span className="text-body-2-normal text-label-normal">변경</span>
        </button>
      </div>

      <p className="text-body-3-normal text-label-alternative">
        250 x 250 픽셀 정사각형 권장, 5MB 이하의 JPG, PNG 파일을 지원합니다.
      </p>
    </div>
  );
}
