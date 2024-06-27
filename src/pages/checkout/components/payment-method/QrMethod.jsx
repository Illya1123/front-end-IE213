import React from 'react'
import {MOCK_DATA_PAYMENT_METHOD} from "../../../../mockup/payment";


const TransferGuide = () => {
    const [guides] = React.useState(MOCK_DATA_PAYMENT_METHOD.QR_CODE.GUIDE)

    return <>
        <div className='card p-4 bg-primary bg-opacity-10'>
            <h6 className='fs-6'>Hướng dẫn chuyển khoản</h6>

            <ul className='list-unstyled'>
                {
                    guides.map((guide, index) =>
                        <li className='d-flex gap-3 mt-2' key={index}>
                            <div>
                        <span className='badge rounded-circle bg-primary position-relative'
                              style={{width: '1.5rem', height: '1.5rem'}}>
                            <span className='position-absolute top-50 start-50 translate-middle'>{index + 1}</span>
                        </span>
                            </div>

                            <ul className='list-unstyled'>
                                {guide.map((step, stepIdx) => <li key={stepIdx}>{step}</li>)}
                            </ul>
                        </li>)
                }

            </ul>
        </div>
    </>
}

const BankInformation = () => {
    const [bankInformation] = React.useState(MOCK_DATA_PAYMENT_METHOD.QR_CODE.BANK_INFORMATION)

    return <>
        <div className='p-4 bg-white border rounded mt-3'>
            <div className='row'>
                <div className='col-12 col-md-8'>
                    <h5 className='fs-6 text-secondary'>Chuyển khoảng thường: </h5>

                    <table className='table'>
                        <tbody>
                        <tr>
                            <td className='border-0 w-25 p-1'>Ngân hàng:</td>
                            <td className='border-0 p-1'>{bankInformation.bankName}</td>
                        </tr>
                        <tr>
                            <td className='border-0 w-25 p-1'>Tên tài khoản:</td>
                            <td className='border-0 p-1'>{bankInformation.accountName}</td>
                        </tr>
                        <tr>
                            <td className='border-0 w-25 p-1'>Số tài khoản:</td>
                            <td className='border-0 p-1'>{bankInformation.accountNumber}</td>
                        </tr>
                        <tr>
                            <td className='border-0 w-25 p-1'>Nội dung CK:</td>
                            <td className='border-0 p-1'>{bankInformation.transferNote}</td>
                        </tr>
                        <tr>
                            <td className='border-0 w-25 p-1'>Số tiền:</td>
                            <td className='border-0 p-1'>{bankInformation.value}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-12 col-md-4 d-flex'>
                    <div className='d-none d-md-block border-start px-2'></div>
                    <div className='w-100'>
                        <h5 className='fs-6 text-secondary'>Quét mã QR bằng ứng dụng ngân hàng</h5>
                        <div className='text-center w-100'>
                            <img src="/images/checkout/bank-qr-code.svg" alt="QR code" className='w-100' style={{maxWidth: '250px'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const QrMethod = () => {
    return <>
        <div className='mt-3'>
            <TransferGuide/>
            <BankInformation/>
        </div>
    </>
}

export default QrMethod