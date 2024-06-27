import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CategoryContext } from "../../context/category-context";
import Auth from "../auth";
import { useDispatch, useSelector } from "react-redux";
import { setCartAction } from "../../store/actions/index";

const Header = () => {
  const [categories] = useContext(CategoryContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const cartData = useSelector((state) => state.cartReducer.cart);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  useEffect(() => {
    // Load userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId !== userId) {
      setUserId(storedUserId);
    }

    if (userId) {
      fetch(`http://localhost:3000/carts/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          dispatch(setCartAction(data.data)); // Lưu dữ liệu giỏ hàng vào Redux store
          console.log("Data received:", data.data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          // Xử lý lỗi ở đây nếu cần
        });
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (cartData) {
      console.log("Cart data:", cartData.cart);
      // Xử lý khi có dữ liệu giỏ hàng
    } else {
      console.log("Cart data is undefined or null");
      // Xử lý khi không có dữ liệu giỏ hàng
    }
  }, [cartData]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/search?name=${searchQuery}`);
  };

  const toggleCartDropdown = () => {
    setShowCartDropdown((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className="container d-flex align-items-center h-100">
        <Link to="/home">
          <img src="/logo-thinkpro.svg" alt="logo" style={{ height: "40px" }} />
        </Link>
        <form
          className="search"
          onSubmit={handleSearch}
          style={{ marginTop: "20px" }}
        >
          <input
            className="form-control"
            type="text"
            placeholder="Tìm kiếm...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link
            to={`/products/search?name=${searchQuery}`}
            className="search-button"
          ></Link>
        </form>
        <nav className="nav">
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
            <div
              className="dropdown-menu dropdown-menu-custom box-shadow-custom"
              style={{ width: "900px" }}
            >
              <div className="row p-2 g-3">
                {categories.map((cate) => (
                  <div key={cate.slug} className="col-3">
                    <Link
                      to={`/products?cate_slug=${cate.slug}`}
                      className="dropdown-item"
                    >
                      <img
                        className="img-size-50"
                        src={`https://images.thinkgroup.vn/unsafe/212x212/https://media-api-beta.thinkpro.vn/${cate.icon}`}
                        alt={cate.icon}
                      />
                      <span>{cate.name}</span>
                    </Link>
                  </div>
                ))}
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
        <div className="nav-item" onClick={toggleCartDropdown}>
          <i className="bi bi-cart-fill"></i>
          <div className={`cart-dropdown ${showCartDropdown ? "show" : ""}`}>
  {cartData.length > 0 ? (
    <ul>
      {cartData.map((cartItem) =>
        cartItem.products.map((product) => (
          <Link to={`/products/${product.skuId}`}>
            <li key={product.productId}>
              <div className="product-container" style={{ borderRadius: '5px' }}>
                <img
                  src={`https://images.thinkgroup.vn/unsafe/100x100/https://media-api-beta.thinkpro.vn/${product.img}`}
                  alt={`Hình ảnh về ${product.name}`}
                  className="product-image"
                />
                <div className="product-info">
                  <span className="name">
                    Tên sản phẩm: {product.name}
                  </span>
                </div>
              </div>
            </li>
          </Link>
        ))
      )}
    </ul>
  ) : (
    <p>Giỏ hàng của bạn hiện đang trống.</p>
  )}
</div>

        </div>
      </div>
    </header>
  );
};

export default Header;
