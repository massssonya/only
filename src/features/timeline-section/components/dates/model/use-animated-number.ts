import { useEffect, useState } from "react";

export function useAnimatedNumber(target: number | undefined) {
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
