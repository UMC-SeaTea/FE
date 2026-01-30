import FormInput from '../common/FormInput';
import SignUpPageBottomButton from '../SignUp/SignUpPageBottomButton.tsx';

interface Props {
  state: any;
  actions: any;
  computed: any;
}

const SignUpAccount = ({ state, actions, computed }: Props) => {
  const errorTextStyle =
    'text-[#F00] font-body text-detail-4 mt-[4px] ml-[20px] absolute top-full left-0 whitespace-nowrap';
  return (
    <>
      <div className="flex flex-col items-start gap-[22px] mt-[43px]">
        <div className="w-full relative">
          <FormInput
            label="사용자 이메일 *"
            value={state.email}
            onChange={actions.handleEmailChange}
            placeholder="example@gmail.com"
            isError={!!state.emailEmptyError}
            rightSection={
              <div className="flex w-[80px] h-[28px] items-center justify-center shrink-0">
                <button
                  type="button"
                  onClick={actions.handleCheckEmail}
                  className={`w-full h-full flex justify-center items-center rounded-[24px] font-body text-body-5 transition-colors
                  ${state.isEmailChecked ? 'bg-gray-400 text-white' : 'bg-gray-400 text-footer'}`}
                >
                  중복확인
                </button>
              </div>
            }
          />
          {(state.emailEmptyError || computed.emailFormatError) && (
            <div className={errorTextStyle}>
              {state.emailEmptyError || computed.emailFormatError}
            </div>
          )}
        </div>

        <div className="w-full relative">
          <FormInput
            label="비밀번호 *"
            value={state.password}
            onChange={actions.handlePasswordChange}
            placeholder="영문, 숫자, 특수문자 포함 (8-20자)"
            isPassword={true}
            isError={!!state.passwordEmptyError}
          />
          {(state.passwordEmptyError || computed.passwordFormatError) && (
            <div className={errorTextStyle}>
              {state.passwordEmptyError || computed.passwordFormatError}
            </div>
          )}
        </div>

        <div className="w-full relative">
          <FormInput
            label="비밀번호 확인 *"
            value={state.confirmPassword}
            onChange={actions.handleConfirmPasswordChange}
            placeholder="영문, 숫자, 특수문자 포함 (8-20자)"
            isPassword={true}
            isError={!!state.confirmPasswordEmptyError}
          />
          {(state.confirmPasswordEmptyError || computed.matchError) && (
            <div className={errorTextStyle}>
              {state.confirmPasswordEmptyError || computed.matchError}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-[18px] w-[335px] left-0 right-0 mx-auto z-50">
        <SignUpPageBottomButton
          text="프로필 등록하기"
          onClick={actions.handleNextStep1}
          className="h-[50px]"
        />
      </div>
    </>
  );
};

export default SignUpAccount;
