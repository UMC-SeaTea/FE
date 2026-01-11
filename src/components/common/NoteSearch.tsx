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
        rounded-sm
        bg-[#F2F2F2]
      "
    >
      <span
        className="
          font-body 
          text-detail-1
          leading-[140%]
          tracking-[-0.02em]
          text-black-2
          text-center
        "
      >
        {text}
      </span>
    </div>
  );
};

export default NoteSearch;
