import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Arrow } from "../../../../shared/assets/icons";
import { Button } from "../../../../shared/ui/button";
import { Block } from "../../../../shared/mocks/data";
import { useAnimationTimeline } from "../../model/animation-context";

import "./styles.scss";
import "swiper/css";
import "swiper/css/pagination";

export function Slider({ blocks }: { blocks: Block[] }) {
	const { activeBlockId } = useAnimationTimeline();
	const currentBlock = blocks.filter((block) => block.id === activeBlockId)[0];
	const data = currentBlock.events.map((event, index) => ({
		id: index,
		year: event.year,
		text: event.text
	}));
	const countEvents = data.length;

	return (
		<div className="swiper-container">
			<div className="button-container">
				<Button
					className="swiper-button swiper-button-prev"
					direction="left"
					icon={<Arrow />}
				/>
			</div>
			<Swiper

				breakpoints={{
					320: {
						slidesPerView: 1.1,
						spaceBetween: 20
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 30
					},
					1024: {
						slidesPerView: countEvents < 4 ? countEvents : 3.5,
						spaceBetween: countEvents < 4 ? 120 : 40
					}
				}}
				grabCursor
				navigation={{
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
					disabledClass: "swiper-button-disabled",
					hiddenClass: "swiper-button-hidden"
				}}
				className="swiper"
				modules={[Navigation, Pagination]}
			>
				{data.map((slide) => (
					<SwiperSlide className="swiper-slide" key={slide.id}>
						<div className="slide">
							<p className="slide-title">{slide.year}</p>
							<p className="slide-text">{slide.text}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="button-container">
				<Button className="swiper-button swiper-button-next" icon={<Arrow />} />
			</div>
		</div>
	);
}
