import "./Register.scss"
import { Formik } from 'formik';
import { Link, Navigate } from "react-router-dom";
import * as Yup from 'yup';
import { useState } from "react";
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input";
import { register } from "../../redux/slices/auth";
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import React from 'react'
import { RootState } from "../../redux/store"
import { useAppDispatch } from "../../hooks/reduxHooks";

const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Минимум 2 символа!')
		.max(30, 'Максимум 30 символов!')
		.required('Обязательно'),
	email: Yup.string().email('Invalid email').required('Обязательно'),
	password: Yup.string()
		.min(2, 'Минимум 2 символа!')
		.max(30, 'Максимум 30 символов!')
		.required('Обязательно'),
});
interface MyFormValues {
	email: string,
	password: string,
	name: string,
}
const Register = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)
	const { enqueueSnackbar } = useSnackbar();
	const [isSubmit, setIsSubmit] = useState<boolean>(false)
	const initialValues: MyFormValues = { email: 'email@mail.ru', password: 'password', name: "Яков" }

	return (
		<div className="register">
			{currentUser && (
				<Navigate to="/" replace={true} />
			)}
			<div className='register__wrapper'>
				<h2>Регистрация</h2>
				<Formik
					validationSchema={SignupSchema}
					initialValues={initialValues}
					onSubmit={(values) => {
						setIsSubmit(true)
						dispatch(register(values))
							.then(res => res.payload
								? enqueueSnackbar('Добро пожаловать', { autoHideDuration: 1500, variant: 'success', })
								: enqueueSnackbar('Неверный логин или пароль', { autoHideDuration: 1500, variant: 'error', })
							)
							.finally(() => {
								setIsSubmit(false)
							})
					}}>
					{props => (
						<form onSubmit={props.handleSubmit} className='register__form'>
							<div className='register__input-container'>
								<Input variant="placeholder" value={props.values.name} onChange={props.handleChange} name="name" type="text" placeholder="Имя" />
								<label>{props.errors.name}</label>

								<Input variant="placeholder" value={props.values.email} onChange={props.handleChange} name="email" type="email" placeholder="Email" />
								<label>{props.errors.email}</label>

								<Input variant="placeholder" value={props.values.password} onChange={props.handleChange} name="password" type="password" placeholder="Пароль" />
								<label>{props.errors.password}</label>

							</div>
							<Button disabled={isSubmit} type="submit" className=''>Зарегистрироваться</Button>
						</form>
					)}
				</Formik>
				<p className="register__tip">У вас уже есть аккаунт? <Link to="/login">Войти в аккаунт</Link></p>
			</div>
		</div>
	);
}
export default Register;
