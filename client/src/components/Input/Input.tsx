import "./Input.scss"
import * as React from 'react';

const Input = ({...props}) => {
	const variant = props.variant
	if (variant === "placeholder") {
		return (
			<div className="user-box">
				<input value={props.value} onChange={props.onChange} type="text" name={props.name} required />
				<label>{props.placeholder}</label>
			</div>
		);
	}
	return (
		<input className={`${props.className} input__default`} value={props.value} onChange={props.onChange} type="text" name={props.name} />
	);

}
export default Input;
