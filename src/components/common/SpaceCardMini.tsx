import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import type { MouseEvent } from 'react';
import DeleteIcon from '../../assets/teaBag.svg';

type SpaceCardMiniProps = {
  className?: string;
  name: string;
  roadAddress: string;
  thumbnailImageUrl: string;
  spaceId: number;

  isEditMode: boolean;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const SpaceCardMini = ({
  className,
  name,
  roadAddress,
  thumbnailImageUrl,
  spaceId,
  isEditMode,
  isSelected,
  onSelect,
  onDelete,
}: SpaceCardMiniProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isEditMode && onSelect) {
      onSelect(spaceId);
    } else {
      navigate(`/map/${spaceId}`);
    }
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(spaceId);
    }
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden cursor-pointer w-[120px] h-[120px] rounded-sm',
        isEditMode && isSelected
          ? 'border-[3px] border-brand'
          : 'border border-transparent',
        className
      )}
      onClick={handleCardClick}
    >
      <img
        src={thumbnailImageUrl?.startsWith('http') ? thumbnailImageUrl : ''}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55.8%,#000_92.93%)]" />

      <div className="absolute bottom-0 left-0 flex flex-col w-full px-[10px] pb-[11px] text-white">
        <p className="font-body text-body-4 line-clamp-1">{name}</p>
        <p className="font-body text-detail-4 line-clamp-1">{roadAddress}</p>
      </div>

      {isEditMode && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 z-10 p-1 cursor-pointer hover:opacity-80"
        >
          <img className="w-6 h-6" src={DeleteIcon} alt="저장 취소" />
        </button>
      )}
    </div>
  );
};

export default SpaceCardMini;
