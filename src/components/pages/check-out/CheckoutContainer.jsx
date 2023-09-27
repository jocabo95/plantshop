import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import axios from "axios"


const CheckoutContainer = () => {

    const {cart} = useContext(CartContext)
    const [preferenceId, setPreferenceId] = useState(null)
    
    //initiate mercadopago with app key
    initMercadoPago("APP_USR-6cac4dd2-83c7-46e3-99e9-a3339d9be5de", {
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
          "http://localhost:8080//create_preference",
          {
            items: cartSummary,
            shipment_cost: 20000,
          }
        );

        const {id} = response.data

        return id

      } catch (error) {
        console.log(error)
      }

    }

    const handleBuy = async()=>{
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
      <button onClick={handleBuy}>Finalizar compra</button>
      {
        preferenceId && <Wallet initialization={{preferenceId,redirectMode:"self" }}/>
      }
    </div>
  )
}

export default CheckoutContainer