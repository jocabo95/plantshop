import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Carrito</h2>
      {cart.map((el) => {
        return (
            <div
              key={el.id}
              style={{
                  border: "solid black thin",
                  width: "90%",
                  display: "flex",
                  flexDirection: "row",
                  padding: "0.5rem",
                }}
            >
                <Link to={`/itemDetail/${el.id}`}>
                    <img src={el.img} style={{ width: "50px" }} />
                </Link>
              <div>
                <h3>el.title</h3>
                <h4>Unidades: {el.quantity}</h4>
              </div>
            </div>
        );
      })}
    </div>
  );
};

export default Cart;
