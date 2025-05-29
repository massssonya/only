import { Block } from "../../../../shared/mocks/data";
import { useAnimationTimeline } from "../../model/animation-context";

export default function Theme({blocks}: {blocks: Block[]}) {
	const {activeBlockId} = useAnimationTimeline();
	const currentTheme = blocks.find(block => block.id === activeBlockId);
	if (!currentTheme) {
		return null;
	}
	const { title } = currentTheme;
	return (
		<div className="theme">
			<h3>{title}</h3>
		</div>
	);
}
