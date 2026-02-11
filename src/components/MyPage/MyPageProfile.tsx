import backButton from '../../assets/backButton_white.svg';
import profileDefault from '../../assets/profile_default.png';
import NoteSearch from '../common/NoteSearch';
import { useNavigate } from 'react-router-dom';
import type { MemberProfileResponse } from '../../types/member';

interface MyPageProfileProps {
  profile?: MemberProfileResponse['result'];
}

const MyPageProfile = ({ profile }: MyPageProfileProps) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/mypage/profile-edit');
  };

  return (
    <>
      <div className="w-[335px] h-[116px] rounded-md bg-[rgba(255,255,255,0.1)] px-[16px] py-[24px]">
        <div className="flex w-[303px] items-center justify-between">
          <div className="flex gap-[12px]">
            {/* 프로필 이미지 */}
            <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
              <img
                src={profile?.profileImageUrl || profileDefault}
                alt="profile img"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = profileDefault;
                }}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              {/* 이메일 */}
              <div className="font-body text-body-5 text-white">
                {profile?.email || '-'}
              </div>

              {/* 휴식 유형 (null일 경우 진단 전으로 표시) */}
              <div className="flex gap-[8px] items-center">
                <p className="font-body text-body-4 text-gray-400">휴식 유형</p>
                <NoteSearch
                  text={profile?.currentType?.displayName || '진단 전'}
                />
              </div>

              {/* 저장한 공간 */}
              <div className="flex gap-[8px] font-body text-body-4">
                <p className="text-gray-400">저장한 공간</p>
                <div className="flex">
                  <p className="text-white">{profile?.savedSpaceCount ?? 0}</p>
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
