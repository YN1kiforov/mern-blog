import "./Footer.scss"
import Logo from "../../assets/logo2.png"
import React from 'react';
import telegram from "../../assets/telegram_icon.png"

const Footer = () => {
	return (
		<div className="footer">
			<img className="footer__logo" src={Logo}></img>
			<img className="footer__icon" src={telegram}></img>
			
		</div>
	);
}
export default Footer;
