import type { Attrs, Node } from "@tiptap/pm/model";
import type { Editor } from "@tiptap/react";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Checks if a mark exists in the editor schema
 * @param markName - The name of the mark to check
 * @param editor - The editor instance
 * @returns boolean indicating if the mark exists in the schema
 */
export const isMarkInSchema = (
  markName: string,
  editor: Editor | null,
): boolean => {
  if (!editor?.schema) return false;
  return editor.schema.spec.marks.get(markName) !== undefined;
};

/**
 * Checks if a node exists in the editor schema
 * @param nodeName - The name of the node to check
 * @param editor - The editor instance
 * @returns boolean indicating if the node exists in the schema
 */
export const isNodeInSchema = (
  nodeName: string,
  editor: Editor | null,
): boolean => {
  if (!editor?.schema) return false;
  return editor.schema.spec.nodes.get(nodeName) !== undefined;
};

/**
 * Gets the active attributes of a specific mark in the current editor selection.
 *
 * @param editor - The Tiptap editor instance.
 * @param markName - The name of the mark to look for (e.g., "highlight", "link").
 * @returns The attributes of the active mark, or `null` if the mark is not active.
 */
export function getActiveMarkAttrs(
  editor: Editor | null,
  markName: string,
): Attrs | null {
  if (!editor) return null;
  const { state } = editor;
  const marks = state.storedMarks || state.selection.$from.marks();
  const mark = marks.find((mark) => mark.type.name === markName);

  return mark?.attrs ?? null;
}

/**
 * Checks if a node is empty
 */
export function isEmptyNode(node?: Node | null): boolean {
  return !!node && node.content.size === 0;
}

/**
 * Utility function to conditionally join class names into a single string.
 * Filters out falsey values like false, undefined, null, and empty strings.
 *
 * @param classes - List of class name strings or falsey values.
 * @returns A single space-separated string of valid class names.
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Finds the position and instance of a node in the document
 * @param props Object containing editor, node (optional), and nodePos (optional)
 * @param props.editor The TipTap editor instance
 * @param props.node The node to find (optional if nodePos is provided)
 * @param props.nodePos The position of the node to find (optional if node is provided)
 * @returns An object with the position and node, or null if not found
 */
export function findNodePosition(props: {
  editor: Editor | null;
  node?: Node | null;
  nodePos?: number | null;
}): { pos: number; node: Node } | null {
  const { editor, node, nodePos } = props;

  if (!editor || !editor.state?.doc) return null;

  // Zero is valid position
  const hasValidNode = node !== undefined && node !== null;
  const hasValidPos = nodePos !== undefined && nodePos !== null;

  if (!hasValidNode && !hasValidPos) {
    return null;
  }

  if (hasValidPos) {
    try {
      const nodeAtPos = editor.state.doc.nodeAt(nodePos!);
      if (nodeAtPos) {
        return { pos: nodePos!, node: nodeAtPos };
      }
    } catch (error) {
      console.error("Error checking node at position:", error);
      return null;
    }
  }

  // Otherwise search for the node in the document
  let foundPos = -1;
  let foundNode: Node | null = null;

  editor.state.doc.descendants((currentNode, pos) => {
    // TODO: Needed?
    // if (currentNode.type && currentNode.type.name === node!.type.name) {
    if (currentNode === node) {
      foundPos = pos;
      foundNode = currentNode;
      return false;
    }
    return true;
  });

  return foundPos !== -1 && foundNode !== null
    ? { pos: foundPos, node: foundNode }
    : null;
}

/**
 * Handles image upload with progress tracking and abort capability
 * @param file The file to upload
 * @param onProgress Optional callback for tracking upload progress
 * @param abortSignal Optional AbortSignal for cancelling the upload
 * @returns Promise resolving to the URL of the uploaded image
 */
export const handleImageUpload = async (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal,
): Promise<string> => {
  console.log("📤 handleImageUpload 시작:", {
    fileName: file.name,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
    fileType: file.type,
  });

  // Validate file
  if (!file) {
    throw new Error("No file provided");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`,
    );
  }

  try {
    // API 요청을 위한 FormData 생성
    const formData = new FormData();
    formData.append("contentDetailImages", file);

    console.log("🌐 API 요청 시작:", {
      endpoint: `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/content/detail/images`,
      formDataEntries: Array.from(formData.entries()).map(([key, value]) => [
        key,
        value instanceof File ? `File: ${value.name}` : value,
      ]),
    });

    // 진행 상황을 추적하기 위한 XMLHttpRequest 사용
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // 진행률 이벤트 리스너 추가
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          console.log(`📈 업로드 진행률: ${progress}%`);
          onProgress({ progress });
        }
      });

      // abort 이벤트 리스너 추가
      if (abortSignal) {
        abortSignal.addEventListener("abort", () => {
          console.log("🚫 업로드 취소됨");
          xhr.abort();
          reject(new Error("Upload cancelled"));
        });
      }

      // 완료 이벤트 리스너 추가
      xhr.addEventListener("load", () => {
        console.log("📡 API 응답 수신:", {
          status: xhr.status,
          statusText: xhr.statusText,
          responseText:
            xhr.responseText.substring(0, 200) +
            (xhr.responseText.length > 200 ? "..." : ""),
        });

        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            console.log("📥 업로드 응답 파싱:", response);

            if (
              response.status === "SUCCESS" &&
              response.data &&
              response.data.length > 0
            ) {
              const imageUrl = response.data[0].fileUrl;
              console.log("✅ 최종 이미지 URL:", imageUrl);
              // 첫 번째 이미지의 URL을 반환
              resolve(imageUrl);
            } else {
              console.error("❌ 업로드 실패 - 응답 구조 오류:", response);
              reject(new Error(response.message || "Upload failed"));
            }
          } catch (e) {
            console.error("❌ 응답 파싱 실패:", e);
            reject(new Error("Failed to parse response"));
          }
        } else {
          console.error("❌ HTTP 오류:", xhr.status, xhr.statusText);
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      // 에러 이벤트 리스너 추가
      xhr.addEventListener("error", () => {
        console.error("❌ 네트워크 오류 발생");
        reject(new Error("Network error occurred during upload"));
      });

      // 요청 초기화 및 전송
      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/content/detail/images`,
        true,
      );
      xhr.withCredentials = true;

      xhr.setRequestHeader("Access-Control-Allow-Headers", "*");

      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      console.log("🚀 API 요청 전송 중...");
      xhr.send(formData);
    });
  } catch (error) {
    console.error("❌ Image upload error:", error);
    throw error;
  }
};

/**
 * Converts a File to base64 string
 * @param file The file to convert
 * @param abortSignal Optional AbortSignal for cancelling the conversion
 * @returns Promise resolving to the base64 representation of the file
 */
export const convertFileToBase64 = (
  file: File,
  abortSignal?: AbortSignal,
): Promise<string> => {
  if (!file) {
    return Promise.reject(new Error("No file provided"));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    const abortHandler = () => {
      reader.abort();
      reject(new Error("Upload cancelled"));
    };

    if (abortSignal) {
      abortSignal.addEventListener("abort", abortHandler);
    }

    reader.onloadend = () => {
      if (abortSignal) {
        abortSignal.removeEventListener("abort", abortHandler);
      }

      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert File to base64"));
      }
    };

    reader.onerror = (error) =>
      reject(new Error(`File reading error: ${error}`));
    reader.readAsDataURL(file);
  });
};
