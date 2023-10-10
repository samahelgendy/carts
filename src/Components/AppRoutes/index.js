import { Route , Routes } from "react-router-dom";
import Home from "../Home";
import Category from "../Category";
import Cart from "../Cart";
function AppRoutes (){
    return (
   <Routes>
    <Route path="/" element={<Category />}/>
    <Route path="/:categoryId" element={<Category />}/>
    <Route path="cart" element={<Cart />}/>
   </Routes>
    )
}
export default AppRoutes;