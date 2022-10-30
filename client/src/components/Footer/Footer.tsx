import "./Footer.scss"
import Logo from "../../assets/logo2.png"
import React from 'react';
import telegram from "../../assets/telegram_icon.png"

const Footer = React.memo(function MyComponent() {
	return (
		<div className="footer">
			<img className="footer__logo" src={Logo} alt="logo" />
			<img className="footer__icon" src={telegram} alt="telegram" />
		</div>
	);
})

export default Footer;
