import React from 'react'
import {useCart} from "../../../context/cart/cart-context";


const OrderInformation = React.forwardRef((_props, ref) => {
    // cart context
    const cartContext = useCart()

    // state init
    const [formData, setFormData] = React.useState({
        orderCode: cartContext.orderCode,
        clientName: '',
        clientAddress: '',
        clientPhoneNumber: ''
    })
    const [errorMessage, setErrorMessage] = React.useState({
        orderCode: '',
        clientName: '',
        clientAddress: '',
        clientPhoneNumber: ''
    })

    /**
     * validate form
     *
     * @type {(function())|*}
     */
    const validateForm = React.useCallback(() => {
        let isValid = true
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                setErrorMessage(prevState => ({
                    ...prevState,
                    [key]: 'Vui lòng không để trống thông tin này.'
                }))
                isValid = false
            } else {
                setErrorMessage(prevState => ({
                    ...prevState,
                    [key]: ''
                }))
            }
        })
        return {
            data: formData,
            isValid
        }
    }, [formData])


    React.useImperativeHandle(ref, () => ({
        validate: () => {
            return validateForm()
        }
    }));


    return <>
        <div className="alert alert-danger text-uppercase text-center fw-semibold" role="alert">
            Đơn hàng chưa được thanh toán
        </div>
        <div className="alert alert-success text-center" role="alert">
            Đã gửi thông tin đặt hàng đến ThinkPro. Bạn có thể tiến hành thanh toán ngay bây giờ.
        </div>

        <div className="card border rounded">
            <div className="card-body">
                <h5>Thông tin đơn hàng</h5>

                <div className="mb-3 row">
                    <label htmlFor="orderCode" className="col-sm-4 col-form-label">Mã đặt hàng:</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control-plaintext" id="orderCode"
                               value={formData.orderCode}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="clientName" className="col-sm-4 col-form-label">Người nhận hàng:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control m-0" id="clientName" value={formData.clientName}
                               onChange={({target: {value}}) => setFormData(prevState => ({
                                   ...prevState,
                                   clientName: value
                               }))}/>
                        <div className="form-text text-danger">
                            {errorMessage.clientName}
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="clientName" className="col-sm-4 col-form-label">Số điện thoại:</label>
                    <div className="col-sm-8">
                        <input type="number" className="form-control m-0" id="clientName"
                               value={formData.clientPhoneNumber}
                               onChange={({target: {value}}) => setFormData(prevState => ({
                                   ...prevState,
                                   clientPhoneNumber: value
                               }))}/>
                        <div className="form-text text-danger">
                            {errorMessage.clientPhoneNumber}
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="clientAddress" className="col-sm-4 col-form-label">Địa chỉ nhận hàng:</label>
                    <div className="col-sm-8">
                        <textarea className="form-control m-0" id="clientAddress" rows='3'
                                  value={formData.clientAddress}
                                  onChange={({target: {value}}) => setFormData(prevState => ({
                                      ...prevState,
                                      clientAddress: value
                                  }))}/>
                        <div className="form-text text-danger">
                            {errorMessage.clientAddress}
                        </div>
                    </div>
                </div>

                <table className="table d-none">
                    <tbody>
                    <tr>
                        <td className='border-0 w-25 p-1'>Mã đặt hàng:</td>
                        <td className='border-0 p-1'>{formData.orderCode}</td>
                    </tr>
                    <tr>
                        <td className='border-0 w-25 p-1'>Người nhận:</td>
                        <td className='border-0 p-1'>{formData.clientName}</td>
                    </tr>
                    <tr>
                        <td className='border-0 w-25 p-1'>Địa chỉ nhận hàng:</td>
                        <td className='border-0 p-1'>{formData.clientAddress}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
})

export default OrderInformation