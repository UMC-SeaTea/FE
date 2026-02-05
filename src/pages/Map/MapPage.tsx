import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';
import Chip from '../../components/common/Chip';
import Carousel from '../../components/common/Carousel';
import { useEffect, useState } from 'react';
import GPSIcon from '../../assets/RoundButton/gps_btn.svg';
import useLocation from '../../hooks/useLocation';
<<<<<<< HEAD

const MapPage = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
=======
import SideBarContainer from '../../components/SideBar/SideBarContainer';
import useSideBar from '../../hooks/useSideBar';

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
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae

  const { location, setCurrentLocation, loading, error } = useLocation();

  useEffect(() => {
    if (!location) return;
    console.log('현재 위치:', location.lat, location.lng);
  }, [location]);

  return (
    <>
<<<<<<< HEAD
      <div className="h-[44px]" />
      <NavBar variant="5" text="지도" icon={menuIcon} />
=======
      <NavBar
        variant="5"
        text="지도"
        icon={menuIcon}
        className="relative z-[60]"
        onClick={toggleSideBar}
      />
      <SideBarContainer open={open} onClose={closeSideBar} />
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae

      <div className="relative w-[375px]">
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 z-10 w-[375px] pl-[20px]">
          <div className="flex flex-col gap-[12px]">
            <SearchBarDefault />
            <Carousel>
<<<<<<< HEAD
              <Chip
                label="Floral"
                textColor="floral"
                active={selectedChip === 'Floral'}
                onClick={() =>
                  setSelectedChip((prev) =>
                    prev === 'Floral' ? null : 'Floral'
                  )
                }
              />

              <Chip
                label="Fruity"
                textColor="fruity"
                active={selectedChip === 'Fruity'}
                onClick={() =>
                  setSelectedChip((prev) =>
                    prev === 'Fruity' ? null : 'Fruity'
                  )
                }
              />

              <Chip
                label="Smoky"
                textColor="smoky"
                active={selectedChip === 'Smoky'}
                onClick={() =>
                  setSelectedChip((prev) => (prev === 'Smoky' ? null : 'Smoky'))
                }
              />

              <Chip
                label="Oceanic"
                textColor="oceanic"
                active={selectedChip === 'Oceanic'}
                onClick={() =>
                  setSelectedChip((prev) =>
                    prev === 'Oceanic' ? null : 'Oceanic'
                  )
                }
              />

              <Chip
                label="Earthy"
                textColor="earthy"
                active={selectedChip === 'Earthy'}
                onClick={() =>
                  setSelectedChip((prev) =>
                    prev === 'Earthy' ? null : 'Earthy'
                  )
                }
              />

              <Chip
                label="Sweet"
                textColor="sweet"
                active={selectedChip === 'Sweet'}
                onClick={() =>
                  setSelectedChip((prev) => (prev === 'Sweet' ? null : 'Sweet'))
                }
              />

              <Chip
                label="Spices"
                textColor="spices"
                active={selectedChip === 'Spices'}
                onClick={() =>
                  setSelectedChip((prev) =>
                    prev === 'Spices' ? null : 'Spices'
                  )
                }
              />

              <Chip
                label="Nutty"
                textColor="nutty"
                active={selectedChip === 'Nutty'}
                onClick={() =>
                  setSelectedChip((prev) => (prev === 'Nutty' ? null : 'Nutty'))
                }
              />
            </Carousel>
          </div>
          {/* GPS 아이콘 */}
          <button
            type="button"
            onClick={setCurrentLocation}
            className="absolute top-[584px] bottom-[68px] right-[20px] cursor-pointer"
            disabled={loading}
          >
            <img src={GPSIcon} alt="GPS icon" className="w-[62px] h-[62px]" />
          </button>
          {error && <p>{error}</p>}
        </div>
        <Map center={location} />
=======
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
>>>>>>> cde5186a929ca3ddb32f825775293dcde8c55cae
      </div>
    </>
  );
};

export default MapPage;
