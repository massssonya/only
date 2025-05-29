import { Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

export const getSliderConfig = (
  countEvents: number,
  isMobile?: boolean
): SwiperOptions => ({
  centeredSlides: false,
  breakpoints: {
    320: {
      slidesPerView: 1.4,
      spaceBetween: 25,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: countEvents < 4 ? countEvents : 4,
      spaceBetween: 110,
    },
  },
  grabCursor: true,
  pagination: isMobile
    ? {
        clickable: true,
        type: "bullets",
        bulletActiveClass: "bullet",
      }
    : false,
  navigation: !isMobile
    ? {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-disabled",
      }
    : false,
  modules: [Navigation, Pagination],
});
