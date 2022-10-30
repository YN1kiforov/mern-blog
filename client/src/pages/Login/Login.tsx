import "./Login.scss"
import { Link, Navigate } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useSelector } from 'react-redux'
import { login } from "../../redux/slices/auth";
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input";
import { useSnackbar } from 'notistack';
import { RootState } from "../../redux/store"
import React from 'react'
import { useAppDispatch } from "../../hooks/reduxHooks";
type MyFormValues = {
	email: string,
	password: string,
}
const SignupSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Обязательно'),
	password: Yup.string()
		.min(2, 'Минимум 2 символа!')
		.max(30, 'Максимум 30 символов!')
		.required('Обязательно'),
});

const Login = () => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const [isSubmit, setIsSubmit] = useState<boolean>(false)
	const initialValues: MyFormValues = { email: 'email@mail.ru', password: 'password' }
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)

	return (
		<div className="login">
			{currentUser && (
				<Navigate to="/" replace={true} />
			)}
			<div className='login__wrapper'>
				<h2>Войти в аккаунт</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={SignupSchema}
					onSubmit={(values) => {
						setIsSubmit(true)
						dispatch(login(values))
							.then(res => res.payload
								? enqueueSnackbar('Добро пожаловать', { autoHideDuration: 1500, variant: 'success', })
								: enqueueSnackbar('Неверный логин или пароль', { autoHideDuration: 1500, variant: 'error', })
							)
							.finally(() => {
								setIsSubmit(false)
							})
					}}>
					{props => (
						<form onSubmit={props.handleSubmit} className='login__form'>
							<div className='login__input-container'>
								<Input variant="placeholder" value={props.values.email} onChange={props.handleChange} name="email" type="email" placeholder="Email" />
								<label>{props.errors.email}</label>
								<Input variant="placeholder" value={props.values.password} onChange={props.handleChange} name="password" type="password" placeholder="Пароль" />
								<label>{props.errors.password}</label>
							</div>
							<Button disabled={isSubmit} type="submit">Войти в аккаунт</Button>
						</form>
					)}
				</Formik>
				<p className="login__tip">У вас ещё нет аккаунта?  <Link to="/register">Зарегистрируйся</Link></p>
			</div>
		</div>
	);
}
export default Login;
