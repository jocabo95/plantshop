import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./components/context/CartContext";
import AuthContextComponent from "./components/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <CartContextComponent>
          <AppRouter />
        </CartContextComponent>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
