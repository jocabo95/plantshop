import { createContext, useState } from "react"


export const AuthContext = createContext()

const AuthContextComponent = ({children}) => {

    const [loggedUser, setLoggedUser] = useState({})
    const [loggedStatus, setLogedStatus] = useState(false)

    // store user who loged in
    let userWhoLogged =(user)=>{
        setLoggedUser(user)
        setLogedStatus(true)        
    }
    
    // clear logged user
    let logoutContext =()=>{
        setLoggedUser({})
        setLogedStatus(false)
    }

    const data = {
      loggedUser,
      loggedStatus,
      userWhoLogged,
      logoutContext,
    };

  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent