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
import SpaceRecommend from '../pages/SpaceRecommend';
import MyPage from '../pages/MyPage';
import MyTeabag from '../pages/MyTeabagPage';
import DiagnosisDetail from '../pages/Diagnosis/DiagnosisDetail';
import DiagnosisResultPage from '../pages/DiagnosisResultPage';
import MapSearchPage from '../pages/Map/MapSearchPage';
import SignUpPage from '../pages/SignUpPage';

export const publicRoutes = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/map/search', element: <MapSearchPage /> },
      { path: '/map/:sid', element: <MapDetailPage /> },
      { path: '/explore', element: <></> },
      { path: '/mypage', element: <MyPage/> },
      { path: '/diagnosis/result', element: <DiagnosisResultPage /> },
      { path: '/diagnosis', element: <DiagnosisStart /> },
      { path: "/diagnosis/loading", element: <DiagnosisLoading /> },
      { path: "/diagnosis/detail", element: <DiagnosisDetail /> },
      { path: '/diagnosis/loading', element: <DiagnosisLoading /> },
      { path: '/diagnosis/simple', element: <SimpleDiagnosisIntro /> },
      { path: '/diagnosis/simple/pick', element: <SimpleDiagnosisPick /> },
      { path: "/diagnosis/result/loading", element: <DiagnosisResultLoading /> },
      { path: '/diagnosiscomplete', element: <DiagnosisCompletePage /> },
      { path: '/diagnosis/question/1', element: <div>Question 1</div> },
      { path: '/recommend', element: <SpaceRecommend /> },
      { path: '/login', element : <LoginPage/>},
      { path: '/loginstart', element: <LoginStartPage/>},
      { path: '/myteabag', element: <MyTeabag/> },
      { path: '/signup', element: <SignUpPage/>},
    ],
  },
];
