import React from 'react'
import {PAYMENT_METHOD} from "../../../../constants/payment";
import Collapse from "../../../../utils/collapse";
import QrMethod from "./QrMethod";


const PaymentMethod = () => {

    // state init
    const [method, setMethod] = React.useState(PAYMENT_METHOD.QR_CODE)

    return <>
        <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id={PAYMENT_METHOD.QR_CODE}
                   onChange={({target: {checked}}) => checked && setMethod(PAYMENT_METHOD.QR_CODE)}
                   checked={method === PAYMENT_METHOD.QR_CODE}
            />
            <label className="form-check-label d-flex align-items-center gap-2" htmlFor={PAYMENT_METHOD.QR_CODE}>
                <img src="/images/checkout/qr-icon.png" alt="qr-icon" width={24}/>
                <div className='d-flex justify-content-between gap-3 flex-fill'>
                    <div>Chuyển khoản QR</div>
                    <div>
                        <div className='badge bg-success bg-opacity-10 text-success fw-semibold'>Khuyên dùng</div>
                    </div>
                </div>
            </label>
            <Collapse visible={method === PAYMENT_METHOD.QR_CODE}>
                <QrMethod/>
            </Collapse>
        </div>

        <div className="form-check mt-3 pt-3 border-top">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id={PAYMENT_METHOD.COD}
                   onChange={({target: {checked}}) => checked && setMethod(PAYMENT_METHOD.COD)}
                   checked={method === PAYMENT_METHOD.COD}
            />
            <label className="form-check-label d-flex align-items-center gap-2" htmlFor={PAYMENT_METHOD.COD}>
                <img src="/images/checkout/cod-icon.png" alt="qr-icon" width={24}/>
                <div className='d-flex justify-content-between gap-3 flex-fill'>
                    <div>Thanh toán khi nhận hàng</div>
                    <div>
                        <div className='badge bg-success bg-opacity-10 text-success fw-semibold'>Tiết kiệm</div>
                    </div>
                </div>
            </label>
        </div>
    </>
}
export default PaymentMethod

