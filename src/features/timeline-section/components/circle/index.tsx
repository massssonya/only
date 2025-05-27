import { useEffect, useLayoutEffect, useRef } from "react";
import "./styles.scss";
import { useAnimationTimeline } from "../../model/animation-context";
import { useCircle } from "./model/use-circle";

export default function Circle({
	blocks
}: {
	blocks: { id: string; title: string }[];
}) {
	const circleRef = useRef<HTMLDivElement>(null);


	const isFirstRender = useRef(true);
	const { timeline, activeBlockId, setActiveBlockId } = useAnimationTimeline();

	const { handleClick, initializeRotation, animateCircle } = useCircle({
		blocks,
		activeBlockId,
		setActiveBlockId,
		timeline,
		circleRef
	});

	useEffect(() => {
		initializeRotation();
	}, []);

	useLayoutEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		animateCircle();
	}, [activeBlockId]);

	return (
		<div ref={circleRef} className="circle" data-points={blocks.length}>
			{blocks.map((block, i) => (
				<CircleItem
					key={i}
					id={(i+1).toString()}
					title={block.title}
					isActive={block.id === activeBlockId}
					onClick={() => handleClick(block.id)}
				/>
			))}
		</div>
	);
}

const CircleItem = ({
	id,
	title,
	isActive,
	onClick
}: {
	id: string;
	title: string;
	isActive: boolean;
	onClick: () => void;
}) => {
	return (
		<button
			className={`point ${isActive ? "active" : ""}`}
			name={`point-${id}`}
			type="button"
			onClick={onClick}
		>
			<span className="point__id">{id}</span>
			<label
				htmlFor={`point-${id}`}
				className={`point__label ${isActive ? "active" : ""}`}
			>
				{title}
			</label>
		</button>
	);
};
