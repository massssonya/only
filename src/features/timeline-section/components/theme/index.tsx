import { Block } from "../../../../shared/mocks/data";
import { useAnimationTimeline } from "../../model/animation-context";
import { FadeInOut } from "../../../../shared/ui/effects/fade-in-out";

export default function Theme({ blocks }: { blocks: Block[] }) {
	const { activeBlockId, globalTimeline } = useAnimationTimeline();

	const currentTheme = blocks.find(block => block.id === activeBlockId);
	if (!currentTheme) return null;

	const { title } = currentTheme;

	return (

		<FadeInOut label="theme" globalTimeline={globalTimeline}>

			<div className="theme">
				<h3>{title}</h3>
			</div>
		</FadeInOut>
	);
}