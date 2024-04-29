import './styles.scss';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { CategoryContext } from '../../context/category-context';
import Auth from "../auth";

const Header = () =>{
    const [categories] = useContext(CategoryContext);
    return(
        <header className='header'>
            <div className="container d-flex align-items-center h-100">
                <Link to="/home">
                    <img src="/logo-thinkpro.svg" alt="logo" style={{height: '40px'}}/>
                </Link>
                <div className="search">
                    <input className="form-control" type="text" placeholder='Tên sản phẩm, nhu cầu, hàng' />
                </div>
                <nav className='nav'>
                    <Link to={"/home"}>
                        <div className="nav-item">
                            <i className="bi bi-house-door-fill"></i>
                            <span>Trang chủ</span>
                        </div>
                    </Link>
                    <div className="dropdown">
                        <div className="nav-item" data-bs-toggle="dropdown">
                            <i className="bi bi-list"></i>
                            <span>Danh mục</span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-custom box-shadow-custom" style={{width: '900px'}}>
                            <div className="row p-2 g-3">
                            {
                                categories.map((cate) => (
                                    <div key={cate.slug} className="col-3">
                                        <Link to={`/products?cate_slug=${cate.slug}`} className="dropdown-item">
                                            <img className="img-size-50"src={`https://images.thinkgroup.vn/unsafe/212x212/https://media-api-beta.thinkpro.vn/${cate.icon}`} alt={cate.icon} />
                                            <span>{cate.name}</span>
                                        </Link>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                    <Link to={"/about"}>
                        <div className="nav-item">
                            <i className="bi bi-info-circle-fill"></i>
                            <span>Về chúng tôi</span>
                        </div>
                    </Link>
                </nav>
                <div className="spacer"></div>
                <Auth />
            </div>
        </header>
    )
}

export default Header;