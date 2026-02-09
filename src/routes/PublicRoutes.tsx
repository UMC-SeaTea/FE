import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import LoginStartPage from '../pages/Login/LoginStartPage';
import MapDetailPage from '../pages/Map/MapDetailPage';
import MapPage from '../pages/Map/MapPage';
import DiagnosisStart from '../pages/Diagnosis/DiagnosisStart';
import DiagnosisLoading from '../pages/Diagnosis/DiagnosisLoading';
import SimpleDiagnosisIntro from '../pages/Diagnosis/SimpleDiagnosisIntro';
import SimpleDiagnosisPick from '../pages/Diagnosis/SimpleDiagnosisPick';
import DiagnosisResultLoading from '../pages/Diagnosis/DiagnosisResultLoading';
import DiagnosisCompletePage from '../pages/Diagnosis/DiagnosisCompletePage';
import DiagnosisSpaceRecommendPage from '../pages/Diagnosis/DiagnosisSpaceRecommendPage';
import MyPage from '../pages/MyPage/MyPage';
import DiagnosisAdvancedLoading from '../pages/Diagnosis/DiagnosisAdvancedLoading';
import MyTeabag from '../pages/MyTeabagPage';
import DiagnosisDetail from '../pages/Diagnosis/DiagnosisDetail';
import MapSearchPage from '../pages/Map/MapSearchPage';
import SignUpPage from '../pages/SignUpPage';
import MyTastingPage from '../pages/MyTasting/MyTastingPage';
import SpaceRecommend from '../pages/SpaceRecommendPage';
import MyPageProfileEdit from '../pages/MyPage/MyPageProfileEdit';
import PastResultPage from '../pages/MyTasting/PastResultPage';

export const publicRoutes = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/map/search', element: <MapSearchPage /> },
      { path: '/map/:sid', element: <MapDetailPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/mytasting', element: <MyTastingPage /> },
      { path: '/mytasting/past', element: <PastResultPage /> },
      { path: '/recommend', element: <SpaceRecommend /> },
      { path: '/diagnosis', element: <DiagnosisStart /> },
      { path: '/diagnosis/loading', element: <DiagnosisLoading /> },
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
      { path: '/login', element: <LoginPage /> },
      { path: '/login/start', element: <LoginStartPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/myteabag', element: <MyTeabag /> },
      { path: '/mypage/profile-edit', element: <MyPageProfileEdit /> },
    ],
  },
];
