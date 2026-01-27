import { useCallback, useEffect, useState } from 'react';

type UseSideBarOptions = {
  closeOnEsc?: boolean;
};

export default function useSideBar(
  initialOpen = false,
  { closeOnEsc = true }: UseSideBarOptions = {}
) {
  const [open, setOpen] = useState(initialOpen);

  const openSideBar = useCallback(() => setOpen(true), []);
  const closeSideBar = useCallback(() => setOpen(false), []);
  const toggleSideBar = useCallback(() => setOpen((prev) => !prev), []);

  // ESC로 닫기
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSideBar();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, closeOnEsc, closeSideBar]);

  return { open, setOpen, openSideBar, closeSideBar, toggleSideBar };
}
