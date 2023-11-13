// pagina que muestra ordenes del usuario

import { collection, getDocs, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { db } from "../../../firebaseCofig"
import { AuthContext } from "../../context/AuthContext"


const UserOrders = () => {

    const [userOrders, setUserOrders] = useState({})
    const {loggedUser} = useContext(AuthContext)

    useEffect(()=>{

        let refCollection = collection(db, "orders")
        let filteredOrders = query(refCollection, where("email", "==", loggedUser.email))
        getDocs(filteredOrders)
            .then((res)=>{

                res.docs.map((order)=>{
                    setUserOrders({...order.data(), id:order.id})
                })

            })
            .catch(err=> console.log(err))

    }, [loggedUser.email])


  return (
    <div>
        <h3>user orders</h3>
    </div>
  )
}

export default UserOrders