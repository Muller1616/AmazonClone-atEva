import React,{useEffect,useState,useContext, use} from 'react'
import { DataContext } from '../DataProvider/DataProvider'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children,msg,redirect}) => {
    const [{user},dispatch] = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user?.uid){
            navigate("/auth",{state:{msg,redirect}})
        }
    }, [user,navigate,redirect,msg]);
  return (
    children
  )
}  

export default ProtectedRoute