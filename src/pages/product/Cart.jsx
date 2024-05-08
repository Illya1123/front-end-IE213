import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Counter from './counter';
import { useParams, useNavigate } from "react-router-dom";
import './Cart.scss';
import http from "../../utils/request";

const Cart = () => {
    const [productName, setProductName] = useState('');
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [imageSelected, setImageSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useParams();
    const [cartProducts, setCartProducts] = useState([]);
    const [removeProduct, setRemoveProduct] = useState(null);
    const navigate = useNavigate();

    const handleOKNow = (event) => {
        event.preventDefault();
        const order = {
            products: cartProducts.map((product) => ({
                id: product.id,
                quantity: quantity,
            })),
            totalPrice: totalPrice,
        };

        console.log('Order:', order);
        navigate(`/orders`)
        //Swal.fire('Đơn hàng được tạo', 'Đơn hàng của bạn đã được tạo thành công!', 'success');
        setCartProducts([]);
    };
    useEffect(() => {
        const calculateTotalPrice = () => {
            let totalPrice = 0;
            cartProducts.forEach((product) => {
                totalPrice += product.model.price * product.quantity;
            });
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice();
    }, [cartProducts]);
    
    const handleQuantityChange = (productId, newQuantity) => {
        setCartProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === productId) {
                    const updatedProduct = { ...product, quantity: newQuantity };
                    return updatedProduct;
                }
                return product;
            })
        );
    };

    const fetchProduct = async () => {
        try {
            const response = await http.get(`/products/details?skuId=${id}`);
            if (response.data) {
                const fetchedProduct = {
                    ...response.data,
                    quantity: quantity,
                };
                setCartProducts([...cartProducts, fetchedProduct]);
                setTotalPrice(fetchedProduct.model.price);
            } else {
                setError('Error: Sản phẩm không được tìm thấy');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleRemoveProduct = (productId) => {
        setRemoveProduct(productId);
        Swal.fire({
            title: 'Xác nhận xoá sản phẩm',
            text: "Bạn có chắc chắn muốn xoá sản phẩm này không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
            confirmButtonText: 'Có'
        }).then((result) => {
            if (result.isConfirmed) {
                setCartProducts(cartProducts.filter(product => product.id !== productId));
                Swal.fire('Đã xoá!', 'Sản phẩm của bạn đã được xoá', 'success');
            }
        });
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);
    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cartProducts]);

    useEffect(() => {
        const savedCartProducts = localStorage.getItem('cartProducts');
        if (savedCartProducts) {
            setCartProducts(JSON.parse(savedCartProducts));
        }
    }, []);

    const handlePreviewImage = (url) => {
        Swal.fire({
            width: '100px',
            showCloseButton: true,
            showConfirmButton: false,
            html: `
        <div class="d-flex justify-content-center align-items-center">
          <img src="${url}" class="img-swal w-75 h-75">
        </div>
      `,
        });
    };

    useEffect(() => {
        const savedCartProducts = localStorage.getItem('cartProducts');
        if (savedCartProducts) {
            setCartProducts(JSON.parse(savedCartProducts));
        } else {
            fetchProduct();
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="cart-container">
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                    <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
                    <h1 className="text-center">GIỎ HÀNG</h1>
                    <div className="col-md-7" style={{ height: '100%' }}>
                        <h3 style={{ marginTop: '50px', marginBottom: '50px' }}> Sản phẩm: </h3>
                        {cartProducts.map(product => (
                            <div key={product.id}>
                                <div className="row no-gutters">

                                    <div className="col-md-2" style={{ padding: '0 10px', marginBottom: '60px' }}>
                                        <div className="image-container">
                                            <img
                                                className="hover-c"
                                                src={`https://media-api-beta.thinkpro.vn/${product.assets[0].src}`}
                                                alt=""
                                                style={{ width: '200%', height: '200%', objectFit: 'contain' }}
                                                onClick={() =>
                                                    handlePreviewImage(`https://media-api-beta.thinkpro.vn/${product.assets[0].src}`)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3"></div>
                                    <div className="col-md-7" style={{ padding: '0 10px' }}>
                                        <div className="form-group">
                                            <label htmlFor={`productName${product.id}`} style={{ width: '150px', display: 'inline-block' }}>
                                                <b>Tên sản phẩm:</b>
                                            </label>
                                            {product.model.name}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`quantity${product.id}`} style={{ width: '150px', display: 'inline-block' }}>
                                                <b>Số lượng:</b>
                                            </label>
                                            <Counter
                                                productId={product.id}
                                                initialValue={product.quantity}
                                                onQuantityChange={handleQuantityChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`totalPrice${product.id}`} style={{ width: '150px', display: 'inline-block' }}>
                                                <b>Tổng tiền:</b>
                                            </label>
                                            <div className="d-flex">
                                                {product.model.price !== null && (
                                                    <p style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                                                        {(product.model.price * product.quantity).toLocaleString('it-IT', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ textAlign: 'end' }}>
                                            <button
                                                className="btn text-danger"
                                                onClick={() => handleRemoveProduct(product.id)}
                                                disabled={removeProduct === product.id}
                                            >
                                                <i className="fa fa-trash"></i><p  style={{fontSize: '20px'}}><i>Xoá sản phẩm</i></p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="form-group">
                            <button className="btn  btn-lg" onClick={handleOKNow} style={{ backgroundColor: '#00cec9', fontWeight: 'bold' }}>
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;