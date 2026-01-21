import NavBar from "../components/common/NavBar";
import menu from "../assets/menu_white.svg";
import { useState } from "react";
import SideBarContainer from "../components/SideBar/SideBarContainer";
import profileDefault from "../assets/profile_default.png";
import moveButton from "../assets/moveButton_white.svg";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

const menuItems = [
  { id: 1, title: "나의 티백", path: "/myteabag" },      
  { id: 2, title: "알림 설정", path: "" },      
  { id: 3, title: "고객센터", path: "" },       
  { id: 4, title: "로그아웃 · 탈퇴", path: "" },    
];

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
              onClick={() => setNavOpen((prev) => !prev)}
            />
            <SideBarContainer open={navOpen} onClose={() => setNavOpen(false)} />
          </div>

          <div className="flex flex-col items-center gap-3 self-stretch">
            
            <div className="flex items-center self-stretch pt-8 pr-[127px] pb-3 pl-7">
              <div className="flex flex-col justify-center items-start ">
                <div className="font-body text-white text-[15px] font-light leading-[140%] tracking-[-0.15px]">
                  오늘도 편안한 휴식을 경험하길 바라요
                </div>
                <div className="self-stretch text-white font-body text-2xl font-semibold leading-[140%] tracking-[-0.6px]">
                  UMC님
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 w-[335px]">
              <div className="flex items-center w-full justify-between rounded-[8px] px-4 py-6 bg-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-end gap-[-31px]">
                    <img
                      src={profileDefault}
                      alt="profile default img"
                      className="w-16 h-16 rounded-[64px] bg-cover bg-center bg-no-repeat"
                    />
                  </div>
                  <div className="flex w-[150px] flex-col items-center gap-1">
                    <div className="self-stretch text-white font-body text-body-5">
                      hongdandan@gmail.com
                    </div>

                    <div className="flex flex-row items-center gap-2 self-stretch">
                      <div className="text-gray-400 font-body text-body-4">
                        휴식 유형
                      </div>
                      <div className="flex w-[43px] h-[20px] items-center justify-center gap-[10px] px-[9px] py-[2px] bg-white">
                        <div className="self-stretch text-black font-body text-detail-1">
                          Floral
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch flex flex-row items-center gap-2">
                      <div className="text-gray-400 text-body-4 font-body">
                        저장한 공간
                      </div>
                      <div className="flex items-center flex-row">
                        <div className="font-body text-white text-sm font-semibold leading-[140%] tracking-[-0.35px]">
                          22
                        </div>
                        <div className="font-body text-gray-400 text-body-4">
                          개
                        </div>
                      </div>
                     </div>
                   </div>
                </div>
                <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                  <img src={moveButton} alt="move button" className="" onClick={() => navigate('')} />
                </div>
              </div>

              <div className="flex flex-col items-start self-stretch rounded-[12px] py-[10px] bg-white/10">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className="flex flex-col justify-center items-center gap-[10px] self-stretch py-3 px-[18px]"
                  >
                    <div className="flex justify-between items-center self-stretch">
                      <div className="text-white font-body text-sm font-medium leading-[140%] tracking-[-0.35px]">
                        {item.title}
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <img src={moveButton} alt="move button" className="" />
                      </div>
                    </div>
                  </div>
                ))}
              </div> 
            </div> 
          </div> 

          <div className="w-[183px] font-regular font-body text-gray-200 text-[10px] leading-[120%] tracking-[-0.25px] mt-[123px] ml-5 mr-[172px] mb-[122px]">
            Copyright 2025. SeaTea All rights reserved.
          </div>
        </div> 
      </div> 
    </>
  );
};

export default MyPage;