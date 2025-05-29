import { Block } from "../../../../../shared/mocks/data";
import { useAnimationTimeline } from "../../../model/animation-context";


export function useSortedBlockEvents(blocks: Block[]) {
  const { activeBlockId } = useAnimationTimeline();

  const currentBlock = blocks.find((block) => block.id === activeBlockId);
  const data = currentBlock?.events.map((event, index) => ({
    id: index,
    year: event.year,
    text: event.text,
  })) || [];

  const sortData = [...data].sort((a, b) => a.year - b.year);
  const countEvents = data.length;

  return { sortData, countEvents };
}
