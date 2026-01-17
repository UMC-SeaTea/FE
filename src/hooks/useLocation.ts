import { useCallback, useState } from 'react';

type Location = {
  lat: number; // 위도
  lng: number; // 경도
};

// 기본 위치: 서울 시청
export const DEFAULT_LOCATION: Location = { lat: 37.5665, lng: 126.9784 };

const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setCurrentLocation = useCallback(() => {
    // 브라우저가 getLocation을 지원 안하면 기본값
    if (!navigator.geolocation) {
      setLocation(DEFAULT_LOCATION);
      setError('Geolocation이 이 브라우저에서 지원되지 않습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setLocation(DEFAULT_LOCATION);
        setError('위치 정보를 가져오는 데 실패했습니다.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { location, setCurrentLocation, loading, error };
};

export default useLocation;
