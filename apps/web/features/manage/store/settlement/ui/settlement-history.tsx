import InfoTooltip from '@/components/ui/InfoTooltip';

import { Suspense } from 'react';
import SettlementHistoryContent from './settlement-history-content';

export default function SettlementHistory() {
  return (
    <div>
      {/* 정산 내역 헤더 */}
      <div className="flex gap-1 items-center">
        <h2 className="text-headline-1 font-bold text-label-normal">
          정산 내역
        </h2>
        <InfoTooltip
          direction="right"
          text="정산은 매달 1일 진행됩니다."
          width="10rem"
        />
      </div>

      <Suspense>
        <SettlementHistoryContent />
      </Suspense>
    </div>
  );
}
