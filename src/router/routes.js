import Home from "../components/pages/home/Home";
import ItemListContainer from "../components/pages/itemList/ItemListContainer";
import ItemDetailContainer from "../components/pages/itemdetail/ItemDetailContainer";
import Login from "../components/pages/login/Login";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "login",
    path: "/login",
    Element: Login,
  },
  {
    id: "shop",
    path: "/shop",
    Element: ItemListContainer,
  },
  {
    id: "itemdetail",
    path: "/itemDetail/:id",
    Element: ItemDetailContainer,
  },
];
