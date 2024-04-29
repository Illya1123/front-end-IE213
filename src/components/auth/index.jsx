import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import http from "../../utils/request";
import Swal from 'sweetalert2';
const Auth = () => {
  const [username, setUsername] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
        http.post(
            '/auth/login',
            JSON.stringify(values),{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {    
            if (res.statusCode == 201){
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng Nhập thành công!',
                    text: ''
                })
                setUsername(values.username);
            }
        })
    },
  });
  return (
    <>
        {
            username ? (
                <div className="dropdown">
                    <div class="nav-item dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle" style={{fontSize: '1.2em', color: 'var(--bs-primary)'}}></i>
                        <span>{username}</span>
                    </div>
                    <ul class="dropdown-menu">
                        <li onClick={() => setUsername(null)}><a class="dropdown-item" href="#">Đăng xuất</a></li>
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
                      <label forhtml="username" className="form-label">
                        Tài khoản
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="tài khoản"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                    </div>
                    <div className="mb-3">
                      <label forhtml="password" className="form-label">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="mật khẩu"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn "
                      style={{ backgroundColor: "var(--bs-primary)", color: "white" }}
                      onClick={formik.handleSubmit}
                    >
                      Đăng nhập
                    </button>
                  </form>
                </div>
              </div>
              </>
            )
        }
    </>
  );
};

export default Auth;
