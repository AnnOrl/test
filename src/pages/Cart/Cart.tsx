import { useCallback } from "react";
import { InlineCard } from "../../components/Card/InlineCard/InlineCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectItems,
  calculateTotal,
  defaultMinCount,
  defaultMaxCount,
  changeCount,
  clearCart,
  removeItem,
} from "../../redux/reducer";
import styles from "./Cart.module.scss";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const total = useAppSelector(calculateTotal);

  const handleChangeCount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      dispatch(changeCount({ id, value: +e.target.value }));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleContinue = useCallback(() => {
    navigate("/catalog");
  }, [navigate]);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(removeItem(id));
    },
    [dispatch]
  );

  if (!total) {
    return <p>Корзина пуста</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.header}>
          <p>Товар</p>
          <p>К-во</p>
        </div>
        {items.map(({ id, count, price, ...card }) => (
          <div className={styles.row} key={id}>
            {/* price depends from count? */}
            <InlineCard
              card={{ id, price: price * count, ...card }}
              onDelete={handleDelete}
            />
            {/* need to customize spin buttons? */}
            <input
              className={styles.input}
              type="number"
              value={count}
              min={defaultMinCount}
              max={defaultMaxCount}
              onChange={(e) => handleChangeCount(e, id)}
            />
          </div>
        ))}
        <div className={styles.footer}>
          <Button text="Очистить корзину" onClick={handleClear} />
          <Button
            text="Продолжить покупки"
            secondary
            onClick={handleContinue}
          />
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.title}>Оформление заказа</div>
        <Input placeholder="Имя Фамилия" className={styles.name} />
        {/* mask? */}
        <Input placeholder="+ 7 904 000 80 80" className={styles.phone} />
        <Input placeholder="Адрес доставки" className={styles.address} />
        <div className={styles.total}>
          Итого:{" "}
          <span className={styles.price}>{total.toLocaleString()} руб.</span>
        </div>
        <Button text="Оформить заказ" className={styles.button} />
      </div>
    </div>
  );
};
