import { useContext } from "react"
import { CartContext } from "../../context/CartContext"



const Cart = () => {

    const {cart} = useContext(CartContext)

  return (
    <div>
        {
            cart.map((el)=>{
                <div key={el.id}>
                    <img src={el.img} style={{width: "50px"}}/>
                    <div>
                        <h4>el.title</h4>
                    
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default Cart