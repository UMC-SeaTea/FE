const Qna = () => {
  return (
  <>
    <div className="flex flex-col w-[291px] px-[5px] py-5 justify-center items-center gap-1 rounded-lg border border-gray-500 bg-gray-500 ">
      <div className="flex flex-col items-start w-[264px] gap-1">
        <div className="flex items-start gap-1">
          <p className="font-body text-body-3 text-brand ">Q.</p>
          <span className="font-body text-body-3 text-black"> 테이스팅 노트는 어떻게 결정되나요?</span>
        </div>
        <div className="self-stretch font-body text-detail-1 w-full text-left break-keep">
          <span className="text-brand">가장 최근의 진단 결과</span>
          <span className="text-gray-100">로 테이스팅 노트가결정됩니다</span>
        </div>
      </div>
    </div>
  </>
  )
}

export default Qna
