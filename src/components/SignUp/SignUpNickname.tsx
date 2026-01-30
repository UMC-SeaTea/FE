import FormInput from '../common/FormInput';
import SignUpPageBottomButton from '../SignUp/SignUpPageBottomButton.tsx';
import defaultProfileImage from '../../assets/defaultProfileImage.svg';

interface Props {
  state: any;
  actions: any;
  computed: any;
}

const SignUpNickname = ({ state, actions, computed }: Props) => {
  const errorTextStyle =
    'text-[#FF0000] font-body text-body-5 mt-[4px] ml-[20px] absolute top-full left-0 whitespace-nowrap';

  return (
    <>
      <div className="flex flex-col w-[333px] items-center gap-[25px] mt-[37px]">
        <div
          className="overflow-hidden flex h-[129px] w-[129px] justify-end items-center rounded-[13.52px]
          border-gray-100 border-[0.563px]"
        >
          {state.previewUrl ? (
            <img
              src={state.previewUrl}
              alt="미리보기"
              className="w-full h-full object-cover bg-gray-200 "
            />
          ) : (
            <img
              src={defaultProfileImage}
              alt="기본 프로필"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="w-full relative">
          <FormInput
            label=""
            value={state.nickname}
            onChange={(e: any) => actions.setNickname(e.target.value)}
            placeholder="한글, 영문, 숫자 4자 이상"
          />
          {computed.nicknameError && (
            <p className={errorTextStyle}>{computed.nicknameError}</p>
          )}
        </div>

        <p className="text-footer text-center font-body text-body-2">
          추가한 사용자 이름은
          <br />
          언제든지 변경할 수 있습니다.
        </p>
      </div>

      <div className="fixed bottom-[15px] w-[335px] left-0 right-0 mx-auto z-50">
        <SignUpPageBottomButton
          text="등록하기"
          onClick={actions.handleSubmit}
          disabled={!computed.isNicknameValid}
          className="h-[53px]"
        />
      </div>
    </>
  );
};

export default SignUpNickname;
