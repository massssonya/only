import { lazy, Suspense } from "react";

import { AnimationProvider } from "./model/animation-context";
import { useDevice } from "../../shared/contexts/device-context";
import { Block } from "../../shared/mocks/data";
import { DatesWrapper } from "./components/dates";
import "./styles.scss";
import { CircleSwitch } from "./components/circle-switch";
import { Slider } from "./components/slider";

const Circle = lazy(() => import("./components/circle"));

export const LayoutTimelineSection = ({
	title,
	blocks
}: {
	title: string;
	blocks: Block[];
}) => {
	const { isDesktop } = useDevice();

	return (
		<AnimationProvider>
			<div className="container">
				<div className="horizontal-line"></div>
				<div className="vertical-line"></div>
				<h1 className="title">{title}</h1>
				<div className="timeline">
					<Suspense fallback={null}>
						{isDesktop ? <Circle blocks={blocks} /> : null}
					</Suspense>
				</div>
				<div className="dates-container">
					<DatesWrapper blocks={blocks} />
				</div>
				<footer className="footer">
					<div className="footer-container">
						<CircleSwitch blocks={blocks} />
						<Slider blocks={blocks} />
					</div>
				</footer>
			</div>
		</AnimationProvider>
	);
};
