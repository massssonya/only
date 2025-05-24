import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./styles.scss";
import { useAnimationTimeline } from "../model/animation-context";

export default function Circle({
	blocks
}: {
	blocks: { id: string; title: string }[];
}) {
	const isFirstRender = useRef(true);
	const { timeline, activeBlockId, setActiveBlockId } = useAnimationTimeline();
	const prevActiveIdRef = useRef<string>(activeBlockId);
	const rotationRef = useRef<number>(0);
	const countBlock = blocks.length;

	const angleStep = 360 / countBlock;
	const desiredOffset = -angleStep; // например, 60° при 6 элементах — один шаг от 0, т.е. верх-право

	useEffect(() => {
		const currentIndex = blocks.findIndex((b) => b.id === activeBlockId);
		const initialRotation = desiredOffset - currentIndex * angleStep;
		const circle = document.querySelector(".circle");

		rotationRef.current = initialRotation;

		if (circle) {
			gsap.set(".circle", { rotate: initialRotation });
			gsap.set(".point", { rotate: -initialRotation });
			gsap.set(".point__label", { opacity: 0 });
			gsap.set(".point__label.active", { opacity: 1 });
		}
	}, []);

	useLayoutEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if (!timeline) return;

		const prevIndex = blocks.findIndex((b) => b.id === prevActiveIdRef.current);
		const currentIndex = blocks.findIndex((b) => b.id === activeBlockId);

		if (prevIndex === -1 || currentIndex === -1) return;

		const rotationDelta = (currentIndex - prevIndex) * angleStep;
		rotationRef.current -= rotationDelta;

		timeline
			.clear()
			.to(".circle", {
				rotate: rotationRef.current,
				duration: 1,
				ease: "power2.inOut"
			})
			.to(
				".point",
				{
					rotate: -rotationRef.current,
					duration: 1,
					ease: "power2.inOut"
				},
				"<"
			)
			.to(
				".point__label:not(.active)",
				{
					opacity: 0,
					duration: 0.4,
					ease: "ease"
				},
				"<"
			)
			.to(
				".point__label.active",
				{
					opacity: 1,
					duration: 0.4,
					delay: 1,
					ease: "power1.inOut"
				},
				">"
			);

		timeline.play();
		prevActiveIdRef.current = activeBlockId;
	}, [activeBlockId]);

	const handleClick = (nextId: string) => {
		const prevId = prevActiveIdRef.current;
		if (nextId === prevId) return;

		localStorage.setItem("activeId", nextId);
		setActiveBlockId(nextId);
		prevActiveIdRef.current = nextId;

		const prevIndex = blocks.findIndex((b) => b.id === prevId);
		const nextIndex = blocks.findIndex((b) => b.id === nextId);
		const rotationDelta = (nextIndex - prevIndex) * angleStep;
		rotationRef.current -= rotationDelta;
	};

	return (
		<div className="circle" data-points={countBlock}>
			{blocks.map((block, i) => (
				<CircleItem
					key={i}
					id={block.id}
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
