import React from 'react';
import { useRef, useState } from 'react';

export default function Carousel({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // 마우스 눌렀을 때
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    setIsDragging(true);
    startXRef.current = e.pageX - el.getBoundingClientRect().left;
    startScrollLeftRef.current = el.scrollLeft;
  };

  // 마우스 움직일 때
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.getBoundingClientRect().left;
    const walk = x - startXRef.current;
    el.scrollLeft = startScrollLeftRef.current - walk;
  };

  // 마우스 드래그 종료
  const endDrag = () => setIsDragging(false);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className={[
          'flex gap-[6px]',
          'overflow-x-auto',
          'scrollbar-hide',
          'select-none',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        ].join(' ')}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {React.Children.map(children, (child) => (
          <div className="shrink-0">{child}</div>
        ))}
      </div>
    </div>
  );
}
