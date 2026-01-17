import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';

const MapPage = () => {
  return (
    <>
      <NavBar variant="5" text="지도" icon={menuIcon} />

      <div className="relative w-full">
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 z-10 w-full px-[20px]">
          <SearchBarDefault />
        </div>

        <Map />
      </div>
    </>
  );
};

export default MapPage;
