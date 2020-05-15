import React, { useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext, { ThemeConsumer } from "../contexts/theme";
export default function Card({
	children,
	header,
	subheader,
	avatar,
	href,
	name
}) {
	const theme = useContext(ThemeContext);

	return (
		<div className={`card bg-${theme}`}>
			<h4 className="header-lg center-text">{header}</h4>
			<img className="avatar" src={avatar} alt={`Avarta for ${name}`} />
			{subheader && <h4 className="center-text">Score: {subheader}</h4>}
			<h2 className="center-text">
				<a className="link" href={href}>
					{name}
				</a>
			</h2>
			{children}
		</div>
	);
}

Card.propTypes = {
	header: PropTypes.string.isRequired,
	subheader: PropTypes.string,
	avatar: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired
};
