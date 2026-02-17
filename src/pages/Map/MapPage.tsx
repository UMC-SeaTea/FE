import NavBar from '../../components/common/NavBar';
import menuIcon from '../../assets/menu_black.svg';
import SearchBarDefault from '../../components/SearchBar/SearchBarDefault';
import Map from '../../components/common/Map';
import Chip from '../../components/common/Chip';
import Carousel from '../../components/common/Carousel';
import { useState, useMemo, useEffect } from 'react';
import GPSIcon from '../../assets/RoundButton/gps_btn.svg';
import useLocation from '../../hooks/useLocation';
import SideBarContainer from '../../components/SideBar/SideBarContainer';
import useSideBar from '../../hooks/useSideBar';
import { CHIP_LIST } from '../../constants/chip';
import { type SpaceBoundParams } from '../../types/spaces/spaceBound';
import useDebounce from '../../hooks/useDebounce';
import { useSpaceBound } from '../../hooks/spaces/useSpaceBound';
import { useDiagnosisHistory } from '../../hooks/diagnosis/useDiagnosisHistory';

const MapPage = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const { open, toggleSideBar, closeSideBar } = useSideBar(false, {
    closeOnEsc: true,
  });
  const [bounds, setBounds] = useState<SpaceBoundParams | null>(null);
  const debouncedBounds = useDebounce(bounds, 500);

  const { data, isLoading, isError, isFetching } =
    useSpaceBound(debouncedBounds);

  const { location, setCurrentLocation, loading, error } = useLocation();

  const { data: historyData, refetch: refetchHistory } = useDiagnosisHistory(
    0,
    100
  );

  useEffect(() => {
    refetchHistory();
  }, []);

  // 사용자가 진단 받은 타입
  const myCodes = useMemo(() => {
    const list = historyData?.result?.content ?? [];

    const seen = new Set<string>();

    return list
      .map((h) => h.typeCode)
      .filter((code) => {
        if (!code || seen.has(code)) return false;
        seen.add(code);
        return true;
      });
  }, [historyData]);

  const myChipList = useMemo(() => {
    return myCodes
      .map((code) => CHIP_LIST.find((chip) => chip.value === code))
      .filter((chip): chip is (typeof CHIP_LIST)[number] => Boolean(chip));
  }, [myCodes]);

  useEffect(() => {
    if (selectedChip && !myCodes.includes(selectedChip)) {
      setSelectedChip(null);
    }
  }, [selectedChip, myCodes]);

  const pins = useMemo(() => {
    if (myChipList.length === 0) return [];

    const items = data?.result?.items || [];

    const allPins = items.map((it: any) => ({
      spaceId: it.spaceId,
      name: it.name,
      lat: it.lat,
      lng: it.lng,
      tastingTypeCode: it.tastingTypeCode,
    }));

    // 내가 가진 타입
    const myTypePins = allPins.filter((p) =>
      myCodes.includes(p.tastingTypeCode)
    );

    // 칩 선택하면 해당 타입만 핀
    if (!selectedChip) return myTypePins;
    return myTypePins.filter((p) => p.tastingTypeCode === selectedChip);
  }, [data, selectedChip, myChipList.length]);

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

      <div className="fixed inset-0 z-0">
        <Map center={location} onBoundsChange={setBounds} pins={pins} />
      </div>

      <div className="relative w-[375px] mx-auto">
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 z-10 w-[375px] pl-[20px]">
          <div className="flex flex-col gap-[12px]">
            <SearchBarDefault />
            {myChipList.length > 0 && (
              <Carousel>
                {myChipList.map((chip) => (
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
            )}
          </div>
          {error && <p>{error}</p>}
        </div>
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
    </>
  );
};

export default MapPage;
