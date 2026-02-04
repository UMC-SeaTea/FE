import clsx from 'clsx';
import completeIcon from '../../assets/complete.svg';

type ToastProps = {
  className?: string;
  text: string;
};

const Toast = ({ className, text }: ToastProps) => {
  return (
    <div
      className={clsx(
        'w-[258px] h-[45px] bg-[#000] rounded-[6px] px-[16px] py-[12px] flex gap-[10px] items-center',
        className
      )}
    >
      <img src={completeIcon} alt="complete" className="w-[18px] h-[18px]" />
      <p className="text-body-4 font-body text-gray-500">{text}</p>
    </div>
  );
};

export default Toast;
