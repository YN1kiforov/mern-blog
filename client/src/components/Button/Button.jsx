import "./Button.scss"

const Button = (props) => {
	const style = props.style || "default"
	return <button type={props.type} disabled={props.disabled} className={`${props.className} button__${style} button`} onClick={props.onClick} >{props.children}</button>
}
export default Button;
