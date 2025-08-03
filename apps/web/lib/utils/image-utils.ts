// File: src/lib/utils/image-utils.ts

/**
 * File -> 4:3 비율로 캔버스 리사이즈 후 File 반환
 */
export async function resizeImageTo4x3(file: File): Promise<File> {
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
    img.src = url;
  });
  URL.revokeObjectURL(url);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 초기화 실패');

  const targetW = 512;
  const targetH = 384;
  canvas.width = targetW;
  canvas.height = targetH;
  ctx.drawImage(img, 0, 0, targetW, targetH);

  return new Promise((res, rej) => {
    canvas.toBlob(
      (blob) => {
        blob
          ? res(new File([blob], file.name, { type: file.type }))
          : rej(new Error('리사이즈 실패'));
      },
      file.type,
      0.9
    );
  });
}
