import { type FC, type ReactNode } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  direction?: 'left' | 'right';
  className?: string;
  icon?: ReactNode;
};

const StyledButton = styled.button<{
  variant: 'primary' | 'outline';
  disabled?: boolean;
  direction?: 'left' | 'right'
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: clamp(3em, 1vw, 5em);
  height: 3em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 0px 15px 0px #3877EE1A;



  ${({ variant }) =>
    variant === 'primary' &&
    css`
      background-color: #ffffff;
      color: white;

      path {
        stroke: #3877EE;
      }

      &:hover {

      }
    `}

  ${({ variant }) =>
    variant === 'outline' &&
    css`
      background-color: transparent;
      border: 1px solid #42567A;
      color: black;

      path {
        stroke: #42567A;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: .5;
      cursor: not-allowed;
      &:hover {
        background-color: #ccc;
      }
    `}

    ${({ direction }) =>
    direction === 'left' &&
    css`
      transform: rotate(180deg);
    `}
`;

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  direction = 'right',
  className,
  icon
}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      direction={direction}
    >
      {icon}
      {children}
    </StyledButton>
  );
};
