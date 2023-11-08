import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { EmptyPage } from "./pages/EmptyPage";
import { CartPage } from "./pages/Cart/Cart";
import { CatalogPage } from "./pages/Catalog/Catalog";

import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate replace to="/catalog" />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<EmptyPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
