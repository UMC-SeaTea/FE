import searchIcon from '../../assets/search.svg';

type Variant = '1' | '2' | '3' | '4' | '5' | '6';

type ButtonProps = {
  variant?: Variant;
  text?: string;
  icon: string;
  className?: string;
  onClick?: () => void;
};

const VARIANT_STYLE: Record<
  Variant,
  {
    container: string;
    text?: string;
    icon: string;
  }
> = {
  '1': {
    container: 'bg-white py-[7px]',
    text: 'text-black font-title text-[18px] font-regular',
    icon: 'w-[42px] h-[42px]',
  },
  '2': {
    container: 'bg-white py-[7px]',
    text: 'text-black font-title text-[18px] font-regular',
    icon: 'w-[42px] h-[42px]',
  },
  '3': {
    container: 'bg-white py-[14px]',
    icon: 'w-[28px] h-[28px]',
  },
  '4': {
    container: 'bg-black py-[14px]',
    text: 'text-white font-body text-body-title',
    icon: 'w-[28px] h-[28px]',
  },
  '5': {
    container: 'bg-white py-[7px]',
    text: 'text-black font-body text-body-title',
    icon: 'w-[42px] h-[42px]',
  },
  '6': {
    container: 'bg-black py-[7px]',
    text: 'text-white font-body text-body-title',
    icon: 'w-[42px] h-[42px]',
  },
};

const NavBar = ({ variant, text, icon, className, onClick }: ButtonProps) => {
  const styles = VARIANT_STYLE[variant || '1'];

  return (
    <>
      <div
        className={`w-[375px] h-[56px] px-[20px] ${styles.container} ${className}`}
      >
        <div className="flex items-center gap-[8px]">
          <img
            src={icon}
            alt={text}
            className={`cursor-pointer ${styles.icon}`}
            onClick={onClick}
          />
          <p className={`${styles.text}`}>{text}</p>
          {variant === '2' && <div className="w-[171px]" />}
          {variant === '2' && (
            <img
              src={searchIcon}
              alt="search"
              className={`cursor-pointer w-[42px] h-[42px]`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
