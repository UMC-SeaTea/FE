import { useEffect, useRef } from 'react';
import { DEFAULT_LOCATION } from '../../hooks/useLocation';
import type { SpaceBoundParams } from '../../types/spaces/spaceBound';

declare global {
  interface Window {
    naver: any;
  }
}

type Propse = {
  center?: {
    lat: number;
    lng: number;
  } | null;
  onBoundsChange?: (params: SpaceBoundParams) => void;
  // pins?: SpaceBase[];
};

const Map = ({ center, onBoundsChange, pins = [] }: Propse) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const pinsRef = useRef<any[]>([]);

  useEffect(() => {
    const initMap = () => {
      const mapElement = document.getElementById('map');
      if (!mapElement) return;
      if (mapRef.current) return;

      const initialCenter = new window.naver.maps.LatLng(
        DEFAULT_LOCATION.lat,
        DEFAULT_LOCATION.lng
      );

      const mapOptions = {
        center: initialCenter,
        zoom: 14,
      };

      mapRef.current = new window.naver.maps.Map(mapElement, mapOptions);

      // 내 위치
      markerRef.current = new window.naver.maps.Marker({
        position: initialCenter,
        map: mapRef.current,
      });

      // 지도 움직임 끝났을 때 bounds -> params
      const listener = window.naver.maps.Event.addListener(
        mapRef.current,
        'idle',
        () => {
          const bounds = mapRef.current.getBounds();
          const southWest = bounds.getSW();
          const northEast = bounds.getNE();

          onBoundsChange?.({
            southWestLat: southWest.lat(),
            southWestLng: southWest.lng(),
            northEastLat: northEast.lat(),
            northEastLng: northEast.lng(),
          });
        }
      );
    };

    const mapScript = document.createElement('script');
    mapScript.dataset.naverMaps = 'true';
    mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${import.meta.env.VITE_NAVER_MAP_KEY}`;
    mapScript.async = true;
    mapScript.defer = true;

    mapScript.onload = initMap;
    mapScript.onerror = () => {
      console.error('Failed to load Naver Maps script');
    };

    document.head.appendChild(mapScript);
  }, [onBoundsChange]);

  // 내 위치 center로 이동
  useEffect(() => {
    if (!center || !mapRef.current || !markerRef.current) return;

    const nextCenter = new window.naver.maps.LatLng(center.lat, center.lng);
    mapRef.current.setCenter(nextCenter);
    markerRef.current.setPosition(nextCenter);
  }, [center]);

  // pins가 바뀌면 공간 마커 다시 그리기
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 핀들 제거
    pinsRef.current.forEach((pin) => pin.setMap(null));
    pinsRef.current = [];

    // 새로운 핀들 추가
    const markers = pins.map((p: any) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(p.lat, p.lng),
        map: mapRef.current,
        // icon:
      });
      return marker;
    });
    pinsRef.current = markers;
  }, [pins]);

  return <div id="map" className="w-[375px] h-[770px]" />;
};

export default Map;
