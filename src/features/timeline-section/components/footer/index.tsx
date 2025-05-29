import "./styles.scss";
import { Block } from "../../../../shared/mocks/data";
import { Button } from "../../../../shared/ui/button";
import { Arrow } from "../../../../shared/assets/icons";
import { CircleSwitch } from "../circle-switch";
import { Slider } from "../slider";

export const Footer = ({ blocks }: { blocks: Block[] }) => {
	return (
		<div className="footer-container">
			<div className="empty"></div>
			<div className="switch"><CircleSwitch blocks={blocks} /></div>
			<div className="empty"></div>
			<div className="swiper-left-button">
				<div className="button-container">
					<Button
						className="swiper-button swiper-button-prev"
						direction="left"
						icon={<Arrow />}
					/>
				</div>
			</div>
			<div className="slider"><Slider blocks={blocks} /></div>
			<div className="swiper-right-button">
				<div className="button-container">
					<Button className="swiper-button swiper-button-next" icon={<Arrow />} />
				</div>
			</div>
		</div>
	)
}
