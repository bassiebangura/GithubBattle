import React from "react";


//HOC method implementation of sharing logic
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
				<div
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}
				>
					<Component {...props} />
				</div>
			);
		}
	};
}

//render children method implementation of sharing logic
export class Hover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hovering: false
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
		return (
			<div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
				{this.props.children(this.state.hovering)}
			</div>
		);
	}
}
