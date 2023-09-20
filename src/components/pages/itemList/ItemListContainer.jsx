import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseCofig";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  // bring collection from firebase and store docs in products
  useEffect(() => {
    let refCollection = collection(db, "productos");
    getDocs(refCollection)
      .then((res) => {
        let productsArr = res.docs.map((el) => {
          return { ...el.data(), id: el.id };
        });

        setProducts(productsArr);
      })
      .catch((err) => console.log("firebase error dat", err));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {products.map((product) => {
        return (
          <Link key={product.id} to={`/itemDetail/${product.id}`}>
            <div
              style={{
                border: "solid thin",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <img
                style={{ width: "100%", maxWidth: "300px" }}
                src={product.img}
              />
              <h2>{product.title}</h2>
              <h4>{product.unit_price}</h4>
              <h4>{product.category}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ItemListContainer;
