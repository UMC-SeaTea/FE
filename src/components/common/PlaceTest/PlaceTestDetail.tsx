import checkIcon from "../../../assets/checkIcon.svg";
import moveButton from "../../../assets/placeTestMoveButton.svg";

const PlaceTestDetail = () => {
  return (
    <>
    <div className="flex w-[335px] py-5 pl-4 pr-[10px] bg-white rounded-md
    shadow-[0_0_4px_0_rgba(0,0,0,0.06),0_0_16px_0_rgba(94,94,94,0.04)] gap-[158px] items-center">
      <div className="w-[119px] flex flex-col items-start gap-2">
        <div className="flex p-1 items-center justify-center gap-2.5 rounded-[2px] bg-brand">
          <p className="font-body text-detail-3 text-white whitespace-nowrap">정확도 UP</p>
        </div>
        <p className="self-stretch font-body text-body-1 text-black whitespace-nowrap">휴식 유형 상세 진단</p>
        <div className="flex items-center gap-0.5">
           <div className="w-4 h-4 aspect-square  ">
          <img src={checkIcon} alt="check icon" className="w-2.5 h-full"/>
          </div>
          <p className="font-body text-detail-4 text-black-2">약 1-2분 소요</p>
        </div>
      </div>
      <img src={moveButton} alt="moveButton" className="w-1.5 h-3 aspect-[1/2]"/>
    </div>
    </>
  )
}

export default PlaceTestDetail;
