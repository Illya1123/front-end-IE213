import React from 'react'
import QuantitySelector from "../../../utils/quantity-selector";
import {useCart} from "../../../context/cart/cart-context";
import {formatCurrency} from "../../../helpers/currency";


const OrderItem = ({className = '', quantity = 0, productModel = {}}) => {
    // cart context
    const {removeItemFromCart, updateItemFromCart} = useCart()

    // memo
    const imgSrc = React.useMemo(() => {
        return `https://media-api-beta.thinkpro.vn/${productModel.image}`
    }, [])

    /**
     * handle remove item
     *
     * @type {(function())|*}
     */
    const handleRemoveItem = React.useCallback(() => {
        removeItemFromCart(productModel)
    }, [productModel, removeItemFromCart])

    /**
     * handle update quantity
     */
    const handleUpdateQuantity = React.useCallback((value) => {
        updateItemFromCart({
            quantity: value,
            model: productModel
        })
    }, [updateItemFromCart, productModel])

    return <>
        <div className={`d-flex gap-2 ${className}`}>
            <div>
                <img src={imgSrc} alt="product image" width={72} className='p-1'
                     style={{objectFit: 'contain'}}/>
            </div>

            <div className='flex-fill'>
                <div className='d-flex gap-1 justify-content-between'>
                    <div>
                        <h6 className='text-break my-0'>{productModel.name}</h6>
                        <div className='d-flex gap-1 flex-wrap'>{
                            (productModel.modelValues || []).map((o, index) =>
                                <div key={index}
                                     className='badge rounded-pill text-bg-light fw-normal text-wrap text-start'>{o}</div>)
                        }</div>
                        <QuantitySelector className='mt-2' value={quantity} setValue={handleUpdateQuantity} cla/>
                        <div className='text-danger fw-semibold mt-1'>{
                            formatCurrency(productModel.price * quantity)
                        }</div>
                    </div>
                    <div>
                        <button className='btn btn-outline-danger' title='Xóa sản phẩm này' onClick={handleRemoveItem}>
                            <span className='bi-trash'></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OrderItem