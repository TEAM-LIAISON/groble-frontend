'use client';
import WebHeader from '@/components/(improvement)/layout/header';
import { useMakerCorporation } from '@/features/makerAuth/hooks/useMakerCorporation';
import MakerCorporationForm from '@/features/makerAuth/ui/MakerCorporationForm';
import { Button } from '@groble/ui';

export default function MakerCorporationCertPage() {
  const { form, isValid, isSubmitting, handleFileUrlChange, handleSubmit } =
    useMakerCorporation();

  return (
    <>
      <WebHeader mobileBack="back" />
      <div className="w-full flex justify-center h-[calc(100vh-68px)] md:pt-10">
        <div className="flex flex-col max-w-[480px] w-full p-5 md:p-0">
          <div>
            <MakerCorporationForm
              form={form}
              handleFileUrlChange={handleFileUrlChange}
            />
          </div>

          <div className="mt-[3.5rem] pb-5 w-full">
            <Button
              type="primary"
              size="large"
              disabled={!isValid || isSubmitting}
              onClick={handleSubmit}
              className="w-full"
            >
              인증 요청
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
