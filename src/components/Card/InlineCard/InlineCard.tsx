import styles from "./InlineCard.module.scss";
import { TCard } from "../Card";
import { useCallback } from "react";

interface ICardProps {
  card: TCard;
  onDelete: (id: number) => void;
}

export const InlineCard: React.FC<ICardProps> = ({ card, onDelete }) => {
  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      onDelete(card.id);
    },
    [card.id, onDelete]
  );

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url("images/${card.image}")`,
        }}
      ></div>
      <div>
        <div className={styles.name}>{card.name}</div>
        <div className={styles.description}>{card.description}</div>
        <div className={styles.price}>
          {(+card.price).toLocaleString()} руб.
        </div>
        <div className={styles.actions}>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Избранные
          </a>
          <a href="/#" onClick={handleDelete}>
            Удалить
          </a>
        </div>
      </div>
    </div>
  );
};
