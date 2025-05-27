import { FC } from "react";
import { LayoutTimelineSection } from "../features/timeline-section/layout";
import { DeviceProvider } from "../shared/contexts/device-context";
import { BLOCKS } from "../shared/mocks/data";

const App: FC = () => {
	return (
		<DeviceProvider>
			<LayoutTimelineSection title={"Исторические даты"} blocks={BLOCKS} />
		</DeviceProvider>
	);
};

export default App;
