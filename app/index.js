import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/battle";
import Nav from "./components/nav";
import { ThemeProvider } from "./contexts/theme";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: "light",
			toggleTheme: () => {
				this.setState(({ theme }) => ({
					theme: theme === "light" ? "dark" : "light"
				}));
			}
		};
	}
	render() {
		return (
			<ThemeProvider value={this.state}>
				<div className={this.state.theme}> 
					<div className="container">
						<Nav />
						{/* <Battle /> */}
						<Popular />
					</div>
				</div>
			</ThemeProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
