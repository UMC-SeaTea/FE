import backIcon from '../../assets/backButton_black.svg';

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
        className="absolute left-[18px] top-[2px] w-[28px] h-[28px] inline-flex items-center justify-center"
      >
        <img src={backIcon} alt="" className="w-[24px] h-[24px]" />
      </button>

      <div className="flex justify-center">
        <h1
          className="
            w-full px-[56px] text-center text-title-4 font-title text-footer whitespace-normal break-keep leading-[140%]"
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
