import { lazy, Suspense } from "react";

import { AnimationProvider } from "./model/animation-context";
import { useDevice } from "../../shared/contexts/device-context";
import { Block } from "../../shared/mocks/data";
import { DatesWrapper } from "./components/dates";
import "./styles.scss";
import { Footer } from "./components/footer";

const Circle = lazy(() => import("./components/circle"));
const Theme = lazy(() => import("./components/theme"));

export const LayoutTimelineSection = ({
	title,
	blocks
}: {
	title: string;
	blocks: Block[];
}) => {
	return (
		<AnimationProvider>
			<TimelineSection title={title} blocks={blocks} />
		</AnimationProvider>
	);
};

const TimelineSection = ({
	title,
	blocks
}: {
	title: string;
	blocks: Block[];
}) => {
	const { isDesktop } = useDevice();

	return (
		<div className="container">
			<div className="horizontal-line"></div>
			<Suspense fallback={null}>
				<div className="theme">
					{!isDesktop ? <Theme blocks={blocks} /> : null}
				</div>
			</Suspense>
			<div className="vertical-line"></div>
			<h1 className="title">{title}</h1>
			<Suspense fallback={null}>
				<div className="timeline">
					{isDesktop ? <Circle blocks={blocks} /> : null}
				</div>
			</Suspense>

			<div className="dates-container">
				<DatesWrapper blocks={blocks} />
			</div>
			<footer className="footer">
				<Footer blocks={blocks} />
			</footer>
		</div>
	);
};
