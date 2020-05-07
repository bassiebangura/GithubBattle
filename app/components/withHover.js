import React from "react";

export default function withHover(Component, propName = "hovering") {
	return class WithHover extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				[propName]: false
			};
			this.handleMouseOver = this.handleMouseOver.bind(this);
			this.handleMouseOut = this.handleMouseOut.bind(this);
		}
		handleMouseOut() {
			this.setState({ hovering: false });
		}
		handleMouseOver() {
			this.setState({ hovering: true });
		}
		render() {
			const props = {
                ...this.props,
                
				[propName]: this.state.hovering
			};
			return (
				<div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
					<Component {...props} />
                   
				</div>
			);
		}
	};
}
