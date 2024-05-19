const QR_PAYMENT = {
    GUIDE: [
        ['Cách 1: Dùng ứng dụng ngân hàng để quét mã QR.', 'Cách 2: Nhập thông tin chuyển khoản bên dưới. Lưu ý nhập chính xác số tiền, nội dung chuyển khoản.'],
        ['Sau khi chuyển khoản thành công, bấm nút “Tôi đã chuyển khoản”.', 'Hệ thống sẽ mất khoảng 30 giây để xác minh đã nhận được tiền']
    ],
    BANK_INFORMATION: {
        bankName: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        accountName: 'Nguyen Van A',
        accountNumber: '112233445566',
        transferNote: '212405170001 ASJEJI',
        value: 28990000
    }
}

export const MOCK_DATA_PAYMENT_METHOD = {
    QR_CODE: QR_PAYMENT,
}
