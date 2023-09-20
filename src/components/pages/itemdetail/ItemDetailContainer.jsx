import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseCofig";
import { CartContext } from "../../context/CartContext";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [counter, setCounter] = useState(1)

  const {addToCart} = useContext(CartContext)

  useEffect(() => {
    let refCollection = collection(db, "productos");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => {
        setProduct({ ...res.data(), id: res.id})
      })
      .catch((err) => console.log("error", err));
  }, [id]);

  let suma = ()=>{
    if (counter < product.stock){
      setCounter(counter+1)
    } else {
      alert("limit stock")
    }
  }

  let resta =()=>{
    if (counter > 1){
      setCounter(counter - 1)
    }
  }

  let onAdd =()=>{
    let productObj = {...product, quantity: counter}
    addToCart(productObj)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "solid thin black",
      }}
    >
      <div style={{ width: "80%" }}>
        <img src={product.img} style={{ width: "100%" }} />
        <h2>{product.title}</h2>
        <h3>{product.category}</h3>
        <h4>{product.unit_price}</h4>
        <div id="counter-id" style={{display: "flex", flexDirection: "row"}}>
          <button onClick={resta}>-</button>
          <p>{counter}</p>
          <button onClick={suma}>+</button>
        </div>
        <button onClick={onAdd}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
