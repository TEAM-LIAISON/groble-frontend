import { useNewProductStore } from '@/features/products/register/store/useNewProductStore';
// File: src/hooks/useStepNavigation.ts
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { RegisterStep } from '../types/navigation‐types';

// 스텝 이동 훅

export function useStepNavigation() {
  const router = useRouter();
  const pathname = usePathname() ?? '';
  const params = useSearchParams();
  const contentId = params.get('contentId');
  const hasId = Boolean(contentId);
  const STEPS: RegisterStep[] = ['info', 'description', 'review'];

  // URL에서 마지막 세그먼트를 꺼내서 현재 스텝으로 본다
  const segments = pathname.split('/');
  const current = segments[segments.length - 1] as RegisterStep;
  const idx = STEPS.indexOf(current);

  const buildUrl = (step: RegisterStep) =>
    `/products/register/${step}${hasId ? `?contentId=${contentId}` : ''}`;

  const goNext = () => {
    if (idx < 0) {
      // register 루트이거나 잘못된 경로면 첫 단계로
      router.push(buildUrl(STEPS[0]));
    } else if (idx < STEPS.length - 1) {
      // 다음 단계로
      router.push(buildUrl(STEPS[idx + 1]));
    } else {
      // 마지막 단계 → 완료 후 내 상품 관리 페이지
      router.push('/products/myproducts');
    }
  };

  const goPrev = () => {
    if (idx > 0) {
      // 이전 단계로
      router.push(buildUrl(STEPS[idx - 1]));
    } else {
      // 첫 단계에서는 상품 목록으로 돌아가거나 필요에 따라 다른 곳으로
      router.push('/products');
    }
  };

  return { goNext, goPrev };
}
