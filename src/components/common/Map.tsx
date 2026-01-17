import { useEffect } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const mapElement = document.getElementById('map');

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 14,
      };

      new window.naver.maps.Map(mapElement, mapOptions);
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

  return <div id="map" className="w-full h-[714px] mt-[16px]" />;
};

export default Map;
