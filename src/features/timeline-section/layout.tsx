import { ReactNode } from "react";
import "./styles.scss";
import { Circle } from "./circle";

export const LayoutTimelineSection = ({
	title,
}: {
	title: string;
}) => {
	return (
		<div className="container">
			<div className="horizontal-line"></div>
			<div className="vertical-line"></div>
			<h1 className="title">{title}</h1>
			<Circle />
		</div>
	);
};
