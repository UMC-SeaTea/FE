import NavBar from '../components/common/NavBar';
import menu from '../assets/menu_black.svg';
import HomeTestType from '../components/common/HomeTestType';

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <NavBar
          variant="2"
          text="SeaTea"
          icon={menu}
          className="border-b border-[#000]"
        />
        <HomeTestType
          type="sweet"
          title="sweet."
          description="소소한 디저트나 쇼핑 등 자신에게 작은 보상을 주며 스트레스를 풀어요"
        />
      </div>
    </>
  );
};

export default HomePage;
