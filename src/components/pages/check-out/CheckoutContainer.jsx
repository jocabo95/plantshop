import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { initMercadoPago } from "@mercadopago/sdk-react"


const CheckoutContainer = () => {

    const {cart} = useContext(CartContext)
    
    initMercadoPago("APP_USR-6cac4dd2-83c7-46e3-99e9-a3339d9be5de", {
        locale:"es-CO"
    });

  return (
    <div>CheckoutContainer</div>
  )
}

export default CheckoutContainer