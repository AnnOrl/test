import { useCallback, useState } from "react";
import { Select } from "../../components/Select/Select";

import styles from "./Catalog.module.scss";
import { Card, TCard } from "../../components/Card/Card";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItem, increaseCount, selectItems } from "../../redux/reducer";

enum EOrder {
  DEFAULT = "default",
  ASC = "asc",
  DESC = "desc",
}

const options = [
  { value: EOrder.DEFAULT, label: "Порядок: по умолчанию" },
  { value: EOrder.ASC, label: "Порядок: сперва дешевле" },
  { value: EOrder.DESC, label: "Порядок: сперва дороже" },
];

// TODO load in redux
const cards = [
  {
    id: 1,
    image: "1.svg",
    name: "Кровать TATRAN",
    description:
      "Основание из полированной нержавеющей стали, придает оригинальный парящий эффект.",
    price: 120000,
  },
  {
    id: 2,
    image: "2.svg",
    name: "Кресло VILORA",
    description:
      "Мягкое и уютное, аккуратное и стильное. Упругие подушки сиденья и приятная на ощупь ткань. ",
    price: 21000,
  },
  {
    id: 3,
    image: "3.svg",
    name: "Стол MENU",
    description:
      "Европейский дуб - отличается особой прочностью и стабильностью.",
    price: 34000,
  },
  {
    id: 4,
    image: "4.svg",
    name: "Диван ASKESTA",
    description:
      "Благодаря защелкивающемуся механизму диван легко раскладывается в комфортную кровать",
    price: 68000,
  },
  {
    id: 5,
    image: "5.svg",
    name: "Кресло LUNAR",
    description:
      "Прекрасно переносит солнечные лучи, перепады влажности и любые осадки",
    price: 40000,
  },
  {
    id: 6,
    image: "6.svg",
    name: "Шкаф Nastan",
    description:
      "Мебель может быть оснащена разнообразными системами подсветки.",
    price: 80000,
  },
];

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  const [order, setOrder] = useState(EOrder.DEFAULT);

  const [sortedCards, setSortedCards] = useState(cards);

  const onChange = useCallback(
    (value: EOrder) => {
      setOrder(value);

      switch (value) {
        case EOrder.ASC:
          return setSortedCards(sortedCards.sort((a, b) => a.price - b.price));
        case EOrder.DESC:
          return setSortedCards(sortedCards.sort((a, b) => b.price - a.price));
        default:
          return setSortedCards(sortedCards.sort((a, b) => a.id - b.id));
      }
    },
    [sortedCards]
  );

  const handleAddToCart = useCallback(
    (item: TCard) => {
      !items.some(({ id }) => id === item.id)
        ? dispatch(addItem(item))
        : dispatch(increaseCount(item.id));
    },
    [dispatch, items]
  );
  return (
    <div className={styles.catalog}>
      <div className={styles.order}>
        <Select options={options} onChange={onChange} value={order} />
      </div>
      <div className={styles.cards}>
        {sortedCards.map((card) => (
          <Card key={card.id} card={card} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};
