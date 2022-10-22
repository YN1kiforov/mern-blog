import "./Login.scss"
import { Link, Navigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";

import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input";
const SignupSchema = Yup.object().shape({

	email: Yup.string().email('Invalid email').required('Обязательно'),
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
						<Input variant="placeholder" value={formik.values.email} onChange={formik.handleChange} name="email" type="email" placeholder="Email" />
						<label>{formik.errors.email}</label>

						<Input variant="placeholder" value={formik.values.password} onChange={formik.handleChange} name="password" type="password" placeholder="Пароль" />
						<label>{formik.errors.password}</label>

					</div>
					<Button disabled={isSubmit} type="submit">Войти в аккаунт</Button>
				</form>
				<p className="login__tip">У вас ещё нет аккаунта?  <Link to="/register">Зарегистрируйся</Link></p>
			</div>
		</div>
	);
}
export default Login;
