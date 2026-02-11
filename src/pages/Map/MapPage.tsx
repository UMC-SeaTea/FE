import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';
import Chip from '../../components/common/Chip';
import Carousel from '../../components/common/Carousel';
import { useEffect, useState, useMemo } from 'react';
import GPSIcon from '../../assets/RoundButton/gps_btn.svg';
import useLocation from '../../hooks/useLocation';
import SideBarContainer from '../../components/SideBar/SideBarContainer';
import useSideBar from '../../hooks/useSideBar';
import { CHIP_LIST } from '../../constants/chip';
import { type SpaceBoundParams } from '../../types/spaces/spaceBound';
import useDebounce from '../../hooks/useDebounce';
import { useSpaceBound } from '../../hooks/spaces/useSpaceBound';
// import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const MapPage = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });
  const [bounds, setBounds] = useState<SpaceBoundParams | null>(null);
  const debouncedBounds = useDebounce(bounds, 500);

  const { data, isLoading, isError, isFetching } =
    useSpaceBound(debouncedBounds);

  const pins = useMemo(() => {
    const items = data?.result?.items || [];

    const allPins = items.map((it: any) => ({
      spaceId: it.spaceId,
      name: it.name,
      lat: it.lat,
      lng: it.lng,
      tastingTypeCode: it.tastingTypeCode,
    }));

    // 선택된 칩 없으면 전체 표시
    if (!selectedChip) return allPins;

    // 칩 선택 있으면 타입만 필터
    return allPins.filter((p) => p.tastingTypeCode === selectedChip);
  }, [data, selectedChip]);

  const { location, setCurrentLocation, loading, error } = useLocation();

  useEffect(() => {
    if (!location) return;
    console.log('현재 위치:', location.lat, location.lng);
  }, [location]);

  useEffect(() => {
    if (!debouncedBounds) return;

    console.log('API params:', debouncedBounds);
  }, [debouncedBounds]);

  return (
    <>
      <NavBar
        variant="5"
        text="지도"
        icon={menuIcon}
        className="relative z-[60]"
        onClick={toggleSideBar}
      />
      <SideBarContainer open={open} onClose={closeSideBar} />

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
        <div className="relative">
          <Map center={location} onBoundsChange={setBounds} pins={pins} />

          {isLoading && (
            <div className="absolute inset-0 z-[80] flex items-center justify-center bg-white/60">
              {/* <LoadingSpinner /> */}
            </div>
          )}

          {!isLoading && isFetching && (
            <div className="absolute top-3 right-3 z-[80]">
              {/* <LoadingSpinner /> */}
            </div>
          )}
          {isError && <p>에러가 발생했습니다.</p>}
        </div>

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
