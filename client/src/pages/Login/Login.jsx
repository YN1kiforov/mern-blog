import "./Login.scss"
import { Link, Navigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from "react";

import { AuthContext } from "../../AuthContext";
const SignupSchema = Yup.object().shape({

	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(2, 'Минимум 2 символа!')
		.max(30, 'Максимум 30 символов!')
		.required('Обязательно'),
});

const Login = () => {
	const { login, currentUser } = useContext(AuthContext)
	const [isSubmit, setIsSubmit] = useState(false)

	const formik = useFormik({
		initialValues: {
			email: 'email@mail.ru',
			password: 'password',
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			setIsSubmit(true)
			login(values)
			setIsSubmit(false)
		}
	});


	return (
		<div className="login">
			{currentUser && (
				<Navigate to="/" replace={true} />
			)}
			<div className='login__wrapper'>
				<h2>Войти в аккаунт</h2>
				<form onSubmit={formik.handleSubmit} className='login__form'>
					<div className='login__input-container'>
						<input value={formik.values.email} onChange={formik.handleChange} name="email" type="email" placeholder="Email" className=''></input>
						<label>{formik.errors.email}</label>
						<input value={formik.values.password} onChange={formik.handleChange} name="password" type="password" placeholder="Пароль" className=''></input>
						<label>{formik.errors.password}</label>

					</div>
					<button disabled={isSubmit} type="submit" className=''>Войти в аккаунт</button>
				</form>
				<p className="login__tip">У вас ещё нет аккаунта?  <Link to="/register">Зарегистрируйся</Link></p>
			</div>
		</div>
	);
}
export default Login;
