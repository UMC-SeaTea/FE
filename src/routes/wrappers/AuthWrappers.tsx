import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../../constants/key';
import { useDiagnosisHistory } from '../../hooks/diagnosis/useDiagnosisHistory';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export const ProtectedWrapper = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login/start" replace state={{ from: location }} />;
  }
  const { data, isLoading } = useDiagnosisHistory(1, 1);

  if (isLoading) return <LoadingSpinner />;

  const hasDiagnosis = (data?.result?.content?.length ?? 0) > 0;
  const isOnDiagnosisFlow = location.pathname.startsWith('/diagnosis');

  if (!hasDiagnosis && !isOnDiagnosisFlow) {
    return <Navigate to="/diagnosis" replace />;
  }

  return <Outlet />;
};

export const PublicWrapper = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);

  return token ? <Navigate to="/" replace /> : <Outlet />;
};
