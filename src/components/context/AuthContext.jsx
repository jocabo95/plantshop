import { createContext, useState } from "react"


export const AuthContext = createContext()

const AuthContextComponent = ({children}) => {

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("loggedUser")) || {})
    const [loggedStatus, setLogedStatus] = useState(JSON.parse(localStorage.getItem("loggedStatus") || false))

    // store user who loged in
    let userWhoLogged =(user)=>{
      setLoggedUser(user)
      setLogedStatus(true) 
    
      localStorage.setItem("loggedUser", JSON.stringify(user))
      localStorage.setItem("loggedStatus", JSON.stringify(true))
    }
    
    // clear logged user
    let logoutContext =()=>{
      setLoggedUser({})
      setLogedStatus(false)

      localStorage.removeItem("loggedUser")
      localStorage.removeItem("loggedStatus")
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