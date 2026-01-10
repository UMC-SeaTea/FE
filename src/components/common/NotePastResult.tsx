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
        border border-[var(--color-white)]
        bg-[var(--color-gray-20)]
      "
    >
      <span
        className="
          font-[var(--font-body)]
          text-[16px]
          font-regular
          leading-[140%]
          text-[var(--color-white)]
        "
      >
        {text}
      </span>
    </div>
  );
};

export default NotePastResult;
