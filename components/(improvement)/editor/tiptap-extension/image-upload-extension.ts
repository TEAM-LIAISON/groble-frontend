import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { handleImageUpload } from "@/lib/tiptap-utils";

export interface ImageUploadExtensionOptions {
  /**
   * 허용되는 파일 타입들
   */
  allowedTypes: string[];
  /**
   * 최대 파일 크기 (바이트 단위)
   */
  maxFileSize: number;
  /**
   * 업로드 중 표시할 플레이스홀더 텍스트
   */
  uploadingText: string;
  /**
   * 업로드 실패 시 콜백
   */
  onError: (error: Error) => void;
  /**
   * 업로드 시작 시 콜백
   */
  onUploadStart: () => void;
  /**
   * 업로드 완료 시 콜백
   */
  onUploadComplete: () => void;
}

const uploadKey = new PluginKey("upload-image");

interface UploadPlaceholder {
  id: string;
  position: number;
  element: HTMLElement;
}

interface UploadState {
  placeholders: UploadPlaceholder[];
}

/**
 * 이미지 파일 유효성 검사
 */
function validateImageFile(
  file: File,
  allowedTypes: string[],
  maxFileSize: number,
): void {
  // 파일 타입 검증
  if (!allowedTypes.some((type) => file.type.startsWith(type))) {
    throw new Error("이미지 파일만 업로드 가능합니다.");
  }

  // 파일 크기 검증
  if (file.size > maxFileSize) {
    const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
    throw new Error(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
  }
}

/**
 * 업로드 플레이스홀더 요소 생성
 */
function createUploadPlaceholder(uploadingText: string): HTMLElement {
  const element = document.createElement("div");
  element.className = "upload-placeholder";
  element.style.cssText = `
    display: inline-block;
    padding: 12px 20px;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border: 2px dashed #9ca3af;
    border-radius: 12px;
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
    margin: 8px 0;
    text-align: center;
    min-width: 200px;
    position: relative;
    overflow: hidden;
  `;

  // 이모지와 텍스트를 분리하여 추가
  const icon = document.createElement("span");
  icon.textContent = "📤";
  icon.style.cssText = `
    display: inline-block;
    margin-right: 8px;
    font-size: 16px;
    animation: bounce 1.5s infinite;
  `;

  const text = document.createElement("span");
  text.textContent = uploadingText;

  // shimmer 효과를 위한 가상 요소
  const shimmer = document.createElement("div");
  shimmer.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
    pointer-events: none;
  `;

  element.appendChild(shimmer);
  element.appendChild(icon);
  element.appendChild(text);

  return element;
}

/**
 * 이미지 파일 업로드 처리 함수
 */
function uploadImageFile(
  file: File,
  position: number,
  view: any,
  options: ImageUploadExtensionOptions,
) {
  const {
    allowedTypes,
    maxFileSize,
    uploadingText,
    onError,
    onUploadStart,
    onUploadComplete,
  } = options;

  try {
    // 파일 유효성 검사
    validateImageFile(file, allowedTypes, maxFileSize);

    onUploadStart();

    // 플레이스홀더 생성
    const placeholderId = Math.random().toString(36).substr(2, 9);
    const placeholderElement = createUploadPlaceholder(uploadingText);

    // 플레이스홀더 추가
    const tr = view.state.tr;
    tr.setMeta(uploadKey, {
      add: {
        id: placeholderId,
        position,
        element: placeholderElement,
      },
    });
    view.dispatch(tr);

    // 비동기 업로드 실행
    handleImageUpload(file)
      .then((imageUrl) => {
        console.log("✅ 업로드 성공:", {
          fileName: file.name,
          uploadedUrl: imageUrl,
          position: position,
        });

        // 업로드 성공 시 플레이스홀더 제거 및 이미지 삽입
        const currentState = view.state;
        const newTr = currentState.tr;

        // 플레이스홀더 제거
        newTr.setMeta(uploadKey, {
          remove: { id: placeholderId },
        });

        console.log("🖼️ 이미지 노드 삽입 시도:", {
          imageUrl,
          fileName: file.name,
          position,
          hasImageSchema: !!currentState.schema.nodes.image,
        });

        // 테스트용: Base64 이미지로 먼저 삽입해보기
        const base64Url = URL.createObjectURL(file);
        console.log("🧪 테스트: Base64 이미지 삽입:", base64Url);

        // 🧪 Base64 테스트: 먼저 Base64로 이미지 삽입 시도
        const testImageNode = currentState.schema.nodes.image.create({
          src: base64Url,
          alt: `test-${file.name}`,
        });

        const testTr = currentState.tr.clone();
        testTr.insert(position + 100, testImageNode); // 조금 뒤에 삽입
        view.dispatch(testTr);
        console.log("🧪 Base64 테스트 이미지 삽입 완료");

        // 이미지 노드 생성 및 삽입
        const imageNode = currentState.schema.nodes.image.create({
          src: imageUrl,
          alt: file.name,
        });

        console.log("📦 생성된 이미지 노드:", imageNode);

        newTr.insert(position, imageNode);

        console.log("🔄 Transaction 디스패치 중...");
        view.dispatch(newTr);

        console.log("✨ 이미지 삽입 완료");

        onUploadComplete();
      })
      .catch((error) => {
        console.error("Image upload failed:", error);

        // 업로드 실패 시 플레이스홀더 제거
        const currentState = view.state;
        const newTr = currentState.tr;
        newTr.setMeta(uploadKey, {
          remove: { id: placeholderId },
        });
        view.dispatch(newTr);

        onError(
          error instanceof Error
            ? error
            : new Error("이미지 업로드에 실패했습니다."),
        );
      });
  } catch (error) {
    onError(
      error instanceof Error
        ? error
        : new Error("파일 처리 중 오류가 발생했습니다."),
    );
  }
}

export const ImageUploadExtension =
  Extension.create<ImageUploadExtensionOptions>({
    name: "imageUpload",

    addOptions() {
      return {
        allowedTypes: ["image/"],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        uploadingText: "이미지 업로드 중...",
        onError: () => {},
        onUploadStart: () => {},
        onUploadComplete: () => {},
      };
    },

    addProseMirrorPlugins() {
      const {
        allowedTypes,
        maxFileSize,
        uploadingText,
        onError,
        onUploadStart,
        onUploadComplete,
      } = this.options;

      return [
        new Plugin({
          key: uploadKey,
          state: {
            init(): UploadState {
              return { placeholders: [] };
            },
            apply(tr, state: UploadState): UploadState {
              const meta = tr.getMeta(uploadKey);
              if (meta?.add) {
                return {
                  placeholders: [...state.placeholders, meta.add],
                };
              }
              if (meta?.remove) {
                return {
                  placeholders: state.placeholders.filter(
                    (p) => p.id !== meta.remove.id,
                  ),
                };
              }
              return state;
            },
          },
          props: {
            decorations(state) {
              const pluginState = uploadKey.getState(state) as UploadState;
              if (!pluginState) return DecorationSet.empty;

              const decorations = pluginState.placeholders.map((placeholder) =>
                Decoration.widget(placeholder.position, placeholder.element),
              );

              return DecorationSet.create(state.doc, decorations);
            },

            // 드래그&드롭 처리
            handleDrop: (view, event, slice, moved) => {
              // 디버깅: 드롭 이벤트 감지 확인
              console.log("🎯 Drop 이벤트 감지:", {
                moved,
                hasDataTransfer: !!event.dataTransfer,
                files: event.dataTransfer?.files
                  ? Array.from(event.dataTransfer.files)
                  : [],
                fileTypes: event.dataTransfer?.files
                  ? Array.from(event.dataTransfer.files).map((f) => f.type)
                  : [],
              });

              if (moved || !event.dataTransfer) {
                console.log(
                  "❌ Drop 이벤트 무시: moved =",
                  moved,
                  "dataTransfer =",
                  !!event.dataTransfer,
                );
                return false;
              }

              const files = Array.from(event.dataTransfer.files);
              const imageFiles = files.filter((file) =>
                allowedTypes.some((type) => file.type.startsWith(type)),
              );

              console.log("📁 파일 필터링 결과:", {
                totalFiles: files.length,
                imageFiles: imageFiles.length,
                allowedTypes,
                imageFileNames: imageFiles.map((f) => `${f.name} (${f.type})`),
              });

              if (imageFiles.length === 0) {
                console.log("⚠️ 이미지 파일이 없어서 Drop 이벤트 종료");
                return false;
              }

              event.preventDefault();

              // 드래그 오버 클래스 제거
              view.dom.classList.remove("drag-over");

              // 드롭 위치 계산
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              if (!coordinates) {
                console.log("❌ 드롭 위치 계산 실패");
                return false;
              }

              console.log("📍 드롭 위치:", coordinates.pos);

              // 각 이미지 파일 업로드
              imageFiles.forEach((file, index) => {
                console.log(
                  `🚀 이미지 업로드 시작 (${index + 1}/${imageFiles.length}):`,
                  file.name,
                );
                uploadImageFile(file, coordinates.pos, view, {
                  allowedTypes,
                  maxFileSize,
                  uploadingText,
                  onError,
                  onUploadStart,
                  onUploadComplete,
                });
              });

              return true;
            },

            // 드래그 진입 처리
            handleDOMEvents: {
              dragenter: (view, event) => {
                event.preventDefault();
                if (event.dataTransfer?.items) {
                  const hasImages = Array.from(event.dataTransfer.items).some(
                    (item) =>
                      allowedTypes.some((type) => item.type.startsWith(type)),
                  );
                  if (hasImages) {
                    view.dom.classList.add("drag-over");
                  }
                }
                return false;
              },
              dragover: (view, event) => {
                event.preventDefault();
                return false;
              },
              dragleave: (view, event) => {
                // 에디터 영역을 완전히 벗어났을 때만 클래스 제거
                if (!view.dom.contains(event.relatedTarget as Node)) {
                  view.dom.classList.remove("drag-over");
                }
                return false;
              },
              drop: (view, event) => {
                view.dom.classList.remove("drag-over");
                return false;
              },
            },

            // 붙여넣기 처리
            handlePaste: (view, event, slice) => {
              // 디버깅: 붙여넣기 이벤트 감지 확인
              console.log("📋 Paste 이벤트 감지:", {
                hasClipboardData: !!event.clipboardData,
                files: event.clipboardData?.files
                  ? Array.from(event.clipboardData.files)
                  : [],
                fileTypes: event.clipboardData?.files
                  ? Array.from(event.clipboardData.files).map((f) => f.type)
                  : [],
              });

              if (!event.clipboardData) {
                console.log("❌ Paste 이벤트 무시: clipboardData 없음");
                return false;
              }

              const files = Array.from(event.clipboardData.files);
              const imageFiles = files.filter((file) =>
                allowedTypes.some((type) => file.type.startsWith(type)),
              );

              console.log("📁 Paste 파일 필터링 결과:", {
                totalFiles: files.length,
                imageFiles: imageFiles.length,
                allowedTypes,
                imageFileNames: imageFiles.map((f) => `${f.name} (${f.type})`),
              });

              if (imageFiles.length === 0) {
                console.log(
                  "⚠️ 붙여넣을 이미지 파일이 없어서 Paste 이벤트 종료",
                );
                return false;
              }

              event.preventDefault();

              // 현재 커서 위치에서 업로드
              const { from } = view.state.selection;
              console.log("📍 Paste 위치:", from);

              imageFiles.forEach((file, index) => {
                console.log(
                  `🚀 Paste 이미지 업로드 시작 (${index + 1}/${imageFiles.length}):`,
                  file.name,
                );
                uploadImageFile(file, from, view, {
                  allowedTypes,
                  maxFileSize,
                  uploadingText,
                  onError,
                  onUploadStart,
                  onUploadComplete,
                });
              });

              return true;
            },
          },
        }),
      ];
    },
  });

export default ImageUploadExtension;
