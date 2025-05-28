// // File: src/features/products/register/components/form/DocumentPriceItem.tsx
// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useFormContext, useController } from "react-hook-form";
// import { uploadDocumentFile } from "@/lib/api/content";
// import { ClipIcon } from "@/components/(improvement)/icons/ClipIcon";
// import TextField from "@/components/text-field";
// import Button from "@/components/button";

// import type { ProductFormData } from "../../types/form-types";
// import type { DocumentOptionForm } from "../../types/form-types";

// interface DocumentPriceItemProps {
//   index: number;
//   remove: (index: number) => void;
//   showDelete: boolean;
//   error?: boolean;
// }

// export default function DocumentPriceItem({
//   index,
//   remove,
//   showDelete,
//   error: hasError,
// }: DocumentPriceItemProps) {
//   const { control, setValue } = useFormContext<ProductFormData>();
//   const {
//     field: { value: current },
//   } = useController({
//     name: `documentOptions.${index}`,
//     control,
//     defaultValue: {} as DocumentOptionForm,
//   });

//   // 파일 업로드 상태
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);
//   const fileRef = useRef<HTMLInputElement>(null);

//   // 즉시 다운로드 여부
//   const isImmediate = current?.contentDeliveryMethod === "IMMEDIATE_DOWNLOAD";

//   // 파일 이름 추출
//   const getFileName = () => {
//     if (!current?.documentFileUrl) return "";
//     try {
//       const parts = new URL(current.documentFileUrl).pathname.split("/");
//       return parts.at(-1) || "업로드된 파일";
//     } catch {
//       return "업로드된 파일";
//     }
//   };

//   // 파일 선택
//   const onSelectFile = async (file: File) => {
//     if (file.size > 10 * 1024 * 1024) {
//       setUploadError("파일 크기는 10MB 이하여야 합니다.");
//       return;
//     }
//     setIsUploading(true);
//     setUploadError(null);
//     try {
//       const url = await uploadDocumentFile(file);
//       setValue(`documentOptions.${index}.documentFileUrl`, url, {
//         shouldValidate: true,
//       });
//     } catch (err: any) {
//       setUploadError(err.message || "업로드 중 오류 발생");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="relative rounded-lg border border-line-normal p-6">
//       {showDelete && (
//         <button
//           type="button"
//           onClick={() => remove(index)}
//           className="text-label-disabled absolute top-4 right-4 hover:text-label-normal"
//         >
//           ×
//         </button>
//       )}

//       <div className="mb-5 text-body-2-normal font-semibold text-label-normal">
//         옵션 {index + 1}
//       </div>

//       {/* 옵션명 */}
//       <TextField
//         label="옵션명"
//         value={current?.name || ""}
//         onChange={(e) =>
//           setValue(`documentOptions.${index}.name`, e.target.value, {
//             shouldValidate: true,
//           })
//         }
//         error={hasError && !current?.name}
//         className="mb-4 w-full"
//       />

//       {/* 설명 */}
//       <TextField
//         label="설명"
//         value={current?.description || ""}
//         onChange={(e) =>
//           setValue(`documentOptions.${index}.description`, e.target.value, {
//             shouldValidate: true,
//           })
//         }
//         error={hasError && !current?.description}
//         className="mb-4 w-full"
//       />

//       {/* 제공 방식 */}
//       <div className="mb-4">
//         <p className="mb-2 text-body-2-normal font-semibold text-label-normal">
//           콘텐츠 제공 방식
//         </p>
//         <div className="flex w-full gap-4">
//           {[
//             { value: "IMMEDIATE_DOWNLOAD", label: "즉시 다운로드" },
//             { value: "FUTURE_UPLOAD", label: "작업 후 업로드" },
//           ].map((opt) => (
//             <Button
//               key={opt.value}
//               buttonType="button"
//               onClick={() =>
//                 setValue(
//                   `documentOptions.${index}.contentDeliveryMethod`,
//                   opt.value as "IMMEDIATE_DOWNLOAD" | "FUTURE_UPLOAD",
//                   { shouldValidate: true },
//                 )
//               }
//               group={
//                 current?.contentDeliveryMethod === opt.value
//                   ? "solid"
//                   : "outlined"
//               }
//               type="tertiary"
//               className={`w-full justify-start text-body-2-normal text-label-normal ${
//                 current?.contentDeliveryMethod === opt.value
//                   ? "border border-primary-sub-1"
//                   : ""
//               }`}
//             >
//               {opt.label}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* 파일 업로드 */}
//       {isImmediate && (
//         <div className="mb-4 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed py-9 transition-colors">
//           <input
//             type="file"
//             accept=".pdf,.zip"
//             ref={fileRef}
//             className="hidden"
//             onChange={(e) => {
//               const f = e.target.files?.[0];
//               if (f) onSelectFile(f);
//             }}
//           />

//           {isUploading ? (
//             <span>업로드 중...</span>
//           ) : current?.documentFileUrl ? (
//             <>
//               <div className="flex items-center gap-2">
//                 <ClipIcon />
//                 <span className="font-medium">{getFileName()}</span>
//               </div>
//               <div className="mt-2 flex gap-2">
//                 <Button
//                   group="outlined"
//                   type="tertiary"
//                   size="x-small"
//                   buttonType="button"
//                   onClick={() => fileRef.current?.click()}
//                 >
//                   파일 변경
//                 </Button>
//                 <Button
//                   group="outlined"
//                   type="tertiary"
//                   size="x-small"
//                   buttonType="button"
//                   className="border-red-500 text-red-500 hover:bg-red-50 hover:brightness-95"
//                   onClick={() =>
//                     setValue(`documentOptions.${index}.documentFileUrl`, null, {
//                       shouldValidate: true,
//                     })
//                   }
//                 >
//                   삭제하기
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <>
//               <Button
//                 group="solid"
//                 type="tertiary"
//                 size="x-small"
//                 buttonType="button"
//                 onClick={() => fileRef.current?.click()}
//               >
//                 파일 업로드
//               </Button>
//               <span className="mt-2 text-label-1-normal text-label-alternative">
//                 * 10MB 이하의 PDF, Zip 파일
//               </span>
//               {uploadError && (
//                 <p className="mt-2 text-sm text-red-500">{uploadError}</p>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* 비용 입력 */}
//       <TextField
//         label="비용"
//         value={String(current?.price ?? "")}
//         onChange={(e) =>
//           setValue(
//             `documentOptions.${index}.price`,
//             parseInt(e.target.value.replace(/\D/g, "")) || 0,
//             { shouldValidate: true },
//           )
//         }
//         error={hasError && (current?.price ?? 0) <= 0}
//         className="mt-4 w-full"
//       />
//     </div>
//   );
// }
