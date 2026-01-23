import backButton from '../../assets/backButton_gray.svg';

const MyPageList = () => {
  return (
    <>
      <div className="w-[335px] h-[48px] px-[18px] py-[12px] bg-white">
        <div className="flex items-center justify-between">
          <p className="font-body text-body-3 text-black-2">나의 티백</p>
          <img
            src={backButton}
            alt="Back"
            className="cursor-pointer scale-x-[-1]"
          />
        </div>
      </div>
    </>
  );
};

export default MyPageList;
