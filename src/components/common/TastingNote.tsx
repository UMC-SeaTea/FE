const TastingNote = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-[335px] bg-white border-1 border-gray-400 rounded-lg pt-[32px] pb-[22px] px-[22px]">
        <div className="w-[291px] flex flex-col items-center gap-[32px]">
          {/* 위 텍스트 */}
          <div className="flex flex-col justify-between gap-[12px] w-full">
            <p className="font-body text-body-1">테이스팅 노트란?</p>
            <p className="font-body text-body-5 text-black-2">
              티 테이스팅 노트는 차에 실제로 첨가된 재료가 아닌, 차의 맛과 향을
              감각적으로 표현하는 용어입니다.
              <br />
              와인을 맛볼 때 '과일 향'이나 '오크 향'을 느끼는 것 처럼,
              <br /> 차에서도 꽃, 과일, 견과류 등 다양한 풍미를 발견할 수
              있습니다.
              <br />
              <br />
              SeaTea는 이러한 테이스팅 노트를 8가지 휴식 유형에 비유하여, 당신의
              마음에 꼭 맞는 휴식을 찾아 드립니다.
            </p>
          </div>
          {/* 테이스팅 노트 결정 */}
          <div className="w-[291px] h-[83px] bg-gray-500 rounded-lg px-[12px] py-[20px]">
            <div className="flex flex-col gap-[4px]">
              <div className="h-[21px] flex items-center gap-[4px]">
                <p className="font-body text-body-3 text-brand">Q.</p>
                <p className="font-body text-body-3 text-black-2">
                  테이스팅 노트는 어떻게 결정되나요?
                </p>
              </div>
              <p className="font-body text-detail-1 text-gray-100">
                <span className="text-brand">가장 최근의 진단 결과</span>로
                테이스팅 노트가결정됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TastingNote;
