import { useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { Block, BLOCKS } from "../../../shared/mocks/data";
import { useAnimationTimeline } from "../model/animation-context";

function useAnimatedNumber(target: number | undefined) {
	const [displayed, setDisplayed] = useState(target ?? 0);

	useEffect(() => {
		if (typeof target !== "number") return;

		let frame: number;
		const step = () => {
			if (displayed === target) return;

			setDisplayed((prev) => {
				if (prev < target) return prev + 1;
				if (prev > target) return prev - 1;
				return prev;
			});
			frame = requestAnimationFrame(step);
		};

		frame = requestAnimationFrame(step);

		return () => cancelAnimationFrame(frame);
	}, [target]);

	return displayed;
}

export function Dates({ block }: {block?: Block}) {
	const { activeBlockId } = useAnimationTimeline();

	// const block = useMemo(() => {
	// 	return BLOCKS.find((block) => block.id === activeBlockId);
	// }, [activeBlockId]);

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
