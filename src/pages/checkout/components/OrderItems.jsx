import React from 'react'
import Collapse from "../../../utils/collapse";
import OrderItem from "./OrderItem";
import {useCart} from "../../../context/cart/cart-context";

const Label = ({countItem = 0}) => {
    return <div className='d-flex gap-3 justify-content-between'>
        <div>Sản phẩm trong đơn (<b>{countItem}</b>)</div>
        <i className='bi-chevron-down'></i>
    </div>
}

const OrderItems = () => {
    // cart context
    const {items} = useCart();

    return <>
        <Collapse label={<Label countItem={items?.length || 0}/>}>
            {
                (items || []).map((item, idx) =>
                    <OrderItem key={idx} className='mt-3 pt-3 border-top'
                               quantity={item.quantity} productModel={item.model}/>)
            }
            {
                !items?.length &&
                <p className='text-center py-4 fs-6 text-secondary'>Không có sản phẩm nào trong giỏ hàng</p>
            }
        </Collapse>
    </>
}

export default OrderItems