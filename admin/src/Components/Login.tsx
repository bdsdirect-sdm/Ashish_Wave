import './login.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const Login = () => {
    const verifyData = (values: { email: string; password: string }) => {
        // Handle login logic here
        // console.log('Form submitted with values:', values);
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const Formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            verifyData(values);
        },
    });


  return (
    <><div id="login-page">
    <div id="login-form">
        <div id="login-header">
            <h5>SIGNIN FORM</h5>
            <h1>Login</h1>
        </div>
        <form
            id="login-details-container"
            onSubmit={Formik.handleSubmit}
        >
            <label htmlFor="email" className="input-labels">
                Email <em className="star">*</em>
            </label>
            <br />
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                value={Formik.values.email}
            />
            <br />
            {Formik.errors.email && Formik.touched.email ? (
                <p className="form-errors">{Formik.errors.email}</p>
            ) : null}
            <label htmlFor="password" className="input-labels">
                Password <em className="star">*</em>
            </label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                value={Formik.values.password}
            />
            <br />
            {Formik.errors.password && Formik.touched.password ? (
                <p className="form-errors">{Formik.errors.password}</p>
            ) : null}

            <button type="submit" id="login-btn">
                Login
            </button>
            <p id="register-paragraph">
                Don't have an account?&nbsp;
                {/* <Link to="/" id="register-link">
                    Register
                </Link> */}
            </p>
        </form>
    </div>
    {/* <ToastContainer /> */}
</div></>
  )
}

export default Login