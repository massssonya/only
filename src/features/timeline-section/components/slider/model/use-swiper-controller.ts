import { useRef, useCallback } from "react";
import type SwiperCore from "swiper";

export function useSwiperController() {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSwiper = useCallback((swiper: SwiperCore) => {
    swiperRef.current = swiper;
  }, []);

  return { swiperRef, handleSwiper };
}
