import React from 'react'
import {useCart} from "../../../context/cart/cart-context";
import {formatCurrency} from "../../../helpers/currency";

const OrderSummary = () => {
    // cart context
    const cartContext = useCart()

    return <>
        <h5>Tóm tắt đơn hàng</h5>
        <p className='fs-6'>Đơn hàng chưa bao gồm phí vận chuyển</p>
        <div className='d-flex justify-content-between gap-3 mt-3'>
            <div>Tạm tính:</div>
            <div>{formatCurrency(cartContext.total)}</div>
        </div>
        <div className='mt-3 border'></div>
        <div className='d-flex flex-column gap-1 mt-3'>
            <div className='d-flex justify-content-between align-items-center'>
                <div>Tổng cộng:</div>
                <div className='text-danger fs-5 fw-semibold'>{formatCurrency(cartContext.total)}</div>
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <div>Đã thanh toán:</div>
                <div className=''>{formatCurrency(0)}</div>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>Còn lại:</div>
                <div className=''>{formatCurrency(cartContext.total)}</div>
            </div>
        </div>
    </>
}

export default OrderSummary