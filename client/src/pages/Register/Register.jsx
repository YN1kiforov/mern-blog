import "./Register.scss"
import { useFormik } from 'formik';
import { Link, Navigate } from "react-router-dom";
import * as Yup from 'yup';
import { AuthContext } from "../../AuthContext";
import { useContext, useState } from "react";
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input";

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
const Register = () => {
	const [isSubmit, setIsSubmit] = useState(false)
	const { register, currentUser } = useContext(AuthContext)
	const formik = useFormik({
		initialValues: {
			name: 'Яков',
			email: 'email@mail.ru',
			password: 'password',
		},
		validationSchema: SignupSchema,
		onSubmit: values => {
			setIsSubmit(true)
			register(values)
			setIsSubmit(false)
		},
	});

	return (
		<div className="register">
			{currentUser && (
				<Navigate to="/" replace={true} />
			)}
			<div className='register__wrapper'>
				<h2>Регистрация</h2>
				<form onSubmit={formik.handleSubmit} className='register__form'>
					<div className='register__input-container'>
						<Input style="placeholder" value={formik.values.name} onChange={formik.handleChange} name="name" type="text" placeholder="Имя" />
						<label>{formik.errors.name}</label>

						<Input style="placeholder" value={formik.values.email} onChange={formik.handleChange} name="email" type="email" placeholder="Email" />
						<label>{formik.errors.email}</label>

						<Input style="placeholder" value={formik.values.password} onChange={formik.handleChange} name="password" type="password" placeholder="Пароль" />
						<label>{formik.errors.password}</label>

					</div>
					<Button disabled={isSubmit} type="submit" className=''>Зарегистрироваться</Button>
				</form>
				<p className="register__tip">У вас уже есть аккаунт? <Link to="/login">Войти в аккаунт</Link></p>
			</div>
		</div>
	);
}
export default Register;
