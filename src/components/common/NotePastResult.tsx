type Props = {
  text: string;
};

const NotePastResult = ({ text }: Props) => {
  return (
    <div
      className="
        inline-flex items-center
        h-[28px]
        px-[12px] py-[4px]
        border border-white
        bg-gray-200
      "
    >
      <span
        className="
          font-body
          text-[16px]
          font-regular
          leading-[140%]
          text-white
        "
      >
        {text}
      </span>
    </div>
  );
};

export default NotePastResult;
