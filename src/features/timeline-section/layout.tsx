import "./styles.scss";
import { AnimationProvider } from "./model/animation-context";
import { useDevice } from "../../shared/contexts/device-context";
import { lazy, Suspense } from "react";
import { BLOCKS } from "../../shared/mocks/data";

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
			</div>
		</AnimationProvider>
	);
};
