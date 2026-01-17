import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';
import Chip from '../../components/common/Chip';
import Carousel from '../../components/common/Carousel';
import { useState } from 'react';

const MapPage = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  return (
    <>
      <NavBar variant="5" text="지도" icon={menuIcon} />

      <div className="relative w-full">
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 z-10 w-full pl-[20px]">
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
        </div>
        <Map />
      </div>
    </>
  );
};

export default MapPage;
