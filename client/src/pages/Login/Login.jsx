import "./Login.scss"
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="login">
			<div className='login__wrapper'>
				<h2>Войти в аккаунт</h2>
				<form className='login__form'>
					<div className='login__input-container'>
						<input required type="email" placeholder="Email" className=''></input>
						<input required type="password" placeholder="Пароль" className=''></input>

					</div>
					<button className=''>Войти в аккаунт</button>
				</form>
				<p className="login__tip">У вас ещё нет аккаунта?  <Link to="/register">Зарегистрируйся</Link></p>
			</div>
		</div>
	);
}
export default Login;
