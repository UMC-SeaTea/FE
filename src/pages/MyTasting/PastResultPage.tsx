import NavBar from '../../components/common/NavBar';
import backIcon from '../../assets/backButton_black.svg';
import { useNavigate } from 'react-router-dom';
import PastResult from '../../components/common/PastResult';

const PastResultPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar variant="3" icon={backIcon} onClick={() => navigate(-1)} />
      <div className="px-[20px] pt-[28px]">
        <p className="font-body text-body-title text-black pb-[20px]">
          과거 진단내역
        </p>
        <div className="flex flex-col gap-[8px]">
          <PastResult type="Fruity" date="2025.11.09" />
          <PastResult type="Floral" date="2025.11.09" />
        </div>
        <p className="pt-[37px] text-center font-body text-body-title text-gray-300">
          목록의 끝입니다.
        </p>
      </div>
    </>
  );
};

export default PastResultPage;
