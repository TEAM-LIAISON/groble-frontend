import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerMakerBusiness } from "../api/maker-api";

export type MakerCorporationFormValues = {
  businessType:
    | "INDIVIDUAL_SIMPLIFIED"
    | "INDIVIDUAL_NORMAL"
    | "CORPORATE"
    | "";
  businessNumber: string;
  businessLicenseFileUrl: string;
  taxInvoiceEmail: string;
  businessAddress: string;
  businessName: string;
};

export const useMakerCorporation = () => {
  const router = useRouter();

  const form = useForm<MakerCorporationFormValues>({
    mode: "onChange",
    defaultValues: {
      businessType: "",
      businessNumber: "",
      businessAddress: "",
      businessName: "",
      businessLicenseFileUrl: "",
      taxInvoiceEmail: "",
    },
  });

  const {
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: MakerCorporationFormValues) => {
    try {
      // API에 필요한 필드만 전송
      const payload = {
        businessType: data.businessType as
          | "INDIVIDUAL_SIMPLIFIED"
          | "INDIVIDUAL_NORMAL"
          | "CORPORATE",
        businessNumber: data.businessNumber,
        businessLicenseFileUrl: data.businessLicenseFileUrl,
        ...(data.taxInvoiceEmail && { taxInvoiceEmail: data.taxInvoiceEmail }),
        businessAddress: data.businessAddress,
        businessName: data.businessName,
      };

      await registerMakerBusiness(payload);
      router.push("/users/maker/complete?type=corporate");
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  const handleFileUrlChange = (url: string | null) => {
    setValue("businessLicenseFileUrl", url || "", { shouldValidate: true });
  };

  return {
    form,
    errors,
    isValid,
    isSubmitting,
    onSubmit,
    handleFileUrlChange,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
