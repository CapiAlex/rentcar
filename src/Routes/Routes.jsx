import { Route, Routes } from "react-router-dom"
import { Menu } from "../Menu/Menu"
import { Login } from "../Login/Login"   
import { Register } from "../Register/Register" 
import { Forgotpassword } from "../Forgotpassword/Forgotpassword" 
import { ReturnCar } from "../Return/Return"
import { Rent } from "../Rent/Rent"
import { Addcar } from "../Addcar/Addcar"
import { Home } from "../Home/Home"

export function Rutas(){
    return(
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Forgot" element={<Forgotpassword />} />
                <Route path="/Return" element={<ReturnCar />} />
                <Route path="/Rent" element={<Rent />} />
                <Route path="/Addcar" element={<Addcar />} />   
                <Route path="/Home" element={<Home />} />         
            </Routes>
        </>
    )
}