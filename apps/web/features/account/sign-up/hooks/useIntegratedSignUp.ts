import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { integratedSignUp } from "../api/signUpApi";
import { showToast } from "@/shared/ui/Toast";
import { clearSignUpStorage } from "../model/SignUpContext";
import { amplitudeEvents } from "@/lib/utils/amplitude";

export const useIntegratedSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: integratedSignUp,
    onSuccess: async (data, variables) => {
      // 회원가입 성공 이벤트 트래킹
      await amplitudeEvents.signUp("email", {
        user_type: variables.userType,
        signup_method: "email",
        success: true,
        user_id: data?.userId,
      });

      // showToast.success('회원가입이 완료되었습니다');
      // sessionStorage 정리
      // clearSignUpStorage();
      router.push("/auth/sign-up/nickname");
    },
    onError: async (error, variables) => {
      console.error("통합 회원가입 실패:", error);

      // 회원가입 실패 이벤트 트래킹
      await amplitudeEvents.trackEvent("Sign Up Failed", {
        user_type: variables.userType,
        signup_method: "email",
        error_message: error.message,
        success: false,
      });
    },
  });
};
