import "./Register.scss"
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div className="registr">
			<div className='registr__wrapper'>
				<h2>Регистрация</h2>
				<form className='registr__form'>
					<div className='registr__input-container'>
						<input required type="text" placeholder="Имя" className=''></input>
						<input required type="email" placeholder="Email" className=''></input>
						<input required type="password" placeholder="Пароль" className=''></input>
					</div>
					<button className=''>Зарегистрироваться</button>
				</form>
				<p className="registr__tip">У вас уже есть аккаунт? <Link to="/login">Войти в аккаунт</Link></p>
			</div>
		</div>
	);
}
export default Register;
