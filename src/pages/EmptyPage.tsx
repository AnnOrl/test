import { Link } from "react-router-dom";

export const EmptyPage = () => {
  return (
    <div>
      <h2>Страница не найдена</h2>
      <p>
        <Link to="/">Вернуться на главную</Link>
      </p>
    </div>
  );
};
