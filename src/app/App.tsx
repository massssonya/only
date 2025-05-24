import { FC } from "react";
import { LayoutTimelineSection } from "../features/timeline-section/layout";
import { DeviceProvider } from "../shared/contexts/device-context";

const App: FC = () => {
	return (
		<DeviceProvider>
			<LayoutTimelineSection title={"Исторические даты"} />
		</DeviceProvider>
	);
};

export default App;
