import { type FC, type ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
	children?: ReactNode;
	onClick?: () => void;
	variant?: "primary" | "outline";
	disabled?: boolean;
	direction?: "left" | "right";
	className?: string;
	icon?: ReactNode;
	width?: string | number;
	height?: string | number;
};

const StyledButton = styled.button<{
	variant: "primary" | "outline";
	disabled?: boolean;
	direction?: "left" | "right";
	width?: string | number;
	height?: string | number;
}>`
	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	border-radius: 50%;
	cursor: pointer;
	transition: background-color 0.3s ease;
	box-shadow: 0px 0px 15px 0px #3877ee1a;

	width: ${({ width }) => width};
	height: ${({ height }) => height};
	${({ variant }) =>
		variant === "primary" &&
		css`
			background-color: #ffffff;
			color: white;

			path {
				stroke: #3877ee;
			}

			&:hover {
			}
		`}

	${({ variant }) =>
		variant === "outline" &&
		css`
			background-color: transparent;
			border: 1px solid #42567a;
			color: black;

			path {
				stroke: #42567a;
			}
		`}

  ${({ disabled }) =>
		disabled &&
		css`
			opacity: 0.5;
			cursor: not-allowed;
			&:hover {
				background-color: #ccc;
			}
		`}

    ${({ direction }) =>
		direction === "left" &&
		css`
			transform: rotate(180deg);
		`}
`;

export const Button: FC<ButtonProps> = ({
	children,
	onClick,
	variant = "primary",
	disabled = false,
	direction = "right",
	className,
	icon,
	width = "40px",
	height = "40px"
}) => {
	return (
		<StyledButton
			className={className}
			onClick={onClick}
			variant={variant}
			disabled={disabled}
			direction={direction}
			width={width}
			height={height}
		>
			{icon}
			{children}
		</StyledButton>
	);
};
