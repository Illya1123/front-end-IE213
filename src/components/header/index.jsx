import './styles.scss';
import {Link, useNavigate, useParams } from "react-router-dom";
import {useState, useContext, useEffect } from 'react';
import { CategoryContext } from '../../context/category-context';
import Auth from "../auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () =>{
    const [categories] = useContext(CategoryContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/products/search?name=${searchQuery}`);
    };
    const handleCart = () => {
        navigate(`/cart`);
      };

    return(
        
        <header className='header'>
            <div className="container d-flex align-items-center h-100">
                <Link to="/home">
                    <img src="/logo-thinkpro.svg" alt="logo" style={{height: '40px'}}/>
                </Link>
                <form className="search" onSubmit={handleSearch}>
                    <input className="form-control" type="text" placeholder='Tên sản phẩm, nhu cầu, hàng' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <Link to={`/products/search?name=${searchQuery}`}
                    className="search-button">
                    </Link>
                </form>
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
                <div>
                    <i className='icon' id='cart-icon' onClick={handleCart}>
                        {/* <img src="shopping-cart.png" alt="shoppingcart" style={{height:'30px'}}/> */}
                        <FontAwesomeIcon icon={faShoppingCart} size="1x" />
                        {cartItemsCount > 0 && <span className='cart-quantity'>{cartItemsCount}</span>}
                    </i>
                    {/* <div className="cart">
                        <h2 className='cart-title' style ={{textAlign: 'center'}}>Giỏ hàng</h2>

                        <div className="cart-content">
                            <div className="cart-box"></div>

                        </div>
                        <div className='total'>
                        <div className='total-tittle'>Tổng:</div>
                        <div className='total-price'>0đ</div>
                        </div>
                        <button type='button' className='buy-btn'>Mua hàng</button>
                        <button type='button' className='close-btn'>
                            <img src='close.png' style={{height:'20px'}} ></img>
                        </button> */}
                   
                </div>
            </div>
        </header>
    )
}

export default Header;