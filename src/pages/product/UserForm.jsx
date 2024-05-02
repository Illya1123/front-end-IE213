import React, { useState } from 'react';

const UserForm = (props) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSave(name, phoneNumber, address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name"><b>Họ và tên:</b></label>
        <input
          type="text"
          className="form-control-3"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber"><b>Số điện thoại:</b></label>
        <input
          type="text"
          className="form-control-3"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address"><b>Địa chỉ:</b></label>
        <input
          type="text"
          className="form-control-3"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Lưu
      </button>
    </form>
  );
};

export default UserForm;