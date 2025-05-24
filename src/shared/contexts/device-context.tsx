import { createContext, useContext, useState, useEffect } from "react";

type DeviceType = {
	isMobile: boolean;
	isDesktop: boolean;
};

const DeviceContext = createContext<DeviceType>({
	isMobile: false,
	isDesktop: true
});

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [device, setDevice] = useState<DeviceType>(() => ({
		isMobile: false,
		isTablet: false,
		isDesktop: true
	}));

	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkDevice = () => {
			const width = window.innerWidth;
			setDevice({
				isMobile: width <= 768,
				isDesktop: width > 768
			});
		};

		checkDevice();

		const observer = new ResizeObserver(() => {
			checkDevice();
		});

		observer.observe(document.documentElement);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
	);
};

export const useDevice = () => {
	const context = useContext(DeviceContext);
	if (!context) {
		throw new Error("useDevice must be used within DeviceProvider");
	}
	return context;
};
