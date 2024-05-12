import React, { useState, useEffect } from "react";
import "./payment.scss";
import Modal from "react-modal";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../utils/request";
import Swal from "sweetalert2";
import Counter from "./counter";

const PaymentPage = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentResult, setPaymentResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankAccount, setBankAccount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [fullName, setFullName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");
  const [transferContent, setTransferContent] = useState("");
  const [ewallet, setEwallet] = useState("");
  const [ewalletPhoneNumber, setEwalletPhoneNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productInfo } = window.location.state || {};
  const { selectedOptions } = productInfo || {};
  const [quantity, setQuantity] = useState(1);
  const [userDataFetched, setUserDataFetched] = useState(false); 
  const [totalPrice, setTotalPrice] = useState(
    product?.model?.price * quantity
  );
  const [order, setOrder] = useState(null);
  const { orderToDetail } = props;
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUserName(username);
    }
  }, [userName]);

  const handleOKNow = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    const productId = typeof product._id === "string" ? product._id : String(product._id);

    const orderData = {
      userId: userId || "guest",
      products: [{ productId: productId, quantity: quantity }],
      name: buyerName,
      totalPrice: totalPrice,
      address: address,
      phoneNumber: phoneNumber,
      paymentMethod: selectedMethod,
      status: "pending",
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/orders`,
        orderData
      );
      console.log(orderData);
      setOrder(response.data);
      setOrderId(response.data._id);
      //setPaymentConfirmed(true);
    } catch (error) {
      console.error("Error creating order", error);
    }

    setPaymentConfirmed(true);
};

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalPrice(product.model.price * newQuantity);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get(`/products/details?skuId=${id}`);
        if (response) {
          setProduct(response.data);
          console.log(response.data);
          setImageSelected(response.data.assets[0].src);
          setTotalPrice(response.data.model.price * quantity);
        } else {
          setError("Error: Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, quantity]);

  useEffect(() => {
    if (product && quantity) {
      setTotalPrice(product.model.price * quantity);
    }
  }, [product, quantity]);

  const handlePreviewImage = (url) => {
    Swal.fire({
      width: "100px",
      showCloseButton: true,
      showConfirmButton: false,
      html: `
        <div class="d-flex justify-content-center align-items-center">
          <img src="${url}" class="img-swal w-75 h-75">
        <div>
      `,
    });
  };

  const handlePayment = async (productName, quantity, setQuantity) => {
    const newOrderId = Math.random().toString(36).substr(2, 9);
    setOrderId(newOrderId);
    try {
      let paymentData = { method: selectedMethod, productName, quantity };
      let isValidPayment = true;

      if (selectedMethod === "bankTransfer") {
        if (!bankAccount || !fullName || !bank || !transferContent) {
          isValidPayment = false;
          setPaymentResult("Vui lòng điền đầy đủ thông tin");
        } else {
          paymentData.bankAccount = bankAccount;
          paymentData.fullName = fullName;
          paymentData.bank = bank;
          paymentData.transferContent = transferContent;
          setPaymentResult("Chuyển khoản thành công");
        }
      } else if (
        selectedMethod === "atmCard" ||
        selectedMethod === "internationalCard"
      ) {
        if (!cardNumber || !expiryDate || !cvv) {
          isValidPayment = false;
          setPaymentResult("Vui lòngđiền đầy đủ thông tin");
        } else {
          paymentData.cardNumber = cardNumber;
          paymentData.expiryDate = expiryDate;
          paymentData.cvv = cvv;
          setPaymentResult("Thanh toán bằng thẻ thành công");
        }
      } else if (selectedMethod === "cash") {
        setPaymentResult("Thanh toán thành công");
      } else if (selectedMethod === "qrCode") {
        setPaymentResult(null);
        setIsModalOpen(false);
        return;
      } else if (selectedMethod === "ewallet") {
        if (!ewallet || !ewalletPhoneNumber) {
          isValidPayment = false;
          setPaymentResult("Vui lòng điền đầy đủ thông tin");
        } else {
          paymentData.ewallet = ewallet;
          paymentData.ewalletPhoneNumber = ewalletPhoneNumber;
          setPaymentResult("Thanh toán bằng ví điện tử thành công");
        }
      } else if (selectedMethod === "vnpay") {
        setPaymentResult("Thanh toán bằng VNPay thành công");
      } else {
        isValidPayment = false;
        setPaymentResult("Vui lòng chọn phương thức thanh toán");
      }

      if (isValidPayment) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện thanh toán:", error);
    }
  };

  const renderPaymentForm = () => {
    if (selectedMethod === "bankTransfer") {
      return (
        <div>
          <h3 style={{ textAlign: "center" }}>
            Thông tin chuyển khoản ngân hàng
          </h3>
          <h5 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            <i>
              Vui lòng chuyển đúng nội dung để chúng tôi có thể xác nhận thanh
              toán
            </i>
          </h5>
          <div>
            <p>
              <b>Tên tài khoản:</b> Lê Quốc Anh
            </p>{" "}
            <br></br>
            <p>
              <b>Số tài khoản:</b> 0815929695
            </p>{" "}
            <br></br>
            <p>
              <b>Ngân hàng:</b> TMCP Việt Nam Thịnh Vượng - Ngân hàng số CAKE by
              VPBank
            </p>{" "}
            <br></br>
            <p>
              <b>
                Nội dung*:<i> ProShopCamOn </i>
              </b>
            </p>{" "}
            <br></br>
          </div>
          <div className="form-group form-spacing">
            <label
              htmlFor="bankAccount"
              style={{ width: "200px", display: "inline-block" }}
            >
              <b>Số tài khoản ngân hàng:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="bankAccount"
              name="bankAccount"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="name"
              style={{ width: "200px", display: "inline-block" }}
            >
              <b>Họ và tên:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="bank"
              style={{ width: "200px", display: "inline-block" }}
            >
              <b>Ngân hàng:</b>
            </label>
            <select
              className="form-control"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Chọn ngân hàng</option>
              <option value="Vietcombank">Vietcombank</option>
              <option value="VietinBank">VietinBank</option>
              <option value="BIDV">BIDV</option>
              <option value="Sacombank">Sacombank</option>
              <option value="Agribank">Agribank</option>
              <option value="Techcombank">Techcombank</option>
              <option value="SeABank">SeABank</option>
              <option value="TPBank">TPBank</option>
              <option value="NamABank">Nam A Bank</option>
              <option value="ACB">ACB</option>
            </select>
          </div>
          <div className="form-group">
            <label
              htmlFor="transferContent"
              style={{ width: "200px", display: "inline-block" }}
            >
              <b>Nội dung chuyển khoản:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="transferContent"
              value={transferContent}
              onChange={(e) => setTransferContent(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (
      selectedMethod === "atmCard" ||
      selectedMethod === "internationalCard"
    ) {
      return (
        <div>
          <div className="form-group">
            <label
              htmlFor="cardNumber"
              style={{ width: "150px", display: "inline-block" }}
            >
              <b>Số thẻ:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="expiryDate"
              style={{ width: "150px", display: "inline-block" }}
            >
              <b>Ngày hết hạn:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="cvv"
              style={{ width: "150px", display: "inline-block" }}
            >
              <b>Mã CVV:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (selectedMethod === "cash") {
      return (
        <div>
          <p>Vui lòng thanh toán tiền mặt khi nhận hàng.</p>
        </div>
      );
    } else if (selectedMethod === "qrCode") {
      return (
        <div>
          <h2>Quét mã QR để thanh toán</h2>
          <div id="qrCode"></div>
        </div>
      );
    } else if (selectedMethod === "ewallet") {
      return (
        <div>
          <h3 style={{ textAlign: "center" }}>
            Thông tin chuyển khoản ngân hàng
          </h3>
          <h5 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            <i>
              Vui lòng chuyển đúng nội dung để chúng tôi có thể xác nhận thanh
              toán
            </i>
          </h5>
          <div>
            <p>
              <b>Tên tài khoản:</b> Lê Quốc Anh
            </p>{" "}
            <br></br>
            <p>
              <b>Số tài khoản:</b> 0815929695
            </p>{" "}
            <br></br>
            <p>
              <b>Ngân hàng:</b> TMCP Việt Nam Thịnh Vượng - Ngân hàng số CAKE by
              VPBank
            </p>{" "}
            <br></br>
            <p>
              <b>
                Nội dung*:<i> ProShopCamOn </i>
              </b>
            </p>{" "}
            <br></br>
          </div>
          <div className="form-group">
            <label
              htmlFor="ewallet"
              style={{ width: "200px", display: "inline-block" }}
            >
              <b>Ví điện tử:</b>
            </label>
            <select
              className="form-control"
              value={ewallet}
              onChange={(e) => setEwallet(e.target.value)}
            >
              <option value="">Chọn ví điện tử</option>
              <option value="momo">Momo</option>
              <option value="zalo">ZaloPay</option>
            </select>
          </div>

          <div className="form-group">
            <label
              htmlFor="ewalletPhoneNumber"
              style={{ width: "200px", display: "inline-block" }}
            >
              <b>Số điện thoại:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="ewalletPhoneNumber"
              value={ewalletPhoneNumber}
              onChange={(e) => setEwalletPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="transferContent"
              style={{ width: "200px", display: "inline-block" }}
            >
              <b>Nội dung chuyển khoản:</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="transferContent"
              value={transferContent}
              onChange={(e) => setTransferContent(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (selectedMethod === "vnpay") {
      return (
        <div>
          <div>
            <h5 style={{ textAlign: "center", marginBottom: "40px" }}>
              {" "}
              <i>
                Vui lòng chuyển đúng nội dung để chúng tôi có thể xác nhận thanh
                toán
              </i>
            </h5>
            <p>
              <b>
                Nội dung chuyển khoản*:<i> ProShopCamOn </i>
              </b>
            </p>{" "}
            <br></br>
          </div>
          <p>
            Vui lòng truy cập vào đây để thanh toán:{" "}
            <a
              href="https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder"
              target="_blank"
            >
              https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder
            </a>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Vui lòng chọn phương thức thanh toán.</p>
        </div>
      );
    }
  };

  useEffect(() => {
    if (selectedMethod === "qrCode") {
      //generateQRCode();
    }
  }, [selectedMethod]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleConfirmOrder = () => {
    setIsModalOpen(false);
    setPaymentConfirmed(true);
  };

  return (
    < div className="background-container-1">
       <div className="bg-body rounded" style={{marginLeft: '100px', marginRight: '100px'}}>
      <div className="container-1">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "140vh" }}
        >
          <i class="fa fa-credit-card fa-4x" aria-hidden="true"></i>
          <h1 className="text-center">THANH TOÁN</h1>
          <div className="col-md-7 custom-column" style={{ height: "100%" }}>
            <h3 style={{ marginBottom: "50px" }}> Thông tin khách hàng:</h3>
            <div className="form-group">
              <label
                htmlFor="buyerName"
                style={{ width: "150px", display: "inline-block" }}
              >
                <b>Họ và tên:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="buyerName"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="phoneNumber"
                style={{ width: "150px", display: "inline-block" }}
              >
                <b>Số điện thoại:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="address"
                style={{ width: "150px", display: "inline-block" }}
              >
                <b>Địa chỉ:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <h3 style={{ marginTop: "50px", marginBottom: "50px" }}>
              {" "}
              Sản phẩm:{" "}
            </h3>
            <div className="row no-gutters">
              <div className="col-md-4" style={{ padding: "0 10px" }}>
                <div className="" style={{ width: "100%", height: "100%" }}>
                  <img
                    class="hover-c"
                    src={`https://media-api-beta.thinkpro.vn/${imageSelected}`}
                    alt=""
                    style={{
                      width: "90%",
                      height: "90%",
                      objectFit: "contain",
                    }}
                    onClick={() =>
                      handlePreviewImage(
                        `https://media-api-beta.thinkpro.vn/${imageSelected}`
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-md-8" style={{ padding: "0 10px" }}>
                <div className="form-group">
                  <label
                    htmlFor="productName"
                    style={{ width: "150px", display: "inline-block" }}
                  >
                    <b>Tên sản phẩm:</b>
                  </label>
                  {product.model.name}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="quantity"
                    style={{ width: "150px", display: "inline-block" }}
                  >
                    <b>Số lượng:</b>
                  </label>
                  <Counter onQuantityChange={handleQuantityChange} />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="totalPrice"
                    style={{ width: "150px", display: "inline-block" }}
                  >
                    <b>Tổng tiền:</b>
                  </label>
                  <div className="d-flex">
                    {totalPrice !== null && (
                      <p
                        style={{
                          fontSize: "20px",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {totalPrice.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1 custom-column"></div>
          <div className="col-md-4 custom-column" style={{ height: "100%" }}>
            <div className="d-flex flex-column align-items-center">
              <h3 style={{ marginBottom: "50px" }}> Phương thức thanh toán</h3>
              <select
                className="form-control"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value="cash">Tiền mặt</option>
                <option value="bankTransfer">Chuyển khoản</option>
                <option value="atmCard">Thẻ ATM</option>
                <option value="internationalCard">Thẻ quốc tế</option>
                <option value="qrCode">Mã QR</option>
                <option value="ewallet">Ví điện tử</option>
                <option value="vnpay">VNPay</option>
              </select>
              <div className="text-center mt-4">{renderPaymentForm()}</div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handlePayment(productName, quantity, setQuantity)
                  }
                  style={{
                    height: "40px",
                    width: "200px",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "500px",
                height: "250px",
                margin: "auto",
                fontSize: "17px",
              },
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "30px",
                marginTop: "15px",
              }}
            >
              XÁC NHẬN THANH TOÁN
            </h3>
            <p style={{ textAlign: "center", marginBottom: "50px" }}>
              Bạn có chắc chắn muốn thanh toán không?
            </p>
            <div style={{ display: "flex" }}>
              <button
                onClick={handleOKNow}
                style={{
                  marginLeft: "120px",
                  width: "70px",
                  height: "40px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  backgroundColor: "#7efff5",
                  borderColor: "#7efff5",
                }}
              >
                Có
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  marginLeft: "60px",
                  width: "100px",
                  height: "40px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  backgroundColor: "#fc5c65",
                  borderColor: "#fc5c65",
                }}
              >
                Không
              </button>
            </div>
          </Modal>
          {paymentConfirmed && (
            <Modal
              isOpen={paymentConfirmed}
              onRequestClose={() => setPaymentConfirmed(false)}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  width: "700px",
                  height: "350px",
                  margin: "auto",
                  fontSize: "17px",
                },
              }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <img src={require('../../images/tick.jpg')} alt="Success" style={{ width: '60px', height: '60px' }} />
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  marginTop: "15px",
                }}
              >
                ĐẶT HÀNG THÀNH CÔNG
              </h3>
              <p style={{ textAlign: "center", marginBottom: "50px" }}>
                Bạn đã đặt đơn hàng thành công
              </p>
              <div style={{ display: "flex" }}>
                <button
                  onClick={() => {
                    setPaymentConfirmed(false);
                    navigate("/");
                  }}
                  style={{
                    marginLeft: "30px",
                    width: "250px",
                    height: "40px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    backgroundColor: "#7efff5",
                    borderColor: "#7efff5",
                  }}
                >
                  Tiếp tục mua sắm
                </button>
                <button
                  onClick={() => {
                    setPaymentConfirmed(false);
                    navigate(`/orders/${orderId}`);
                  }}
                  style={{
                    marginLeft: "30px",
                    width: "250px",
                    height: "40px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    backgroundColor: "#dfe6e9",
                    borderColor: "#dfe6e9",
                  }}
                >
                  Xem chi tiết đơn hàng
                </button>
              </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
      <div className='image'>
      <div className=" bank-images">
        <div>
            <h5 style={{marginBottom: '30px', marginLeft: '50px'}}>Chấp nhận thẻ của các ngân hàng:</h5>
            <div className="bank-row">
              <img src={require('../../images/ACB.png')} alt="ACB" />
              <img src={require('../../images/BIDV.jpg')} alt="BIDV" />
              <img src={require('../../images/MBBank.png')} alt="MBBank" />
              <img src={require('../../images/NamABank.png')} alt="NamABank" />
            </div>
            <div className="bank-row">
              <img src={require('../../images/TPBank.png')} alt="TPBank" />
              <img src={require('../../images/VPBank.png')} alt="VPBank" />
              <img src={require('../../images/Vietcombank.jpg')} alt="Vietcombank" />
              <img src={require('../../images/Viettinbank.png')} alt="ViettinBank" />
            </div>
            <div className="bank-row">
            <img src={require('../../images/SeABank.png')} alt="SeABank" />
              <img src={require('../../images/agribank.png')} alt="Agribank" />
              <img src={require('../../images/Techcombank.png')} alt="Techcombank" />
              <img src={require('../../images/sacombank.png')} alt="Sacombank" />
            </div>
            </div>
            </div>
            <div className='ewallet'>
              <h5 style={{marginBottom:'30px'}}>Chấp nhận các ví điện tử:</h5>
              <div className="bank-row-1">
                <img src={require('../../images/Momo.png')} alt="Momo" />
                <img src={require('../../images/ZaloPay.png')} alt="ZaloPay" />
              </div>
            </div>
            <div className='paymentPort' >
              <h5 style={{marginBottom:'30px'}} >Chấp nhận thanh toán qua cổng thanh toán: </h5>
              <div className="bank-row-2">
                <img src={require('../../images/VNPay.png')} alt="VNPay" />
              </div>
            </div>
            </div>
          </div>

    </div>
  );
};

export default PaymentPage;
