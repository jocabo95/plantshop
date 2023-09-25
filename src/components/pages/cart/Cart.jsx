import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, deleteById, clearCart, getTotalPrice } = useContext(CartContext);

  return (
    <div>
      <h2>Carrito</h2>
      <div style={{border: "solid thin black"}}>
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
                <button onClick={() => deleteById(el.id)}>
                  eliminar del carrito
                </button>
              </div>
            </div>
          );
        })}
        <h4>Total: {getTotalPrice()}</h4>
        <button onClick={clearCart}>Limpiar carrito</button>
      </div>
    </div>
  );
};

export default Cart;
