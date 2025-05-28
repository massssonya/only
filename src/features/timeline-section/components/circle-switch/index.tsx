import "./styles.scss";
import { Arrow } from "../../../../shared/assets/icons";
import { Button } from "../../../../shared/ui/button";
import { useAnimationTimeline } from "../../model/animation-context";
import { Block } from "../../../../shared/mocks/data";

export function CircleSwitch({ blocks }: { blocks: Block[] }) {
	const { activeBlockId, setActiveBlockId } = useAnimationTimeline();
	const currentBlockNumber =
		blocks.findIndex((block) => block.id === activeBlockId) + 1;
	const totalBlocks = blocks.length;
	const isPrevDisabled = currentBlockNumber <= 1;
	const isNextDisabled = currentBlockNumber >= totalBlocks;

	const clickAddCount = () => {
		if (!isNextDisabled) {
			setActiveBlockId(blocks[currentBlockNumber].id);
		}
	};
	const clickSubtrictCount = () => {
		if (!isPrevDisabled) {
			setActiveBlockId(blocks[currentBlockNumber - 2].id);
		}
	};
	return (
		<div className="circle-switch">
			<span>
				0{currentBlockNumber}/0{totalBlocks}
			</span>
			<div className="circle-switch-buttons">
				<Button
					variant="outline"
					icon={<Arrow />}
					direction="left"
					disabled={isPrevDisabled}
					onClick={clickSubtrictCount}
				/>
				<Button
					variant="outline"
					icon={<Arrow />}
					disabled={isNextDisabled}
					onClick={clickAddCount}
				/>
			</div>
		</div>
	);
}
