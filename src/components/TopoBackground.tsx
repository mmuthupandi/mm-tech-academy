import { useEffect } from 'react';

/**
 * Adds mouse-parallax to the .content-wrapper topo pattern.
 * Moves the ::before background-position offset slightly toward the cursor.
 * No canvas, no DOM nodes — just a CSS variable nudge.
 */
export const TopoBackground = () => {
  useEffect(() => {
    const wrapper = document.querySelector('.content-wrapper') as HTMLElement | null;
    if (!wrapper) return;

    let currentX = 0;
    let currentY = 0;
    let targetX  = 0;
    let targetY  = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      // map mouse to a small ±30px offset range
      const nx = (e.clientX / window.innerWidth  - 0.5) * 60;
      const ny = (e.clientY / window.innerHeight - 0.5) * 60;
      targetX = nx;
      targetY = ny;
    };

    const tick = () => {
      // smooth lerp toward target
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      wrapper.style.setProperty('--topo-mx', `${currentX.toFixed(2)}px`);
      wrapper.style.setProperty('--topo-my', `${currentY.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null; // no DOM output
};
