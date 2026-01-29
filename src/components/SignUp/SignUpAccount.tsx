import FormInput from '../common/FormInput';
import SignUpPageBottomButton from '../SignUp/SignUpPageBottomButton.tsx';

interface Props {
  state: any;
  actions: any;
  computed: any;
}

const SignUpAccount = ({ state, actions, computed }: Props) => {
  const errorTextStyle =
    'text-[#FF0000] font-body text-body-5 mt-[5px] ml-[17px]';
  return (
    <>
      <div className="flex flex-col items-start gap-[22px] mt-[43px]">
        <div className="w-full">
          <FormInput
            label="사용자 이메일 *"
            value={state.email}
            onChange={actions.handleEmailChange}
            placeholder="example@gmail.com"
            rightSection={
              <div className="flex w-[80px] h-[28px] items-center justify-center shrink-0">
                <button
                  type="button"
                  onClick={actions.handleCheckEmail}
                  disabled={state.isEmailChecked}
                  className={`w-full h-full flex justify-center items-center rounded-[24px] font-body text-body-5 transition-colors whitespace-nowrap
                  ${
                    state.isEmailChecked
                      ? 'bg-gray-400 text-white cursor-default'
                      : 'bg-gray-400 text-footer'
                  }`}
                >
                  중복확인
                </button>
              </div>
            }
          />
          {state.emailError && (
            <div className={errorTextStyle}>{state.emailError}</div>
          )}
        </div>

        <div className="w-full">
          <FormInput
            label="비밀번호 *"
            value={state.password}
            onChange={(e: any) => actions.setPassword(e.target.value)}
            placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
            isPassword={true}
          />
          {computed.passwordError && (
            <div className={errorTextStyle}>{computed.passwordError}</div>
          )}
        </div>

        <div className="w-full">
          <FormInput
            label="비밀번호 확인 *"
            value={state.confirmPassword}
            onChange={(e: any) => actions.setConfirmPassword(e.target.value)}
            placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
            isPassword={true}
          />
          {computed.confirmPasswordError && (
            <div className={errorTextStyle}>
              {computed.confirmPasswordError}
            </div>
          )}
        </div>
      </div>

      {computed.isStep1Complete && (
        <div className="fixed bottom-[18px] w-[335px] left-0 right-0 mx-auto z-50">
          <SignUpPageBottomButton
            text="프로필 등록하기"
            onClick={() => actions.setStep(2)}
            className="h-[50px]"
          />
        </div>
      )}
    </>
  );
};

export default SignUpAccount;
