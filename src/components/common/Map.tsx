import { useEffect, useRef } from 'react';
import { DEFAULT_LOCATION } from '../../hooks/useLocation';

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
};

const Map = ({ center }: Propse) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

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

      markerRef.current = new window.naver.maps.Marker({
        position: initialCenter,
        map: mapRef.current,
      });
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
  }, []);

  useEffect(() => {
    if (!center || !mapRef.current || !markerRef.current) return;

    const nextCenter = new window.naver.maps.LatLng(center.lat, center.lng);
    mapRef.current.setCenter(nextCenter);
    markerRef.current.setPosition(nextCenter);
  }, [center]);

  return <div id="map" className="w-[375px] h-[770px]" />;
};

export default Map;
