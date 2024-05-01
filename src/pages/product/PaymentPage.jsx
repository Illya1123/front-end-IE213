import React, { useState, useEffect } from 'react';
import "./payment.scss";
import Modal from 'react-modal';
import axios from 'axios';
import { useParams } from "react-router-dom";
const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentResult, setPaymentResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankAccount, setBankAccount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [bank, setBank] = useState('');
  const [transferContent, setTransferContent] = useState('');
  const [ewallet, setEwallet] = useState('');
  const [ewalletPhoneNumber, setEwalletPhoneNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const productInfo = response.data;
        setProductInfo(productInfo);
        setProductName(productInfo.name);
      } catch (error) {
        console.error('Lỗi không thấy thông tin sản phẩm:', error);
      }
    }
    fetchProductInfo();
  }, [id]);

  const handlePayment = async (productName, productQuantity) => {
    try {
      let paymentData = { method: selectedMethod, productName, productQuantity };
      let isValidPayment = true;

      if (selectedMethod === 'bankTransfer') {
        if (!bankAccount || !name || !bank || !transferContent) {
          isValidPayment = false;
          setPaymentResult('Vui lòng điền đầy đủ thông tin');
        } else {
          paymentData.bankAccount = bankAccount;
          paymentData.name = name;
          paymentData.bank = bank;
          paymentData.transferContent = transferContent;
          setPaymentResult('Chuyển khoản thành công');
        }
      } else if (selectedMethod === 'atmCard' || selectedMethod === 'internationalCard') {
        if (!cardNumber || !expiryDate || !cvv) {
          isValidPayment = false;
          setPaymentResult('Vui lòng điền đầy đủ thông tin');
        } else {
          paymentData.cardNumber = cardNumber;
          paymentData.expiryDate = expiryDate;
          paymentData.cvv = cvv;
          setPaymentResult('Thanh toán bằng thẻ thành công');
        }
      } else if (selectedMethod === 'cash') {
        setPaymentResult('Thanh toán thành công');
      } else if (selectedMethod === 'qrCode') {
        setPaymentResult(null);
        setIsModalOpen(false);
        return;
      } else if (selectedMethod === 'ewallet') {
        if (!ewallet || !ewalletPhoneNumber) {
          isValidPayment = false;
          setPaymentResult('Vui lòng điền đầy đủ thông tin');
        } else {
          paymentData.ewallet = ewallet;
          paymentData.ewalletPhoneNumber = ewalletPhoneNumber;
          setPaymentResult('Thanh toán bằng ví điện tử thành công');
        }
      } else {
        isValidPayment = false;
        setPaymentResult('Vui lòng chọn phương thức thanh toán');
      }

      if (isValidPayment) {
        setIsModalOpen(true);

        await new Promise(resolve => setTimeout(resolve, 5000));

        setPaymentResult(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện thanh toán:', error);
    }
  };

  const renderPaymentForm = () => {
    if (selectedMethod === 'bankTransfer') {
      return (
        <div>
          <h2 style={{ textAlign: 'center' }}>Thông tin chuyển khoản ngân hàng</h2>
          <h3 style={{ textAlign: 'center' }}> Vui lòng chuyển đúng nội dung để chúng tôi có thể xác nhận thanh toán</h3>
          <div style={{ marginLeft: '150px' }}>
            <p><b>Tên tài khoản:</b> Lê Quốc Anh</p> <br></br>
            <p><b>Số tài khoản:</b> 0815929695</p> <br></br>
            <p><b>Ngân hàng:</b> TMCP Việt Nam Thịnh Vượng - Ngân hàng số CAKE by VPBank</p> <br></br>
            <p><b>Nội dung*:<i> ProShopCamOn </i></b></p> <br></br>
          </div>
          <div className="form-group form-spacing">
            <label htmlFor="bankAccount"><b>Số tài khoản ngân hàng:</b></label>
            <input
              type="text"
              className="form-control-3"
              id="bankAccount"
              name="bankAccount"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name"><b>Họ và tên:</b></label>
            <input
              type="text"
              className="form-control-3"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bank"><b>Ngân hàng:</b></label>
            <select
              className="form-control-3"
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
            <label htmlFor="transferContent"><b>Nội dung chuyển khoản:</b></label>
            <input
              type="text"
              className="form-control-3"
              id="transferContent"
              value={transferContent}
              onChange={(e) => setTransferContent(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (selectedMethod === 'atmCard' || selectedMethod === 'internationalCard') {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="cardNumber"><b>Số thẻ:</b></label>
            <input
              type="text"
              className="form-control-2"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate"><b>Ngày hết hạn:</b></label>
            <input
              type="text"
              className="form-control-2"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv"><b>Mã CVV:</b></label>
            <input
              type="text"
              className="form-control-2"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (selectedMethod === 'cash') {
      return (
        <div>
          <p>Vui lòng thanh toán tiền mặt khi nhận hàng.</p>
        </div>
      );
    } else if (selectedMethod === 'qrCode') {
      return (
        <div>
          <h2>Quét mã QR để thanh toán</h2>
          <div id="qrCode"></div>
        </div>
      );
    } else if (selectedMethod === 'ewallet') {
      return (
        <div>
          <h2 style={{ textAlign: 'center' }}>Thông tin chuyển khoản ngân hàng</h2>
          <h3 style={{ textAlign: 'center' }}> Vui lòng chuyển đúng nội dung để chúng tôi có thể xác nhận thanh toán</h3>
          <div style={{ marginLeft: '150px' }}>
            <p><b>Tên tài khoản:</b> Lê Quốc Anh</p> <br></br>
            <p><b>Số tài khoản:</b> 0815929695</p> <br></br>
            <p><b>Ngân hàng:</b> TMCP Việt Nam Thịnh Vượng - Ngân hàng số CAKE by VPBank</p> <br></br>
            <p><b>Nội dung*:<i> ProShopCamOn </i></b></p> <br></br>
          </div>
          <div className="form-group">
            <label htmlFor="ewallet"><b>Ví điện tử:</b></label>
            <select
              className="form-control-3"
              value={ewallet}
              onChange={(e) => setEwallet(e.target.value)}
            >
              <option value="">Chọn ví điện tử</option>
              <option value="momo">Momo</option>
              <option value="zalo">ZaloPay</option>
              <option value="vnpay">VNPay</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ewalletPhoneNumber"><b>Số điện thoại:</b></label>
            <input
              type="text"
              className="form-control-3"
              id="ewalletPhoneNumber"
              value={ewalletPhoneNumber}
              onChange={(e) => setEwalletPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="transferContent"><b>Nội dung chuyển khoản:</b></label>
            <input
              type="text"
              className="form-control-3"
              id="transferContent"
              value={transferContent}
              onChange={(e) => setTransferContent(e.target.value)}
            />
          </div>
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
    if (selectedMethod === 'qrCode') {
      //generateQRCode();
    }
  }, [selectedMethod]);

  return (
    <div className="background-container">
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ height: '200vh' }}>
          <div className="col-8">
            <h1 className="text-center">THANH TOÁN</h1>
            <h3>1. Thông tin khách hàng:</h3>
            <div className="form-group">
              <label htmlFor="buyerName"><b>Họ và tên:</b></label>
              <input
                type="text"
                className="form-control-3"
                id="buyerName"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber"><b>Số điện thoại:</b></label>
              <input
                type="text"
                className="form-control-3"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address"><b>Địa chỉ:</b></label>
              <input
                type="text"
                className="form-control-3"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <h3 style = {{marginTop:'50px'}}>2. Thông tin sản phẩm: </h3>

            <div className="form-group">
              <label htmlFor="productName"><b>Tên sản phẩm:</b></label>
              <input
                type="text"
                className="form-control-3"
                id="productName"
                value={productInfo.name}
                disabled
              />
            </div>
            <p>Số lượng: {productQuantity}</p>
            {/* <p>Total: {totalPrice}</p> */}


            <h3 style = {{marginTop:'50px'}}>3. Phương thức thanh toán</h3> <br></br>
            <select
              className="form-control-1"
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
            </select>

            <div className="text-center">
              {renderPaymentForm()}
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={() => handlePayment(productName, productQuantity)}
                style={{ height: '40px', width: '200px', fontSize: '17px', marginTop: '10px', fontWeight: 'bold' }}
              >
                Thanh toán
              </button>
            </div>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                  width: '700px',
                  height: '500px',
                  margin: 'auto',
                  textAlign: 'center',
                  fontSize: '17px'
                }
              }}
            >
              <h3 style={{ textAlign: 'center' }}>Thông báo thanh toán</h3>
              <p style={{ fontSize: '22px' }}><b>{paymentResult}</b></p>
              <p><b>Thông tin khách hàng:</b> {buyerName}, {phoneNumber}, {address}</p>
              <p><b>Thông tin sản phẩm:</b> {productInfo.name},  {productQuantity}</p>
              <button onClick={(event) => { event.preventDefault(); setIsModalOpen(false); }} style={{ height: '30px', width: '60px' }}>OK</button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
