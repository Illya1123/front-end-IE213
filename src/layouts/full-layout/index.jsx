import "./styles.scss"
import {Header, Footer} from "../../components";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CategoryContext } from "../../context/category-context";
import {getCategories} from '../../mockup/mockup';
const FullLayout = () =>{
    const [categories, dispatch] = useContext(CategoryContext);
    useEffect(() =>{
        dispatch.setCategories(getCategories().data);
    }, []);
    return (
    <>
        <Header />
        <div className="content pb-5">
            <Outlet />
        </div>
        <Footer />
    </>
    )
}

export default FullLayout;