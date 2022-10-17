import "./Button.scss"

const Button = (props) => {
	const type = props.type || "default"
	return <button disabled={props.disabled} className={`${props.className} button__${type} button`} onClick={props.onClick} >{props.children}</button>
}
export default Button;
