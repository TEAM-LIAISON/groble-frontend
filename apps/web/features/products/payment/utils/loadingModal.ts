// 로딩 모달 생성 함수
export const createLoadingModal = (): HTMLElement => {
  const overlay = document.createElement("div");
  overlay.id = "payment-loading-modal";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    text-align: center;
    min-width: 300px;
    max-width: 400px;
  `;

  // 로딩 스피너
  const spinner = document.createElement("div");
  spinner.style.cssText = `
    width: 48px;
    height: 48px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1.5rem;
  `;

  // 제목
  const title = document.createElement("h3");
  title.textContent = "결제 완료 처리 중...";
  title.style.cssText = `
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.5rem;
    line-height: 1.5;
  `;

  // 부제목
  const subtitle = document.createElement("p");
  subtitle.textContent = "잠시만 기다려 주세요.";
  subtitle.style.cssText = `
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
  `;

  // 스피너 애니메이션 CSS 추가
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  // DOM 구성
  modal.appendChild(spinner);
  modal.appendChild(title);
  modal.appendChild(subtitle);
  overlay.appendChild(modal);
  document.head.appendChild(style);

  return overlay;
};

// 로딩 모달 제거 함수
export const removeLoadingModal = () => {
  const modal = document.getElementById("payment-loading-modal");
  if (modal) {
    document.body.removeChild(modal);
  }
};

// 로딩 모달 표시 함수 (생성 + 추가)
export const showLoadingModal = (): HTMLElement => {
  const modal = createLoadingModal();
  document.body.appendChild(modal);
  return modal;
};

// 커스텀 메시지를 가진 로딩 모달 생성 함수
export const createCustomLoadingModal = (
  title: string = "결제 완료 처리 중...",
  subtitle: string = "잠시만 기다려 주세요.",
): HTMLElement => {
  const overlay = createLoadingModal();

  // 기존 텍스트 요소들 찾아서 교체
  const titleElement = overlay.querySelector("h3");
  const subtitleElement = overlay.querySelector("p");

  if (titleElement) titleElement.textContent = title;
  if (subtitleElement) subtitleElement.textContent = subtitle;

  return overlay;
};
