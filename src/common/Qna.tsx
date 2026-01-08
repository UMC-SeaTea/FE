const Qna = () => {
  return (
    <>
    <div className="flex flex-col w-[291px] px-5 py-5 justify-center items-start gap-1 rounded-lg border border-gray-500 bg-gray-500 ">
      <div className="font-body text-body-1 ">
       <span className="text-brand">Q.</span>
       <span className="text-black"> 테이스팅 노트는 어떻게 결정되나요?</span>
      </div>
      <div className="font-body text-detail-1  ">
       <span className="text-brand">가장 최근의 진단 결과</span>
       <span className="text-gray-100">로 테이스팅 노트가 결정됩니다.</span>
      </div>
    </div>
    </>
  )
}

export default Qna
