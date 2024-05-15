import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./order.scss";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null); 
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      if (order && order.productId) { 
        const response = await axios.get(`http://localhost:3000/products/${order.productId}`);
        setProduct(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };
  useEffect(() => {
    if (order) {
      fetchProduct();
    }
  }, [order]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (orderId) { 
          const response = await axios.get(`http://localhost:3000/orders/${orderId}`);
          setOrder(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching order", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <h1>CHI TIẾT ĐƠN HÀNG</h1>
      <div className="order-info-container">
        <p><b>Mã ID đơn hàng:</b> {order._id}</p>
        <p><b>Khách hàng:</b> {order.buyerName}</p>
        <p><b>Số điện thoại:</b> {order.phoneNumber}</p>
        <p><b>Địa chỉ:</b> {order.address}</p>
        <p><b>ID của sản phẩm:</b> {order.productId}</p> {/* Sử dụng order.productId */}
        {/* <p><b>Tên sản phẩm:</b> {order.productName}</p> */}
        <p><b>Số lượng:</b> {order.quantity}</p>
        <p><b>Tổng tiền:</b> {order.totalPrice}</p>
        <p><b>Phương thức thanh toán:</b> {order.paymentMethod}</p>
      </div>
      <div className="button-container">
        <button className="btn-1 btn-primary" onClick={() => navigate("/")}>
          Trang chủ
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;

