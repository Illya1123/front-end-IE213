import "./product-detail.scss";
import "./payment.scss";
import {Navigation, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Swiper, SwiperSlide} from "swiper/react";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import http from "../../utils/request";
import Counter from "./counter";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { setCartAction } from "../../store/actions";

const ProductDetail = (props) => {
  const {productInfo} = window.location.state || {};
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1); // Initial quantity

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  
  const handleOptionChange = (optionName, optionValue) => {
    setSelectedOptions({...selectedOptions, [optionName]: optionValue});
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    const productId = typeof product._id === "string" ? product._id : String(product._id);
  
    try {
      // Kiểm tra nếu cart đã tồn tại với cùng userId và productId
      const checkCartResponse = await http.get(`http://localhost:3000/carts/${userId}/${productId}`);
  
      if (checkCartResponse.statusCode === 200 && checkCartResponse.data !== null) {
        throw new Error('Sản phẩm đã có trong giỏ hàng');
      }
  
      // Nếu không có cart tồn tại, thực hiện yêu cầu POST để thêm vào giỏ hàng
      const response = await http.post('http://localhost:3000/carts', {
        userId: userId || null,
        products: [
          {
            productId: productId,
            skuId: String(id), // Chuyển id thành chuỗi
            img: product.assets[0].src,
            name: product.model.name,
            quantity: quantity,
          }
        ]
      });
  
      if (response.statusCode === 200 || response.statusCode === 201) {
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Đã thêm vào giỏ hàng",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Handle specific error scenarios from server response
        let errorMessage = "Failed to add product to cart";
        if (response.data && response.data.message) {
          errorMessage = response.data.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle error scenario, e.g., show error message
      Swal.fire({
        icon: "error",
        title: "Thêm vào giỏ hàng thất bại",
        text: error.message || "Unknown error occurred",
      });
    }
  };
  
  
  const handleBuyNow = () => {
    navigate(`/payment/${id}`, { state: { quantity, selectedOptions } });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get(`/products/details?skuId=${id}`);
        setProduct(response.data);
        setImageSelected(response.data.assets[0].src);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePreviewImage = (url) => {
    Swal.fire({
      width: "1200px",
      showCloseButton: true,
      showConfirmButton: false,
      html: `
        <div class="d-flex justify-content-center align-items-center">
          <img src="${url}" class="img-swal w-75 h-75">
        <div>
      `,
    });
  };

  /**
   * handle buy now
   */
  const handleBuyNow = React.useCallback(() => {
    addItemToCart({quantity, model: product.model})
    navigate(`/checkout`, {state: {}});
  }, [addItemToCart, quantity, product?.model])

  /**
   * handle add to cart
   * @type {(function())|*}
   */
  const handleAddToCart = React.useCallback(() => {
    addItemToCart({quantity, model: product.model})
  }, [product, addItemToCart])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
      <>
        <div className="container mt-3">
          <div className="row">
            <div className="col-7">
              <div className="card">
                <div className="card-body">
                  <div className="" style={{width: "50vw", height: "60vh"}}>
                    <img
                        class="hover-c"
                        src={`https://media-api-beta.thinkpro.vn/${imageSelected}`}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        onClick={() =>
                            handlePreviewImage(
                                `https://media-api-beta.thinkpro.vn/${imageSelected}`
                            )
                        }
                    />
                  </div>
                  <hr/>
                  <Swiper
                      slidesPerView={6}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                        type: "ver",
                      }}
                      navigation={true}
                      modules={[Pagination, Navigation]}
                  >
                    {product.assets.map((image) => (
                        <SwiperSlide
                            key={image.src}
                            onClick={() => setImageSelected(image.src)}
                        >
                          <div
                              className={
                                image.src === imageSelected
                                    ? "img-selected  hover-c"
                                    : "hover-c"
                              }
                              style={{
                                backgroundImage: `url(${image.src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100%",
                                height: "100%",
                              }}
                          >
                            <img
                                src={`https://images.thinkgroup.vn/unsafe/212x212/https://media-api-beta.thinkpro.vn/${image.src}`}
                                alt="section-banner"
                            />
                          </div>
                        </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="card">
                <div className="card-body">
                  <p>SKU: {product.SKU}</p>
                  <p>
                    <strong>{product.model.name}</strong>
                  </p>
                  <hr/>
                  <div className="variable" style={{fontSize: "14px"}}>
                    {product.variations.map((item) => (
                        <div className="variable" key={item.name}>
                          <h3 style={{fontSize: "16px", opacity: 0.9}}>
                            {item.label}
                          </h3>
                          <div
                              className="d-flex flex-wrap gx-3 gy-3"
                              style={{margin: 0}}
                          >
                            {item.options.map((option) => (
                                <div
                                    className="alert alert-secondary bg-white text-center m-1 px-3 py-1"
                                    key={option.name}
                                    onClick={() =>
                                        handleOptionChange(item.name, option.name)
                                    }
                                >
                                  {option.name}
                                </div>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                  <div className="counter mt-3">
                    <h3 style={{fontSize: "16px", opacity: 0.9}}>Số lượng</h3>
                    <div className="d-flex">
                      <Counter onQuantityChange={val => setQuantity(val)}/>
                    </div>
                  </div>
                  <hr/>
                  <div className="d-flex">
                    <p
                        style={{
                          fontSize: "1.6em",
                          color: "red",
                          fontWeight: "bold",
                        }}
                    >
                      {product.model.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <div className="spacer"></div>
                    <button type='button' className="btn btn-add-cart" onClick={handleAddToCart}>Thêm vào giỏ</button>
                    <button type='button'
                            className="btn btn-danger"
                            style={{marginLeft: "8px", fontWeight: "bold"}}
                            onClick={handleBuyNow}
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
                <hr />
                <div className="d-flex">
                  <p
                    style={{
                      fontSize: "1.6em",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {product.model.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <div className="spacer"></div>
                  <button className="btn btn-add-cart" onClick={() => handleAddToCart()}>Thêm vào giỏ</button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "8px", fontWeight: "bold" }}
                    onClick={() => handleBuyNow(product.id, quantity)}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="card mt-5">
              <div className="card-body">
                <h2 style={{fontSize: "1.6em"}}>Cấu hình đặc điểm</h2>
                <div className="row" style={{fontSize: "0.9em"}}>
                  {product.attributes.map((attribute) => (
                      <div className="col-6 mt-3" key={attribute.groupName}>
                        <p>
                          <strong>{attribute.groupName}</strong>
                        </p>
                        {attribute.items.map((item) => (
                            <p key={item.label}>
                              <span>{item.label}</span> : <span> {item.value}</span>
                            </p>
                        ))}
                      </div>
                  ))}
                </div>
                <hr/>
                <h2 style={{fontSize: "1.6em"}}>Bảo hành đổi trả</h2>
                <ul>
                  <li>
                    Bảo hành <strong>12 tháng tại chuỗi cửa hàng</strong>
                  </li>
                  <li>Đổi mới trong 15 ngày đầu tiên</li>
                </ul>
                <hr/>
                <h2 style={{fontSize: "1.6em"}}>Bài viết mô tả</h2>
                {product.article ? (
                    <section className="section-article">
                      <h1>{product.article.title}</h1>
                      <p>{product.article.description}</p>
                      <div
                          dangerouslySetInnerHTML={{
                            __html: product.article.content,
                          }}
                      />
                    </section>
                ) : (
                    "-- chưa có mô tả --"
                )}
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default ProductDetail;
