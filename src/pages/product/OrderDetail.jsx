import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import http from "../../utils/request";
const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/orders/${id}`)
        .then(response => {
          setOrder(response.data);
        })
        .catch(error => {
          console.error('Error fetching order:', error);
        });
    }
  }, [id]);

  const handlePreviewImage = (url) => {
    Swal.fire({
      width: '1200px',
      showCloseButton: true,
      showConfirmButton: false,
      html: `
        <div class="d-flex justify-content-center align-items-center">
          <img src="${url}" class="img-swal w-75 h-75">
        <div>
      `,
    });
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background-container">
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ height: '200vh' }}>
          <h1 className="text-center" style={{marginBottom: '50px'}}>CHI TIẾT ĐƠN HÀNG</h1>
          <div className="col-md-7 custom-column" style={{ height: '100%' }}>
            <h3 style={{ marginBottom: '50px' }}> Thông tin khách hàng:</h3>
            <div className="form-group">
              <label htmlFor="buyerName" style={{ width: '150px', display: 'inline-block' }}><b>Họ và tên:</b></label>
              <p>{order.name}</p>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber" style={{ width: '150px', display: 'inline-block' }}><b>Số điện thoại:</b></label>
              <p>{order.phoneNumber}</p>
            </div>
            <div className="form-group">
              <label htmlFor="address" style={{ width: '150px', display: 'inline-block' }}><b>Địa chỉ:</b></label>
              <p>{order.address}</p>
            </div>
            <h3 style={{ marginTop: '50px', marginBottom: '50px' }}> Thông tin sản phẩm:</h3>
            <div className="row no-gutters">
              <div className="col-md-4" style={{ padding: '0 10px' }}>
                <div className="" style={{ width: "100%", height: "100%" }}>
                  <img
                    class="hover-c"
                    src={order.imageSelected}
                    alt=""
                    style={{ width: "80%", height: "80%", objectFit: "contain" }}
                    onClick={() => {{ handlePreviewImage(order.imageSelected); } }}
                  />
                </div>
              </div>
              <div className="col-md-8" style={{ padding: '0 10px' }}>
                <div className="form-group">
                  <label htmlFor="productName" style={{ width: '150px', display: 'inline-block' }}><b>Tên sản phẩm:</b></label>
                  <p>{order.productName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity" style={{ width: '150px', display: 'inline-block' }}><b>Số lượng:</b></label>
                  <p>{order.quantity}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="totalPrice" style={{ width: '150px', display: 'inline-block' }}><b>Tổng tiền:</b></label>
                  <p>{order.totalPrice?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1 custom-column"></div>
          <div className="col-md-4 custom-column" style={{ height: '100%' }}>
            <div className=" flex-column ">
              <h3 style={{ marginBottom: '50px' }}> Phương thức thanh toán</h3>
              <div className="form-group">
                <label htmlFor="paymentMethod" style={{ width: '250px',display: 'inline-block' }}><b>Phương thức thanh toán:</b></label>
                <p>{order.paymentMethod}</p>
              </div>
              <div className="form-group">
                <label htmlFor="paymentResult" style={{ width: '250px', display: 'inline-block' }}><b>Kết quả thanh toán:</b></label>
                <p>{order.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;