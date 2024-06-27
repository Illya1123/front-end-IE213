import React from 'react'
import {useNavigate} from "react-router-dom";
import {useCart} from "../../context/cart/cart-context";

const CheckoutSuccess = () => {
    // cart context
    const cartContext = useCart()

    // navigate
    const navigate = useNavigate();

    // state
    const order = React.useRef(cartContext)

    /**
     * use effect
     */
    React.useEffect(() => {
        if (!order.current?.hasCheckout) {
            navigate('/home')
        }
    }, [])


    return <>
        <div className='text-center p-5 m-5'>
            <div className='bi-check-circle-fill fs-1 text-success'></div>
            <h3>Đặt hàng thành công</h3>
            <p className='text-secondary fs-6'>Mã đơn hàng: <b>{order.current?.orderCode}</b></p>
            <button className='btn btn-primary mt-3' onClick={() => navigate('/home')}>Về trang chủ</button>
        </div>
    </>
}

export default CheckoutSuccess