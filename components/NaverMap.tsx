'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  width?: string;
  height?: string;
}

export default function NaverMap({
  width = '100%',
  height = '400px',
}: NaverMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const companyAddress = '서울특별시 중구 다산로 38길 69, 우덕빌딩';
  const companyCoords = { lat: 37.56211, lng: 127.01938 }; // 정확한 좌표

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver || !mapElement.current) return;

      const companyLatLng = new window.naver.maps.LatLng(
        companyCoords.lat,
        companyCoords.lng
      );

      const mapOptions = {
        center: companyLatLng,
        zoom: 17,
        mapTypeControl: false,
        mapDataControl: false,
        logoControl: false,
        scaleControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
          style: window.naver.maps.ZoomControlStyle.SMALL,
        },
      };

      mapInstance.current = new window.naver.maps.Map(
        mapElement.current,
        mapOptions
      );

      // 마커 추가
      const marker = new window.naver.maps.Marker({
        position: companyLatLng,
        map: mapInstance.current,
        title: '(주)암미',
        icon: {
          content: `
            <div style="
              width: 30px; 
              height: 40px; 
              position: relative;
            ">
              <div style="
                width: 26px; 
                height: 26px; 
                background: #fd5454ff; 
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border-radius: 50% 50% 50% 0; 
                transform: rotate(-45deg);
                position: absolute;
                top: 2px;
                left: 2px;
              "></div>
              <div style="
                width: 8px; 
                height: 8px; 
                background: white; 
                border-radius: 50%; 
                position: absolute;
                top: 11px;
                left: 11px;
                z-index: 2;
              "></div>
            </div>
          `,
          anchor: new window.naver.maps.Point(17, 29),
        },
      });

      // 지도 클릭 시 네이버지도 앱/웹으로 이동
      window.naver.maps.Event.addListener(mapInstance.current, 'click', () => {
        const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(
          companyAddress
        )}`;
        window.open(naverMapUrl, '_blank');
      });

      // 마커 클릭 시에도 네이버지도로 이동
      window.naver.maps.Event.addListener(marker, 'click', () => {
        const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(
          companyAddress
        )}`;
        window.open(naverMapUrl, '_blank');
      });
    };

    // 네이버 지도 API 스크립트 로드
    if (!window.naver) {
      const script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=z33mb4b9u0`;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      style={{ width, height }}
    >
      <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
