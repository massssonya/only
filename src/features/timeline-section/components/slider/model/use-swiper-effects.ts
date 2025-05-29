import { RefObject, useEffect } from "react";
import type SwiperCore from "swiper";

export function useSwiperEffects(
  swiperRef: RefObject<SwiperCore | null>,
  sortDataLength: number,
  activeBlockId: string | number | null
) {

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const updateSlideOpacity = () => {
      swiper.slides.forEach((slide) => {
        slide.classList.remove("next-partial");
      });

      const activeIndex = swiper.activeIndex;
      const nextIndex = activeIndex + 1;

      if (nextIndex < swiper.slides.length) {
        const nextSlide = swiper.slides[nextIndex];
        if (
          nextSlide &&
          nextSlide.classList.contains("swiper-slide-visible") &&
          !nextSlide.classList.contains("swiper-slide-active")
        ) {
          nextSlide.classList.add("next-partial");
        }
      }
    };

    updateSlideOpacity();
    swiper.on("slideChange", updateSlideOpacity);
    swiper.on("resize", updateSlideOpacity);

    return () => {
      swiper.off("slideChange", updateSlideOpacity);
      swiper.off("resize", updateSlideOpacity);
    };
  }, []);


  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) swiper.slideTo(0);
  }, [activeBlockId]);


  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const handleSlideChange = () => {
      if (swiper.activeIndex >= sortDataLength) {
        swiper.slideTo(sortDataLength - 1);
      }
    };

    swiper.on("slideChange", handleSlideChange);
    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [sortDataLength]);
}
