type Props = {
  text: string;
};

const NoteSearch = ({ text }: Props) => {
  return (
    <div
      className="
        inline-flex items-center justify-center
        h-[22px]
        px-[12px] py-[2px]
        rounded-[4px]
        bg-[#F2F2F2]
      "
    >
      <span
        className="
          font-[var(--font-body)]
          text-[13px]
          font-medium
          leading-[140%]
          tracking-[-0.02em]
          text-[var(--color-black-2)]
          text-center
        "
      >
        {text}
      </span>
    </div>
  );
};

export default NoteSearch;
