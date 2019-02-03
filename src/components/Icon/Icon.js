import React from "react";
import propTypes from "prop-types";

import ICONS from "./constants/Icons";

const Icon = props => {
	const styles = {
		svg: {
			display: "inline-block",
			verticalAlign: "middle"
		},
		path: {
			fill: props.color,
			strokeWidth: props.strokeWidth
		}
	};

	const icon = ICONS[props.name]
	const cssClasses = [`Icon Icon--${props.name}`, props.className];

	return (
		<svg className={cssClasses.join(" ")} style={styles.svg} width={`${props.size}px`} height={`${props.size}px`} viewBox="0 0 80 80">
			<path style={styles.path} d={icon} />
		</svg>
	);
};

Icon.propTypes = {
	name: propTypes.string.isRequired,
	size: propTypes.number,
	color: propTypes.string,
	strokeWidth: propTypes.string
};

Icon.defaultProps = {
	size: 16
};

export default Icon;
