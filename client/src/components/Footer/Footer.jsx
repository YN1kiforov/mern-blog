import "./Footer.scss"
import Logo from "../../assets/logo2.png"
import React from 'react';
import telegram from "../../assets/telegram_icon.png"

const Footer = React.memo(function MyComponent(props) {
	return (
		<div className="footer">
			<img className="footer__logo" src={Logo} alt="Картинка"></img>
			<img className="footer__icon" src={telegram} alt="Картинка"></img>
		</div>
	);
})

export default Footer;
