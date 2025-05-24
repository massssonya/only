import "./styles.scss";
import { Circle } from "./circle";
import { AnimationProvider } from "./model/animation-context";

const BLOCKS = [
	{ id: "1", title: "Музыка" },
	{ id: "2", title: "Кино" },
	{ id: "3", title: "Наука" },
	{ id: "4", title: "Спорт" },
	{ id: "5", title: "Культура" },
	{ id: "6", title: "Технологии" }
];

export const LayoutTimelineSection = ({ title }: { title: string }) => {

	return (
		<AnimationProvider>
			<div className="container">
				<div className="horizontal-line"></div>
				<div className="vertical-line"></div>
				<h1 className="title">{title}</h1>
				<div className="timeline">
					<Circle blocks={BLOCKS} />
					{/* другие элементы */}
				</div>
			</div>
		</AnimationProvider>
	);
};
