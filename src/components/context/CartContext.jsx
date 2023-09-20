import { createContext, useState } from "react"

export const CartContext = createContext()



const CartContextComponent = ({children}) => {

    const [cart, setCart] = useState([])

    let addToCart =(newProduct)=>{
        setCart([...cart, newProduct])
    }

    let data = {
        cart,
        addToCart
    }

  return (
    <CartContext.Provider value={data}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextComponent