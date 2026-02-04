import { useEffect, useRef, useState } from 'react';
import Toast from './Toast';
import clsx from 'clsx';

type ToastPayload = { text: string; duration?: number };

let _showToast: ((payload: ToastPayload) => void) | null = null;

export const showToast = (payload: ToastPayload) => {
  _showToast?.(payload);
};

const FADE_MS = 250;

const ToastHost = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    _showToast = ({ text, duration = 2000 }) => {
      clearTimers();

      setText(text);
      setOpen(true);

      requestAnimationFrame(() => setVisible(true));

      timers.current.push(
        window.setTimeout(() => {
          setVisible(false);
        }, duration)
      );

      timers.current.push(
        window.setTimeout(() => {
          setOpen(false);
        }, duration + FADE_MS)
      );
    };

    return () => {
      _showToast = null;
      clearTimers();
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[73px] z-[9999]">
      <Toast
        text={text}
        className={clsx(
          'transition-all duration-[250ms]',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        )}
      />
    </div>
  );
};

export default ToastHost;
