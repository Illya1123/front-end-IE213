import React from 'react'
import PaymentMethod from "./components/payment-method/PaymentMethod";
import OrderSummary from "./components/OrderSummary";
import OrderInformation from "./components/OrderInformation";
import OrderItems from "./components/OrderItems";
import {useCart} from "../../context/cart/cart-context";
import {useNavigate} from "react-router-dom";

const Checkout = () => {
    // cart context
    const cartContext = useCart()

    // navigate
    const navigate = useNavigate();

    // state
    const [isLoading, setIsLoading] = React.useState(false)

    // ref
    const orderInformationRef = React.useRef()
    const orderInformationWrapperRef = React.useRef()

    // memo init
    const cartItems = React.useMemo(() => cartContext.items || [], [])

    /**
     * handle submit
     *
     * @type {(function())|*}
     */
    const handleSubmit = React.useCallback(() => {
        const information = orderInformationRef.current?.validate()
        if (!information?.isValid) {
            orderInformationWrapperRef.current?.scrollIntoView({behavior: 'smooth'});
            return;
        }

        // TODO: call api on here
        setIsLoading(true)
        cartContext.checkoutComplete()
        setTimeout(() => {
            setIsLoading(false)
            cartContext.clearCart()
            navigate('/checkout-success')
        }, 500)
    }, [])

    return <>
        <div className='background-container'>
            <div className='container'>
                {/*region header*/}
                <h4>Thanh Toán</h4>
                {/*endregion header*/}

                <div className='row'>
                    <div className='col-12 col-md-6 col-lg-8'>
                        {/*region order information*/}
                        <div className='bg-white p-4 rounded' ref={orderInformationWrapperRef}>
                            <OrderInformation ref={orderInformationRef}/>
                        </div>
                        {/*endregion order information*/}

                        {/*region payment method*/}
                        <div className='mt-3'>
                            <h4>Phương thức thanh toán</h4>
                            <div className='p-4 bg-white rounded'>
                                <PaymentMethod/>
                                <button disabled={!cartItems.length || isLoading} type="button"
                                        className={`btn btn-primary w-100 mt-3 fs-5 ${!cartItems.length ? 'bg-secondary' : ''}`}
                                        onClick={handleSubmit}>Xác
                                    nhận
                                </button>
                            </div>
                        </div>
                        {/*endregion payment method*/}
                    </div>

                    <div className='col-12 col-md-6 col-lg-4'>
                        {/*region order summary*/}
                        <div className='bg-white p-4 rounded'>
                            <OrderSummary/>
                        </div>
                        {/*endregion order summary*/}

                        {/*region list order items*/}
                        <div className='bg-white p-4 rounded mt-3'>
                            <OrderItems/>
                        </div>
                        {/*endregion list order items*/}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Checkout
