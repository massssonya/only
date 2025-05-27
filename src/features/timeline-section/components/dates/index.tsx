import { useMemo } from "react";
import "./styles.scss";
import { Block } from "../../../../shared/mocks/data";
import { useAnimatedNumber } from "./model/use-animated-number";
import { useAnimationTimeline } from "../../model/animation-context";

export function DatesWrapper({ blocks }: { blocks: Block[] }) {
	const { activeBlockId } = useAnimationTimeline();

	const block = useMemo(() => {
		return blocks.find((b) => b.id === activeBlockId);
	}, [activeBlockId]);

	return <Dates block={block} />;
}

function Dates({ block }: { block?: Block }) {
	const minYear = useMemo(() => {
		return block?.events.sort((a, b) => a.year - b.year)[0]?.year;
	}, [block]);

	const maxYear = useMemo(() => {
		return block?.events.sort((a, b) => b.year - a.year)[0]?.year;
	}, [block]);

	const animatedMin = useAnimatedNumber(minYear);
	const animatedMax = useAnimatedNumber(maxYear);

	return (
		<div className="dates">
			<span className="date left">{animatedMin}</span>
			<span className="date right">{animatedMax}</span>
		</div>
	);
}
