// src/components/Diagnosis/DiagnosisTopBar.tsx
import backIcon from "../../assets/backButton_black.svg";

type Props = {
  title: string;
  onBack: () => void;
};

export default function DiagnosisTopBar({ title, onBack }: Props) {
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="absolute left-[18px] top-0 w-[28px] h-[28px] inline-flex items-center justify-center"
      >
        <img src={backIcon} alt="" className="w-[24px] h-[24px]" />
      </button>

      {/* 좌/우 버튼 영역 확보(px-[56px])는 유지, 제목은 2줄까지 줄바꿈 허용 */}
      <div className="flex items-start justify-center">
        <h1
          className="
            w-full
            px-[56px]
            text-center
            text-title-4
            font-title
            font-[400]
            text-footer
            leading-[28px]
            whitespace-normal
            break-keep
            [display:-webkit-box]
            [-webkit-box-orient:vertical]
            [-webkit-line-clamp:2]
            overflow-hidden
          "
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
