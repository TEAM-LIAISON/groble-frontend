// File: src/features/products/register/types/navigation-types.ts

/** 등록 프로세스의 단계 키 */
export type RegisterStep = 'info' | 'description' | 'review';

/** useStepNavigation 훅이 제공할 API */
export interface StepNavigation {
  currentStep: RegisterStep;
  goNext: () => void;
  goPrev: () => void;
}
