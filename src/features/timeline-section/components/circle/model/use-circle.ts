import { gsap } from "gsap";
import { RefObject, useRef } from "react";

export interface CircleBlock {
	id: string;
	title: string;
}

export interface CircleLogicProps {
	blocks: CircleBlock[];
	activeBlockId: string;
	setActiveBlockId: (id: string) => void;
	timeline: gsap.core.Timeline | null;
	circleRef: RefObject<HTMLDivElement | null>;
}

export interface CircleLogicReturn {
	rotationRef: RefObject<number>;
	angleStep: number;
	desiredOffset: number;
	handleClick: (nextId: string) => void;
	initializeRotation: () => void;
	animateCircle: () => void;
}

export const useCircle = ({
	blocks,
	activeBlockId,
	setActiveBlockId,
	timeline,
	circleRef
}: CircleLogicProps): CircleLogicReturn => {
	const prevActiveIdRef = useRef<string>(activeBlockId);
	const rotationRef = useRef<number>(0);
	const countBlock = blocks.length;
	const angleStep = 360 / countBlock;
	const desiredOffset = -angleStep;

	const handleClick = (nextId: string) => {
		const prevId = prevActiveIdRef.current;
		if (nextId === prevId) return;

		setActiveBlockId(nextId);
		prevActiveIdRef.current = nextId;

		const prevIndex = blocks.findIndex((b) => b.id === prevId);
		const nextIndex = blocks.findIndex((b) => b.id === nextId);
		const rotationDelta = (nextIndex - prevIndex) * angleStep;
		rotationRef.current -= rotationDelta;
	};

	const initializeRotation = () => {
		const currentIndex = blocks.findIndex((b) => b.id === activeBlockId);
		const initialRotation = desiredOffset - currentIndex * angleStep;
		// const circle = document.querySelector(".circle");
		const circle = circleRef.current;

		rotationRef.current = initialRotation;

		if (circle) {
			gsap.set(circle, { rotate: initialRotation });
			gsap.set(circle.querySelectorAll(".point"), { rotate: -initialRotation });
			gsap.set(circle.querySelectorAll(".point__label"), { opacity: 0 });
			gsap.set(circle.querySelectorAll(".point__label.active"), { opacity: 1 });
		}
	};

	const animateCircle = () => {
		if (!timeline) return;
		if (circleRef.current) {
			const circle = circleRef.current;

			const prevIndex = blocks.findIndex(
				(b) => b.id === prevActiveIdRef.current
			);
			const currentIndex = blocks.findIndex((b) => b.id === activeBlockId);

			if (prevIndex === -1 || currentIndex === -1) return;

			const rotationDelta = (currentIndex - prevIndex) * angleStep;
			rotationRef.current -= rotationDelta;

			timeline
				.clear()
				.to(circle, {
					rotate: rotationRef.current,
					duration: 1,
					ease: "power2.inOut"
				})
				.to(
					circle.querySelectorAll(".point"),
					{
						rotate: -rotationRef.current,
						duration: 1,
						ease: "power2.inOut"
					},
					"<"
				)
				.to(
					circle.querySelectorAll(".point__label:not(.active)"),
					{
						opacity: 0,
						duration: 0.4,
						ease: "ease"
					},
					"<"
				)
				.to(
					circle.querySelectorAll(`.point__label.active`),
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
		}
	};

	return {
		rotationRef,
		angleStep,
		desiredOffset,
		handleClick,
		initializeRotation,
		animateCircle
	};
};
