import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';
import Chip from '../../components/common/Chip';
import Carousel from '../../components/common/Carousel';
import { useEffect, useState } from 'react';
import GPSIcon from '../../assets/RoundButton/gps_btn.svg';
import useLocation from '../../hooks/useLocation';

const MapPage = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const { location, setCurrentLocation, loading, error } = useLocation();

  useEffect(() => {
    if (!location) return;
    console.log('현재 위치:', location.lat, location.lng);
  }, [location]);

  return (
    <>
      <div className="h-[44px]" />
      <NavBar variant="5" text="지도" icon={menuIcon} />

      <div className="relative w-[375px]">
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 z-10 w-[375px] pl-[20px]">
          <div className="flex flex-col gap-[12px]">
            <SearchBarDefault />
            <Carousel>
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
                label="Smocky"
                textColor="smocky"
                active={selectedChip === 'Smocky'}
                onClick={() =>
                  setSelectedChip((prev) =>
                    prev === 'Smocky' ? null : 'Smocky'
                  )
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
      </div>
    </>
  );
};

export default MapPage;
