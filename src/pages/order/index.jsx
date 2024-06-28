import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [userId, setUserId] = useState(null);
  const [dataPayment, setDataPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataDetails, setDataDetails] = useState([]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    const filterDetail = dataProduct
      .filter((product) =>
        order.products.some((orderProduct) => orderProduct.productId === product._id)
      )
      .map((product) => {
        const orderProduct = order.products.find(
          (orderProduct) => orderProduct.productId === product._id
        );
        return {
          ...product,
          quantityPayment: orderProduct ? orderProduct.quantity : 0,
        };
      });
    setDataDetails(filterDetail);
    setIsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Simulating userId state
    const userId = localStorage.getItem("userId");
    setUserId(userId);

    if (userId) {
      axios
        .get(`http://localhost:3000/orders/user/${userId}`)
        .then((res) => {
          setDataPayment(res.data);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .get(`http://localhost:3000/products`)
      .then((res) => {
        setDataProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function formatPrice(price) {
    return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + 'đ';
  }

  return (
    <>
      {userId ? (
        <div style={{}} className="container mt-3">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={styles.header}>Mã Đơn Hàng</th>
                <th style={styles.header}>Tên Người Nhận</th>
                <th style={styles.header}>Tổng Tiền</th>
                <th style={styles.header}>Trạng Thái </th>
                <th style={styles.header}></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                dataPayment.data.map((order) => (
                  <tr key={order._id} style={styles.row}>
                    <td style={styles.cell}>{order._id}</td>
                    <td style={styles.cell}>{order.name}</td>
                    <td style={styles.cell}>{order.totalPrice}đ</td>
                    <td style={styles.cell}>{order.status}</td>
                    <td style={styles.cell}>
                      <button
                        style={styles.button}
                        onClick={() => handleViewDetails(order)}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div style={styles.loading}>Loading...</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {isOpen && (
            <div style={styles.modalOverlay}>
              <div style={styles.modalContent}>
                <div style={styles.modalHeader}>Chi Tiết Đơn Hàng</div>
                <div>
                  <p style={styles.detailText}>
                    <strong>Mã Đơn Hàng:</strong> {selectedOrder._id}
                  </p>
                  <p style={styles.detailText}>
                    <strong>Tên Người Nhận:</strong> {selectedOrder.name}
                  </p>
                  <p style={styles.detailText}>
                    <strong>Tổng Tiền:</strong> {selectedOrder.totalPrice}đ
                  </p>
                  <p style={styles.detailText}>
                    <strong>Trạng Thái:</strong> {selectedOrder.status}
                  </p>
                  <p style={styles.detailText}>
                    <strong>Địa chỉ giao hàng:</strong> {selectedOrder.address}
                  </p>
                </div>
                <table style={styles.detailTable}>
                  <thead>
                    <tr>
                      <th style={styles.header}>Hình ảnh</th>
                      <th style={styles.header}>Tên sản phẩm</th>
                      <th style={styles.header}>Số lượng</th>
                      <th style={styles.header}>Giá bán</th>
                      <th style={styles.header}>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody style={styles.detailTableBody}>
                    {dataDetails.map((product, index) => (
                      <tr key={index} style={styles.row}>
                        <td style={styles.cell}>
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            style={styles.productImage}
                          />
                        </td>
                        <td style={styles.cell}>{product.name}</td>
                        <td style={styles.cell}>{product.quantityPayment}</td>
                        <td style={styles.cell}>{formatPrice(product.priceSell)}</td>
                        <td style={styles.cell}>{formatPrice(product.quantityPayment * product.priceSell)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button style={styles.closeButton} onClick={handleCloseDetails}>
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={styles.loginContainer}>
          <p style={styles.loginText}>
            Vui lòng đăng nhập để hiện thông tin chi tiết
          </p>
          <button style={styles.loginButton} onClick={() => alert('Login functionality')}>
            Đăng nhập
          </button>
        </div>
      )}
    </>
  );
};

const styles = {
  header: {
    padding: "8px 16px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "bold",
    borderBottom: "1px solid #ccc",
  },
  row: {
    borderBottom: "1px solid #ccc",
  },
  cell: {
    padding: "8px 16px",
    fontSize: "14px",
  },
  button: {
    color: "#007bff",
    backgroundColor: "transparent",
    fontSize: "12px",
    cursor: "pointer",
    textDecoration: "underline",
    border: "none",
    padding: "0",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    position: "fixed",
    inset: "0",
    zIndex: "50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "75%",
    maxWidth: "800px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  modalHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  detailText: {
    marginBottom: "8px",
  },
  detailTable: {
    width: "100%",
    marginTop: "16px",
    borderCollapse: "collapse",
  },
  detailTableBody: {
    borderTop: "1px solid #ccc",
  },
  productImage: {
    width: "64px",
    height: "64px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  loginContainer: {
    textAlign: "center",
  },
  loginText: {
    marginBottom: "16px",
    fontSize: "16px",
    color: "#666",
  },
  loginButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  },
  closeButton: {
    marginTop: "16px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
  },
};

export default Orders;
