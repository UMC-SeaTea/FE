import NavBar from '../../components/common/NavBar';
import menu from '../../assets/menu_white.svg';
import SideBarContainer from '../../components/SideBar/SideBarContainer';
import moveButton from '../../assets/moveButton_white.svg';
import { useNavigate, type To } from 'react-router-dom';
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import useSideBar from '../../hooks/useSideBar';
import Footer from '../../components/common/Footer';
import { useMemberProfile } from '../../hooks/useMember';

const MyPage = () => {
  const navigate = useNavigate();
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });

  // 추후 수정
  // const memberId = Number(localStorage.getItem('memberId'));
  const memberId = 1; // 임시 테스트용 ID

  const { data } = useMemberProfile(memberId);
  const userProfile = data?.result;

  const menuItems = [
    { id: 1, title: '나의 티백', path: '/myteabag' },
    { id: 2, title: '알림 설정', path: '' },
    { id: 3, title: '고객센터', path: '' },
    { id: 4, title: '로그아웃 · 탈퇴', path: '' },
  ];

  const handleMenuClick = (path: To) => {
    if (!path) {
      alert('준비중입니다. 다음 업데이트를 기다려주세요! 감사합니다.');
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#0A0A0A]">
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full">
            <NavBar
              variant="6"
              text="마이페이지"
              icon={menu}
              className="border-b border-[#000] relative z-[60] !bg-[#0A0A0A] !w-full"
              onClick={toggleSideBar}
            />
            <SideBarContainer open={open} onClose={closeSideBar} />
          </div>

          <div className="flex flex-col items-center gap-3 self-stretch">
            <div className="flex items-center self-stretch pt-8 pr-[127px] pb-3 pl-7">
              <div className="flex flex-col justify-center items-start ">
                <div className="font-body text-white text-[15px] font-light leading-[140%] tracking-[-0.15px]">
                  오늘도 편안한 휴식을 경험하길 바라요
                </div>
                <div className="self-stretch text-white font-body text-2xl font-semibold leading-[140%] tracking-[-0.6px]">
                  {userProfile?.nickname || ''}님
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 w-[335px]">
              <MyPageProfile profile={userProfile} />

              <div className="flex flex-col items-start self-stretch rounded-[12px] py-[10px] bg-white/10">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className="flex flex-col justify-center items-center gap-[10px] self-stretch py-3 px-[18px] cursor-pointer"
                  >
                    <div className="flex justify-between items-center self-stretch">
                      <div className="text-white font-body text-sm font-medium leading-[140%] tracking-[-0.35px]">
                        {item.title}
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <img
                          src={moveButton}
                          alt="move button"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-[105px]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
