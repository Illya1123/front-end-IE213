import React from 'react';

const UserInfo = ({ buyerName, phoneNumber, address }) => {
  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p><strong>Họ và tên:</strong> {buyerName}</p>
      <p><strong>Số điện thoại:</strong> {phoneNumber}</p>
      <p><strong>Địa chỉ:</strong> {address}</p>
    </div>
  );
};

export default UserInfo;