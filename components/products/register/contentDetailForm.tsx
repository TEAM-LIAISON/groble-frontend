"use client";

import { useNewProductStore } from "@/lib/store/useNewProductStore";
import TextField from "@/components/text-field";

export default function ContentDetailForm() {
  const {
    serviceTarget,
    serviceProcess,
    makerIntro,
    setServiceTarget,
    setServiceProcess,
    setMakerIntro,
  } = useNewProductStore();

  return (
    <div className="mt-5 flex w-full flex-col gap-6">
      {/* 콘텐츠 타겟 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          콘텐츠 타겟
        </h2>
        <TextField
          value={serviceTarget}
          onChange={(e) => setServiceTarget(e.target.value)}
          placeholder="Ex. 예비 및 초기 창업가"
          className="w-full"
        />
      </div>

      {/* 제공 절차 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          제공 절차
        </h2>
        <TextField
          value={serviceProcess}
          onChange={(e) => setServiceProcess(e.target.value)}
          placeholder="Ex. 즉시 다운로드 가능해요"
          className="w-full"
        />
      </div>

      {/* 메이커 소개 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          메이커 소개
        </h2>
        <TextField
          value={makerIntro}
          onChange={(e) => setMakerIntro(e.target.value)}
          placeholder="Ex. 관련 경험이나 이력, 경험 등을 적어주세요"
          className="w-full"
        />
      </div>
    </div>
  );
}
