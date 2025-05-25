import { createContext, useContext, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimationContextProps {
	timeline: gsap.core.Timeline;
	activeBlockId: string;
	setActiveBlockId: (id: string) => void;
}

const AnimationContext = createContext<AnimationContextProps>(
	{} as AnimationContextProps
);

export const AnimationProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const timelineRef = useRef(gsap.timeline({ paused: true }));
	const [activeBlockId, setActiveBlockId] = useState<string>(
		() => localStorage.getItem("activeId") ?? "1"
	);
	return (
		<AnimationContext.Provider
			value={{
				timeline: timelineRef.current,
				activeBlockId,
				setActiveBlockId
			}}
		>
			{children}
		</AnimationContext.Provider>
	);
};

export const useAnimationTimeline = () => useContext(AnimationContext);
