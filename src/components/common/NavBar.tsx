type Variant = '1' | '2' | '3' | '4' | '5' | '6';

type ButtonProps = {
  variant?: Variant;
  text?: string;
  icon: string;
  className?: string;
};

const VARIANT_STYLE: Record<
  Variant,
  {
    container: string;
    text: string;
    icon: string;
  }
> = {
  '1': {
    container: 'bg-white',
    text: 'text-black font-title text-[18px] font-regular',
    icon: 'w-[20px]',
  },
  '2': {
    container: 'bg-blue-500',
    text: 'text-white',
    icon: 'w-[24px]',
  },
  '3': {
    container: 'bg-green-500',
    text: 'text-white',
    icon: 'w-[28px]',
  },
  '4': {
    container: 'bg-red-500',
    text: 'text-white',
    icon: 'w-[32px]',
  },
  '5': {
    container: 'bg-yellow-500',
    text: 'text-black',
    icon: 'w-[36px]',
  },
  '6': {
    container: 'bg-black',
    text: 'text-white',
    icon: 'w-[40px]',
  },
};

const NavBar = ({ variant, text, icon, className }: ButtonProps) => {
  const styles = VARIANT_STYLE[variant || '1'];

  return (
    <>
      <div
        className={`w-[375px] h-[56px] pl-[20px] flex items-center ${styles.container} ${className}`}
      >
        <img src={icon} alt={text} className={styles.icon} />
        <p className={styles.text}>{text}</p>
      </div>
    </>
  );
};

export default NavBar;
