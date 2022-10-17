import "./Input.scss"

const Input = (props) => {
	const type = props.style
	if (type == "placeholder") {
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
