import styles from "./Select.module.scss";

export type TOption = {
  value: string;
  label: string;
};

export interface ISelectProps<TValue> {
  value?: TValue;
  onChange: (value: TValue) => void;
  options: TOption[];
}

export const Select: React.FC<ISelectProps<any>> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles.select}>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          //default or custom option style?
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
