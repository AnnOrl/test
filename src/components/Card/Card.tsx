import { useCallback } from "react";
import { ReactComponent as HeartOutline } from "./../../icons/heart_outline.svg";
import { ReactComponent as ShoppingBag } from "./../../icons/shoppingbag.svg";
import styles from "./Card.module.scss";

export type TCard = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
};

interface ICardProps {
  card: TCard;
  onAddToCart: (item: TCard) => void;
}
export const Card: React.FC<ICardProps> = ({ card, onAddToCart }) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart(card);
  }, [onAddToCart, card]);

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url("images/${card.image}")`,
        }}
      >
        <div className={styles.actions}>
          <ShoppingBag onClick={handleAddToCart} />
          <HeartOutline />
        </div>
      </div>
      <div>
        <div className={styles.name}>{card.name}</div>
        <div className={styles.description}>{card.description}</div>
        <div className={styles.price}>
          {(+card.price).toLocaleString()} руб.
        </div>
      </div>
    </div>
  );
};
