import React from 'react';
import HomePage from '../pages/HomePage';
import { ProtectedWrapper } from './wrappers/AuthWrappers';
import MyPage from '../pages/MyPage/MyPage';
import MyTeabagPage from '../pages/MyTeabagPage';
import MyPageProfileEdit from '../pages/MyPage/MyPageProfileEdit';
import MapPage from '../pages/Map/MapPage';
import MapSearchPage from '../pages/Map/MapSearchPage';
import MapDetailPage from '../pages/Map/MapDetailPage';
import MyTastingPage from '../pages/MyTasting/MyTastingPage';
import PastResultPage from '../pages/MyTasting/PastResultPage';
import SpaceRecommend from '../pages/SpaceRecommendPage';
import DiagnosisStart from '../pages/Diagnosis/DiagnosisStart';
import DiagnosisLoading from '../pages/Diagnosis/DiagnosisLoading';
import DiagnosisDetail from '../pages/Diagnosis/DiagnosisDetail';
import SimpleDiagnosisIntro from '../pages/Diagnosis/SimpleDiagnosisIntro';
import SimpleDiagnosisPick from '../pages/Diagnosis/SimpleDiagnosisPick';
import DiagnosisResultLoading from '../pages/Diagnosis/DiagnosisResultLoading';
import DiagnosisCompletePage from '../pages/Diagnosis/DiagnosisCompletePage';
import DiagnosisSpaceRecommendPage from '../pages/Diagnosis/DiagnosisSpaceRecommendPage';
import DiagnosisAdvancedLoading from '../pages/Diagnosis/DiagnosisAdvancedLoading';

import MainLayout from '../layouts/MainLayout';

export const protectedRoutes = [
  {
    element: React.createElement(ProtectedWrapper),
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/mypage', element: <MyPage /> },
          { path: '/myteabag', element: <MyTeabagPage /> },
          { path: '/mypage/profile-edit', element: <MyPageProfileEdit /> },
          { path: '/map', element: <MapPage /> },
          { path: '/map/search', element: <MapSearchPage /> },
          { path: '/map/:sid', element: <MapDetailPage /> },
          { path: '/mytasting', element: <MyTastingPage /> },
          { path: '/mytasting/past', element: <PastResultPage /> },
          { path: '/recommend', element: <SpaceRecommend /> },
          { path: '/diagnosis', element: <DiagnosisStart /> },
          { path: '/diagnosis/detail', element: <DiagnosisDetail /> },
          { path: '/diagnosis/loading', element: <DiagnosisLoading /> },
          { path: '/diagnosis/simple', element: <SimpleDiagnosisIntro /> },
          { path: '/diagnosis/simple/pick', element: <SimpleDiagnosisPick /> },
          {
            path: '/diagnosis/result/loading',
            element: <DiagnosisResultLoading />,
          },
          { path: '/diagnosis/complete', element: <DiagnosisCompletePage /> },
          {
            path: '/diagnosis/recommend',
            element: <DiagnosisSpaceRecommendPage />,
          },
          {
            path: '/diagnosis/advanced-loading',
            element: <DiagnosisAdvancedLoading />,
          },
        ],
      },
    ],
  },
];
