import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Block } from "../../../../shared/mocks/data";
import { useAnimationTimeline } from "../../model/animation-context";

import "./styles.scss";
import "swiper/css";
import "swiper/css/pagination";
import { useDevice } from "../../../../shared/contexts/device-context";
import { useSwiperController } from "./model/use-swiper-controller";
import { useSortedBlockEvents } from "./model/use-sorted-block-events";
import { useSwiperEffects } from "./model/use-swiper-effects";
import { getSliderConfig } from "./slider-config";
import { FadeInOutSwitcher } from "../../../../shared/ui/fade-in-out-switcher";


export const Slider = memo(({ blocks }: { blocks: Block[] }) => {
	const { isMobile } = useDevice();
	const { activeBlockId } = useAnimationTimeline();

	const { handleSwiper, swiperRef } = useSwiperController()
	const { countEvents, sortData } = useSortedBlockEvents(blocks)
	useSwiperEffects(swiperRef, countEvents, activeBlockId)

	return (
		<FadeInOutSwitcher uniqueKey={activeBlockId}>
			<div className="swiper-container">
				<Swiper
					onSwiper={handleSwiper}
					className="swiper"
					{...getSliderConfig(countEvents, isMobile)}
				>
					{sortData.map((slide) => (
						<SwiperSlide className="swiper-slide" key={slide.id}>
							<div className="slide">
								<p className="slide-title">{slide.year}</p>
								<p className="slide-text">{slide.text}</p>
							</div>
						</SwiperSlide>
					))}
					<SwiperSlide className="swiper-slide ghost-slide" />
				</Swiper>
			</div>
		</FadeInOutSwitcher>
	);
})
