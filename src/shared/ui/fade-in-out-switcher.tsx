import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

type FadeInOutSwitcherProps<T> = {
    uniqueKey: T;
    children: React.ReactNode;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
};

export function FadeInOutSwitcher<T>({
    uniqueKey,
    children,
    duration = 0.4,
    className,
    style
}: FadeInOutSwitcherProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [renderedKey, setRenderedKey] = useState<T | null>(null);
    const [renderedChildren, setRenderedChildren] = useState<React.ReactNode>(null);
    const [phase, setPhase] = useState<"initial" | "idle" | "hiding" | "showing">("initial");

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el || renderedKey !== null) return;

        setRenderedKey(uniqueKey);
        setRenderedChildren(children);

        gsap.set(el, { opacity: 0 });
        gsap.to(el, {
            opacity: 1,
            duration,
            onComplete: () => setPhase("idle")
        });
    }, [renderedKey, uniqueKey, children, duration]);

    useEffect(() => {
        if (renderedKey === null || uniqueKey === renderedKey || phase !== "idle") return;

        const el = containerRef.current;
        if (!el) return;

        setPhase("hiding");

        gsap.killTweensOf(el);
        gsap.to(el, {
            opacity: 0,
            duration,
            onComplete: () => {
                setRenderedKey(uniqueKey);
                setRenderedChildren(children);
                setPhase("showing");
            }
        });
    }, [uniqueKey, renderedKey, children, phase, duration]);

    useLayoutEffect(() => {
        if (phase !== "showing") return;

        const el = containerRef.current;
        if (!el) return;

        gsap.set(el, { opacity: 0 });
        gsap.to(el, {
            opacity: 1,
            duration,
            onComplete: () => setPhase("idle")
        });
    }, [phase, duration]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ ...style, opacity: phase === "initial" ? 0 : undefined }}
        >
            {renderedChildren}
        </div>
    );
}