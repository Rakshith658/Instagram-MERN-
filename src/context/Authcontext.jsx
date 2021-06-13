import { createContext, useReducer } from "react"
import AuthRudecer from './AuthRudecer'

const INITIAL_STATE ={
    user:{ 
        _id:"60c5baeb85c2d44bf0d266dc",
        profilePicture:"",
        coverPicture:"",
        followers:[],
        following:[],
        isAdmin:false,
        username:"Rakshithkumars",
        email:"Rakshithkumars@gmail.com",
        password:"$2b$10$Owd4NYNgSTBUTPssDaex5OtXmmLO/XNbbKoqfBFYFFsYggMwdFkSu",
    },
    isFecthing:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=>{
    const [state ,dispatch]=useReducer(AuthRudecer,INITIAL_STATE)
    return(
        <AuthContext.Provider 
        value={{
            user:state.user,
            isFecthing:state.isFecthing,
            error:state.error,
            dispatch
        }}>{children}
        </AuthContext.Provider>
    )
}