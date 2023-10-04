import { createContext, useState } from "react"


export const AuthContext = createContext()

const AuthContextComponent = ({children}) => {

    const [logedUser, setLogedUser] = useState({})
    const [logedStatus, setLogedStatus] = useState(false)

    // store user who loged in
    let storeUser =(user)=>{
        setLogedUser(user)
        setLogedStatus(true)
    }
    
    let handleLogout =()=>{
        setLogedUser({})
        setLogedStatus(false)
    }

    const data = {
        logedUser,
        logedStatus,
        storeUser,
        handleLogout
    }

  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent