import "./Button.scss"

const Button = (props) => {
	const variant = props.variant || "default"
	return <button type={props.type} disabled={props.disabled} className={`${props.className} button__${variant} button`} onClick={props.onClick} >{props.children}</button>
}
export default Button;
