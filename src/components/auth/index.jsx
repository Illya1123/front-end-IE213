import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import http from "../../utils/request";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setCurrentUserAction, setCartAction} from '../../store/actions/index'

const Auth = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || null); // Load username từ localStorage
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null); // Load accessToken từ localStorage
  const [userData, setUserData] = useState(null); // Khởi tạo state userData với giá trị ban đầu là null
  const dispatch = useDispatch()

  const refreshPageWithDelay = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      http.post(
        '/auth/login',
        JSON.stringify(values),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(res => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Đăng Nhập thành công!',
            text: '3 giây sau sẽ tự động tải lại trang!'
          })
          setUsername(values.username);
          setAccessToken(res.data.accessToken); // Lưu accessToken vào state
          localStorage.setItem('username', values.username); // Lưu username vào localStorage
          localStorage.setItem('accessToken', res.data.accessToken); // Lưu accessToken vào localStorage
          dispatch(setCurrentUserAction(res.data.accessToken));
          refreshPageWithDelay();
        }
      })
    },
  });

  useEffect(() => {
    // Xóa username và accessToken từ localStorage khi đăng xuất
    if (!username) {
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      dispatch(setCurrentUserAction(''));
      dispatch(setCartAction([]));
    }
  }, [username]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get(
          `/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        if( response) {
          setUserData(response.data);
          localStorage.setItem("userId", response.data._id);
        } else {
          console.error("Error fetching user data:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (username) { 
      fetchUserData();
    }
  }, [username]); 

  return (
    <>
      {username ? (
        <div className="dropdown">
          <div className="nav-item dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle" style={{ fontSize: '1.2em', color: 'var(--bs-primary)' }}></i>
            <span>{username}</span>
          </div>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/orders">Xem đơn hàng</a></li>
            <li onClick={() => setUsername(null)}><a className="dropdown-item" href="#">Đăng xuất</a></li>
          </ul>
        </div>
      ) : (
        <>
          <Link to={"/register"}>
            <div className="nav-item">
              <span>Đăng ký</span>
            </div>
          </Link>
          <div className="dropdown">
            <div
              className="nav-item dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Đăng nhập
            </div>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              style={{ width: "300px" }}
            >
              <form className="px-4 py-3">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Tài khoản
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Tài khoản"
                    style={{ width: "100%" }}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Mật khẩu"
                    style={{ width: "100%" }}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={formik.handleSubmit}
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Auth;
