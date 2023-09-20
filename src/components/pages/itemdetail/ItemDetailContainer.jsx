import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseCofig";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let refCollection = collection(db, "productos");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => {
        setProduct({ ...res.data(), id: res.id})
      })
      .catch((err) => console.log("error", err));
  }, [id]);

  console.log(product);

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
      </div>
    </div>
  );
};

export default ItemDetailContainer;
