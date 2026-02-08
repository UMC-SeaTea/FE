import backButton from '../../assets/backButton_white.svg';
import profileDefault from '../../assets/profile_default.png';
import NoteSearch from '../common/NoteSearch';
import { useNavigate } from 'react-router-dom';

const MyPageProfile = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/mypage/mypageprofileedit');
  };

  return (
    <>
      <div className="w-[335px] h-[116px] rounded-md bg-[rgba(255,255,255,0.1)] px-[16px] py-[24px]">
        <div className="flex w-[303px] items-center justify-between">
          <div className="flex gap-[12px]">
            {/* 프로필 이미지 */}
            <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
              <img
                src={profileDefault}
                alt="profile default img"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              {/* 이메일 */}
              <div className="font-body text-body-5 text-white">
                hongdandan@gmail.com
              </div>
              {/* 휴식 유형 */}
              <div className="flex gap-[8px] items-center">
                <p className="font-body text-body-4 text-gray-400">휴식 유형</p>
                <NoteSearch text="Floral" />
              </div>
              {/* 저장한 공간 */}
              <div className="flex gap-[8px] font-body text-body-4">
                <p className="text-gray-400">저장한 공간</p>
                <div className="flex">
                  <p className="text-white">22</p>
                  <p className="text-gray-400">개</p>
                </div>
              </div>
            </div>
          </div>
          <img
            src={backButton}
            alt="프로필 수정"
            className="scale-x-[-1] w-[24px] h-[24px] cursor-pointer"
            onClick={handleEditClick}
          />
        </div>
      </div>
    </>
  );
};

export default MyPageProfile;
