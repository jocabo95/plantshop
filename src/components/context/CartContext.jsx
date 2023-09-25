import { createContext, useState } from "react"

export const CartContext = createContext()

const CartContextComponent = ({children}) => {

    const [cart, setCart] = useState([])

    let addToCart =(newProduct)=>{

        let check = cart.some((el)=>{return el.id === newProduct.id})

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

    let clearCart =()=>{
        setCart([])
    }

    let deleteById =(id)=>{
        let filteredCart = cart.filter((el)=>{
            return el.id !== id
        })

        setCart(filteredCart)
    }

    let getTotalPrice =()=>{
        const totalPrice = cart.reduce((acc,el)=>{
            return(
                acc + (el.unit_price * el.quantity)
            )
        }, 0)

        return totalPrice
    }

    let data = {
        cart,
        addToCart,
        getQuantityById,
        clearCart,
        deleteById,
        getTotalPrice
    }

  return (
    <CartContext.Provider value={data}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextComponent