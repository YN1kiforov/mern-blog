import "./MultipleSelect.scss"
import React from "react";
import { default as ReactSelect } from "react-select";


const MultipleSelect = ({ ...props }) => {
	const handleChange = (selected: any) => {
		props.setOptionSelected(selected)
	};
	return (
		<span
			className="d-inline-block"
			data-toggle="popover"
			data-trigger="focus"
			data-content="Please selecet account(s)"
		>
			<ReactSelect
				options={props.options}
				isMulti
				closeMenuOnSelect={false}
				hideSelectedOptions={false}
				onChange={handleChange}
				value={props.optionSelected}
			/>
		</span>
	);
}
export default MultipleSelect;
