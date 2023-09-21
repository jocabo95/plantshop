import { createContext, useState } from "react"

export const CartContext = createContext()

const CartContextComponent = ({children}) => {

    const [cart, setCart] = useState([])

    let addToCart =(newProduct)=>{

        let check = cart.some((el)=>{return el.id === newProduct.id})

        console.log("check prod = ", check)

        if(check){
            let newCart = cart.map((el)=>{
                if(el.id === newProduct.id){
                    let modifiedProd = {...el, quantity: newProduct.quantity}
                    return modifiedProd
                }else{
                    return el
                }
            })

            setCart(newCart)
        }else{
            setCart([...cart, newProduct]);
        }
    }

    let getQuantityById =(id)=>{

       let existingProduct = cart.find((product)=>{
           return  product.id === id
        })

        return existingProduct? existingProduct.quantity : 1

    }

    let data = {
        cart,
        addToCart,
        getQuantityById
    }

  return (
    <CartContext.Provider value={data}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextComponent