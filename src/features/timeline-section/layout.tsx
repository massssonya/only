import "./styles.scss";
import { AnimationProvider, useAnimationTimeline } from "./model/animation-context";
import { useDevice } from "../../shared/contexts/device-context";
import { lazy, Suspense, useMemo } from "react";
import { BLOCKS } from "../../shared/mocks/data";
import { Dates } from "./dates";

const Circle = lazy(() => import("./circle"));

export const LayoutTimelineSection = ({ title }: { title: string }) => {
	const { isDesktop } = useDevice();
	return (
		<AnimationProvider>
			<div className="container">
				<div className="horizontal-line"></div>
				<div className="vertical-line"></div>
				<h1 className="title">{title}</h1>
				<div className="timeline">
					{isDesktop && (
						<Suspense fallback={null}>
							<Circle blocks={BLOCKS} />
						</Suspense>
					)}
				</div>
				<div className="dates-container">
					<DatesWrapper />
				</div>

			</div>
		</AnimationProvider>
	);
};

const DatesWrapper = () => {
	const { activeBlockId } = useAnimationTimeline();

	const block = useMemo(() => {
		return BLOCKS.find((b) => b.id === activeBlockId);
	}, [activeBlockId]);

	return <Dates block={block} />;
};
