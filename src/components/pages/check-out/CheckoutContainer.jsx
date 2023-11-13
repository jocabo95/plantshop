import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { useLocation } from "react-router-dom"
import {collection, addDoc, updateDoc, serverTimestamp, doc, getDoc} from "firebase/firestore"
import { db } from "../../../firebaseCofig"


const CheckoutContainer = () => {

    const { cart, getTotalPrice} = useContext(CartContext);
    const {loggedUser} = useContext(AuthContext)
    const [preferenceId, setPreferenceId] = useState(null)
    const [orderId, setOrderId] = useState (null)
    const [shippingCost, setShippingCost] = useState(null)


    const location = useLocation()
    const refQuerys = new URLSearchParams(location)
    const orderStatus = refQuerys.get("status")

    useEffect(()=>{

      let retrieveOrder = JSON.parse(localStorage.getItem("order"))

      if(orderStatus === "approved"){
        const refCollection = collection(db, "orders")
        addDoc(refCollection, {...retrieveOrder, date: serverTimestamp()})
          .then((res)=>{
            setOrderId(res.id)
          })
          .catch(err=> console.log(err))
      }

      retrieveOrder.items.forEach((product)=>{
        updateDoc(doc(db, "products", product.id), {stock: product.stock - product.quantity})
      })

      localStorage.removeItem("order")
    },[orderStatus])

    useEffect(()=>{
      let refCollection = collection(db, "costoEnvio")
      let shipmentDoc = doc(refCollection, "y9FuKcqt70JMPGWFsSRC"); 
      getDoc(shipmentDoc)
        .then((res)=>{
          setShippingCost(res.data().costo)
        })
        .catch(err=> console.log(err))
    }, [])

    
    //initiate mercadopago with app key
    initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
        locale:"es-CO"
    });

    //create preference (KEY STEP). pass cart info with post and generate id (in data object generated by axios)
    const createPreference = async()=>{

      let cartSummary = cart.map((el)=>{
        return {
          title: el.title,
          quantity: el.quantity,
          unit_price: el.unit_price
        }
      })

      try {
        let response = await axios.post(
          "http://localhost:8080/create_preference",
          {
            items: cartSummary,
            shipment_cost: shippingCost,
          }
        );

        const {id} = response.data

        return id

      } catch (error) {
        console.log(error)
      }

    }

    const handleBuy = async()=>{

      let orderInfo = {
        user: loggedUser.id,
        email: loggedUser.email,
        items: cart,
        totalPrice: shippingCost + getTotalPrice()
      }

      localStorage.setItem("order", JSON.stringify(orderInfo))

      try {
        let id = await createPreference();

        if (id) {
          setPreferenceId(id);
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>

      orderId ? <div>
        <h4> numero de rastreo: {orderId}</h4>
      </div> :
      <button onClick={handleBuy}>Finalizar compra</button>
      {
        preferenceId && <Wallet initialization={{preferenceId,redirectMode:"self" }}/>
      }
    </div>
  )
}

export default CheckoutContainer