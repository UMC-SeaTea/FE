import NavBar from '../components/common/NavBar';
import menu from '../assets/menu_black.svg';

const HomePage = () => {
  return (
    <>
      <NavBar
        variant="2"
        text="SeaTea"
        icon={menu}
        className="border-b border-[#000]"
      />
    </>
  );
};

export default HomePage;
