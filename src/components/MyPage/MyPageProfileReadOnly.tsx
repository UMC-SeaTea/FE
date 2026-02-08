interface ReadOnlyProps {
  label: string;
  value: string;
}

const MyPageProfileReadOnly = ({ label, value }: ReadOnlyProps) => {
  return (
    <div className="flex flex-col items-start gap-[4px] self-stretch">
      <div className="flex px-[4px] items-center gap-[10px] justify-center">
        <div className="text-gray-300 font-body text-detail-3">{label}</div>
      </div>
      <div className="flex items-center self-stretch h-[48px] px-[11px] rounded-[6px] bg-white/10">
        <div className="text-gray-100 font-body text-body-4">{value}</div>
      </div>
    </div>
  );
};

export default MyPageProfileReadOnly;
