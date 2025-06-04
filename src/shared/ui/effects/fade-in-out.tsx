import { ReactNode, useEffect, useRef, useState } from "react";
import {gsap} from "gsap";

export function FadeInOut({
    children,
    label,
    globalTimeline,
    durationIn = 0.5,
    durationOut = 0.5
  }: {
    children: ReactNode;
    label: string;
    globalTimeline?: gsap.core.Timeline;
    durationIn?: number;
    durationOut?: number
  }) {
    const [displayedChildren, setDisplayedChildren] = useState(children);
    const containerRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (!containerRef.current || !globalTimeline) return;
  
      const tl = gsap.timeline();
  
      tl.to(containerRef.current, {
        opacity: 0,
        duration: durationOut,
        ease: 'power2.in',
        onComplete: () => {
          setDisplayedChildren(children);
        },
      });
  
      tl.to(containerRef.current, {
        opacity: 1,
        duration: durationIn,
        ease: 'power2.out',
      });
      globalTimeline.add(tl, label)
  
    }, [children]);
  
    return (
      <div ref={containerRef} style={{ opacity: 0, background: "transparent" }}>
        {displayedChildren}
      </div>
    )
  }