import styles from "./Button.module.scss";

import cn from "classnames";

export interface IButtonProps {
  text: string;
  secondary?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = ({
  text,
  secondary,
  className,
  onClick,
}) => {
  return (
    <button
      className={cn(
        styles.button,
        { [styles.primary]: !secondary, [styles.secondary]: secondary },
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
