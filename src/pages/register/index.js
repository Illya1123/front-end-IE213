import { useFormik } from 'formik';
import './styles.scss';
import Swal from 'sweetalert2';
import http from '../../utils/request';
import { useNavigate } from "react-router-dom";

const Register = () =>{
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: ''
        },
        onSubmit: (values) =>{
            if (
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
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="bg-body rounded p-3">
                <h1 className="text-center">ĐĂNG KÝ TÀI KHOẢN</h1>
                <div className="my-4">
                    <p className="text-center"><i>Nếu chưa có tài khoản vui lòng đăng ký tại đây!</i></p>
                </div>
                <form>
                    <div className="row my-4">
                        <label htmlFor="username" className="col-sm-3 col-form-label">Tài khoản:</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="username" required 
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className="row my-4">
                        <label htmlFor="password" className="col-sm-3 col-form-label">Mật khẩu:</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="password" required 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className="row my-4">
                        <label htmlFor="passwordConfirm" className="col-sm-3 col-form-label">Nhập lại mật khẩu:</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="passwordConfirm" required 
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn" type="none"  style={{ backgroundColor: "var(--bs-primary)", color: "white" }} onClick={formik.handleSubmit}>Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    )    
        
}
export default Register;