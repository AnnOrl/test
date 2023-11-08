import styles from "./Input.module.scss";

import cn from "classnames";

interface IInputProps {
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<IInputProps> = ({ className, ...props }) => {
  return <input className={cn(styles.input, className)} {...props} />;
};
