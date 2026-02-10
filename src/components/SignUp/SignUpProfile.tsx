import SignUpPageBottomButton from './SignUpPageBottomButton';
import defaultProfileImage from '../../assets/defaultProfileImage.svg';
import ImageSelectionPopup from '../common/ImageSelectionPopup';

interface Props {
  state: any;
  actions: any;
  refs: any;
}

const SignUpProfile = ({ state, actions }: Props) => {
  return (
    <div className="flex flex-col items-center w-full h-full relative">
      <div className="flex flex-col items-center gap-[22px] w-[229px] mt-[37px]">
        <img
          src={defaultProfileImage}
          alt="기본 프로필"
          className="h-full self-stretch"
        />
        <p className="text-center text-footer font-body text-body-2">
          나만의 휴식 취향 기록을 위한
          <br />
          프로필 사진을 추가해주세요.
        </p>
      </div>

      <div className="fixed bottom-[15px] w-[335px] left-0 right-0 mx-auto z-50 flex flex-col items-center">
        <button
          onClick={() => actions.handleSkipImage()}
          className="mb-[14px] text-gray-100 font-body text-[14px] font-normal leading-[140%] text-center"
        >
          사진 없이 계속하기
        </button>

        <div className="relative w-full">
          {state.showImgOption && (
            <ImageSelectionPopup
              className="absolute bottom-[9px] left-0 ml-1"
              onImageSelected={(e) => {
                actions.handleImageUpload(e);
                actions.setShowImgOption(false);
              }}
              onClose={() => actions.setShowImgOption(false)}
            />
          )}
        </div>

        <SignUpPageBottomButton
          text="사진추가"
          onClick={(e) => {
            e?.stopPropagation();
            actions.setShowImgOption(!state.showImgOption);
          }}
          className="h-[53px] w-full"
        />
      </div>
    </div>
  );
};

export default SignUpProfile;
