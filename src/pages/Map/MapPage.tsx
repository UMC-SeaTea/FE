import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';
import Chip from '../../components/common/Chip';
import Carousel from '../../components/common/Carousel';
import { useEffect, useState } from 'react';
import GPSIcon from '../../assets/RoundButton/gps_btn.svg';
import useLocation from '../../hooks/useLocation';

const CHIP_LIST = [
  { label: 'Floral', value: 'Floral', textColor: 'floral' },
  { label: 'Fruity', value: 'Fruity', textColor: 'fruity' },
  { label: 'Smoky', value: 'Smoky', textColor: 'smoky' },
  { label: 'Oceanic', value: 'Oceanic', textColor: 'oceanic' },
  { label: 'Earthy', value: 'Earthy', textColor: 'earthy' },
  { label: 'Sweet', value: 'Sweet', textColor: 'sweet' },
  { label: 'Spices', value: 'Spices', textColor: 'spices' },
  { label: 'Nutty', value: 'Nutty', textColor: 'nutty' },
] as const;

const MapPage = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const { location, setCurrentLocation, loading, error } = useLocation();

  useEffect(() => {
    if (!location) return;
    console.log('현재 위치:', location.lat, location.lng);
  }, [location]);

  return (
    <>
      <NavBar variant="5" text="지도" icon={menuIcon} />

      <div className="relative w-[375px]">
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 z-10 w-[375px] pl-[20px]">
          <div className="flex flex-col gap-[12px]">
            <SearchBarDefault />
            <Carousel>
              {CHIP_LIST.map((chip) => (
                <Chip
                  key={chip.value}
                  label={chip.label}
                  textColor={chip.textColor}
                  active={selectedChip === chip.value}
                  onClick={() =>
                    setSelectedChip(
                      selectedChip === chip.value ? null : chip.value
                    )
                  }
                />
              ))}
            </Carousel>
          </div>
          {error && <p>{error}</p>}
        </div>
        <Map center={location} />
        <button
          type="button"
          onClick={setCurrentLocation}
          className="fixed bottom-[68px] right-[20px] cursor-pointer"
          disabled={loading}
        >
          <img src={GPSIcon} alt="GPS icon" className="w-[62px] h-[62px]" />
        </button>
      </div>
    </>
  );
};

export default MapPage;
