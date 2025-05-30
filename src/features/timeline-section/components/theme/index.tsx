import { useRef } from "react";
import { Block } from "../../../../shared/mocks/data";
import { useAnimationTimeline } from "../../model/animation-context";
import { FadeInOutSwitcher } from "../../../../shared/ui/fade-in-out-switcher";

export default function Theme({ blocks }: { blocks: Block[] }) {
	const { activeBlockId } = useAnimationTimeline();
	// const [renderedBlockId, setRenderedBlockId] = useState(activeBlockId);
	// const [phase, setPhase] = useState<"idle" | "hiding" | "showing">("idle");

	const currentTheme = blocks.find(block => block.id === activeBlockId);
	if (!currentTheme) return null;

	const { title } = currentTheme;

	// useLayoutEffect(() => {
	// 	const theme = themeRef.current;
	// 	if (!theme || !timeline) return;

	// 	gsap.killTweensOf(theme);
	// 	gsap.set(theme, { opacity: 0 });

	// 	timeline.fromTo(theme, { opacity: 0 }, { opacity: 1, duration: 1 }).play();
	// }, []);

	// useEffect(() => {
	// 	if (activeBlockId === renderedBlockId || phase !== "idle" || !timeline) return;

	// 	const theme = themeRef.current;
	// 	if (!theme) return;

	// 	setPhase("hiding");

	// 	gsap.killTweensOf(theme);
	// 	timeline
	// 		.to(theme, {
	// 			opacity: 0,
	// 			duration: 0.4,
	// 			onComplete: () => {
	// 				setRenderedBlockId(activeBlockId);
	// 				setPhase("showing");
	// 			}
	// 		})
	// 		.play();
	// }, [activeBlockId, renderedBlockId, phase, timeline]);

	// useLayoutEffect(() => {
	// 	if (phase !== "showing" || !timeline) return;

	// 	const theme = themeRef.current;
	// 	if (!theme) return;

	// 	gsap.killTweensOf(theme);
	// 	gsap.set(theme, { opacity: 0 });

	// 	timeline
	// 		.fromTo(theme, { opacity: 0 }, {
	// 			opacity: 1,
	// 			duration: 0.4,
	// 			onComplete: () => {
	// 				setPhase("idle");
	// 			}
	// 		})
	// 		.play();
	// }, [renderedBlockId, phase, timeline]);

	return (
		<FadeInOutSwitcher uniqueKey={currentTheme.id}>
			<div className="theme">
				<h3>{title}</h3>
			</div>
		</FadeInOutSwitcher>
	);
}