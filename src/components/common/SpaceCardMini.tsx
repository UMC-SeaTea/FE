import exampleImage from '../../assets/images/exampleSpace.png';

const SpaceCardMini = () => {
  return (
    <>
      <div className="relative w-[120px] h-[120px] overflow-hidden">
        {/* 추후 이미지 API 연동 필요 */}
        <img
          src={exampleImage}
          alt="Example Space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 그라데이션 */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55.8%,#000_92.93%)]" />
        {/* 추후 장소 API 연동 필요 */}
        <div className="absolute bottom-0 left-0 flex flex-col w-full px-[10px] pb-[11px] text-white">
          <p className="font-body text-body-4">국립현대미술관</p>
          <p className="font-body text-detail-4">서울</p>
        </div>
      </div>
    </>
  );
};

export default SpaceCardMini;
