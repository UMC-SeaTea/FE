import homeTeaImg from '../../assets/images/homeTeaImg.png';

const HomeComponent = () => {
  return (
    <>
      <div className="w-[335px] h-[94px] rounded-md bg-[#111112] relative overflow-hidden">
        <img
          src={homeTeaImg}
          alt="Home Tea"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute flex flex-col gap-[2px] pl-[14px] pt-[25px]">
          <p className="font-body text-body-1 text-white">
            지금, 어떤 휴식이 필요하신가요?
          </p>
          <p className="font-body text-detail-4 text-[#878787]">
            SeaTea에서 잘 휴식하는 법을 찾아보세요
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
