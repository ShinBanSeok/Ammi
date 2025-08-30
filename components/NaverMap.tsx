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
  const companyCoords = { lat: 37.562095011763546, lng: 127.01922947817674 }; // 정확한 좌표

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
          content:
            '<div style="background: #ff4444; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
          anchor: new window.naver.maps.Point(10, 10),
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
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
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
