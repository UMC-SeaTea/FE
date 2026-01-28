import editIcon from '../../assets/edit.svg';

type Props = {
  onClick?: () => void;
};

const EditButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[32px] px-[12px] py-[6px]
        rounded-[100px] borderborder-gray-400 bg-white
        inline-flex items-center justify-center gap-[4px]
      "
    >
      <img src={editIcon} alt="편집" className="w-[16px] h-[16px]" />
      <span className="font-body text-body-4 text-gray-200">편집</span>
    </button>
  );
};

export default EditButton;
