import SignUpPageBottomButton from './SignUpPageBottomButton';
import defaultProfileImage from "../../assets/defaultProfileImage.svg";
import cameraIcon from "../../assets/cameraIcon.svg";
import galleryIcon from "../../assets/galleryIcon.svg";

interface Props {
  state: any;
  actions: any;
  refs: any;
}

const SignUpProfile = ({ state, actions, refs }: Props) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      
      <div className="flex flex-col items-center gap-[22px] w-[229px] mt-[37px]">
        <img 
          src={defaultProfileImage} 
          alt="기본 프로필" 
          className="h-full self-stretch" 
        />
        <p className="text-center text-footer font-body text-body-2">
          나만의 휴식 취향 기록을 위한<br/>프로필 사진을 추가해주세요.
        </p>
      </div>

      <input 
        type="file" 
        ref={refs.fileInputRef} 
        onChange={actions.handleImageUpload} 
        className="hidden" 
        accept="image/*"
      />
      <input 
        type="file" 
        ref={refs.cameraInputRef} 
        onChange={actions.handleImageUpload} 
        className="hidden" 
        accept="image/*" 
        capture="user" 
      />
      
      <div className="fixed bottom-[15px] w-[335px] left-0 right-0 mx-auto z-50">
      <div className="relative w-[335px] mt-[215px] flex flex-col items-center">
          {state.showImgOption && (
              <div className="absolute bottom-full left-0 z-10 animate-fade-in">
                  <div className="flex flex-col w-[252px] h-[75px] justify-center items-center rounded-[13px] 
                  bg-[rgba(249,249,249,0.80)] backdrop-blur-[2px] shadow-[0_0_12.6px_0_rgba(0,0,0,0.25)] overflow-hidden">
                      <button
                          className="w-full flex-1 flex justify-between items-center pl-[16px] pr-[19px] mb-[1px]"
                          onClick={(e) => {
                              e.stopPropagation();
                              refs.cameraInputRef.current?.click();
                          }}
                      >
                          <span className="font-body text-footer text-body-5">사진 찍기</span>
                          <img src={cameraIcon} alt="카메라" className="w-[16px] h-[11.5px]" />
                      </button>
                      <div className="w-[252px] h-[0.3px] bg-gray-300"></div>
                      <button
                          className="w-full flex-1 flex justify-between items-center pl-[16px] pr-[18px]"
                          onClick={(e) => {
                              e.stopPropagation();
                              refs.fileInputRef.current?.click();
                          }}
                      >
                          <span className="font-body text-footer text-body-5">사진 보관함</span>
                          <img src={galleryIcon} alt="갤러리" className="w-[17px] h-[14px]" />
                      </button>
                  </div>
              </div>
          )}
      </div>

      <SignUpPageBottomButton
          text="사진추가"
          onClick={(e) => {
              e?.stopPropagation();
              actions.setShowImgOption(!state.showImgOption); 
          }}
          className="mt-[23px] h-[53px]"
      />
    </div>
    </div>
  );
};

export default SignUpProfile;