import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';

const MapPage = () => {
  return (
    <>
      <NavBar variant="5" text="지도" icon={menuIcon} />

      <div className="px-[20px] pt-[30px]">
        <SearchBarDefault />
      </div>

      <Map />
    </>
  );
};

export default MapPage;
