import { Link } from "react-router-dom";
import { ReactComponent as Card } from "./../../icons/cart.svg";
import { ReactComponent as Catalog } from "./../../icons/catalog.svg";

import styles from "./Header.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectCount } from "../../redux/reducer";

enum ELinks {
  CATALOG = "catalog",
  CART = "cart",
}

interface ILink {
  id: ELinks;
  path: string;
  title: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const links: ILink[] = [
  { id: ELinks.CATALOG, path: "/catalog", title: "Каталог", Icon: Catalog },
  { id: ELinks.CART, path: "/cart", title: "Корзина", Icon: Card },
];

export const Header = () => {
  const cartCount = useAppSelector(selectCount);

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>Интерьер.</div>
      <ul className={styles.menu}>
        {links.map(({ id, path, title, Icon }) => (
          <li key={path} className={styles.item}>
            <Link to={path} className={styles.link}>
              {id === ELinks.CART && cartCount ? (
                <span className={styles.count}>{cartCount}</span>
              ) : (
                ""
              )}
              <Icon className={styles.icon} />
              <span className={styles.title}>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
