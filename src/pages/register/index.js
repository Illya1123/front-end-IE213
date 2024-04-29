import { useFormik } from 'formik';
import './styles.scss';
import Swal from 'sweetalert2';
import http from '../../utils/request';
import { useNavigate } from "react-router-dom";

const Register = () =>{
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
            passwordConfirm: ''
        },
        onSubmit: (values) =>{
            if (
                values.name === "" ||
                values.username === "" ||
                values.password === "" ||
                values.passwordConfirm === ""
            ){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Bạn chưa điền đủ thông tin!',
                  })
                return;
            }
            if (values.password !== values.passwordConfirm){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mật khẩu không trùng khớp!',
                  })
                return;
            }

            http.post(
                '/auth/register',
                JSON.stringify(values),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((res) => {
                console.log(res);
                if (res.statusCode === 201){
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng ký thành công!',
                        text: ''
                      })
                    navigate('/home');
                }
            })
        }
    })
    return(
    <>
        <div className="container">
            <div className="bg-body rounded p-3">
                <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
                <div className="my-4">
                    <p>Nếu chưa có tài khoản vui lòng đăng ký tại đây!</p>
                </div>
                <form className="row">
                    <div className="col-md-6">
                        <label forhtml="name" className="form-label">Họ tên</label>
                        <input type="text" className="form-control" id="name" required
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <label forhtml="username" className="form-label">Tài khoản</label>
                        <input type="text" className="form-control" id="username" required
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <label forhtml="password" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control" id="password" required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <label forhtml="passwordConfirm" className="form-label">Nhập lại mật khẩu</label>
                        <input type="password" className="form-control" id="passwordConfirm" required
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                        ></input>
                    </div>
                    <div className="col-12 mt-4">
                        
                        <button className="btn" type="none"  style={{ backgroundColor: "var(--bs-primary)", color: "white" }} onClick={formik.handleSubmit}>Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}
export default Register;