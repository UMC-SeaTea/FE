import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../../constants/key';
import { useDiagnosisHistory } from '../../hooks/diagnosis/useDiagnosisHistory';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';

export const ProtectedWrapper = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  const { data, isLoading, refetch } = useDiagnosisHistory(0, 1);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
