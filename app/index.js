import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
// import Popular from "./components/Popular";
// import Battle from "./components/Battle";
// import Results from "./components/Results";
import NoMatch from "./components/NoMatch";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import { ThemeProvider } from "./contexts/theme";

const LazyBattle = React.lazy(() => import("./components/Battle"));
const LazyResults = React.lazy(() => import("./components/Results"));
const LazyPopular = React.lazy(() => import("./components/Popular"));

class App extends Component {
	state = {
		theme: "light",
		toggleTheme: () => {
			this.setState(({ theme }) => ({
				theme: theme === "light" ? "dark" : "light"
			}));
		}
	};

	render() {
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className="container">
							<Nav />
							<Switch>
								<React.Suspense fallback={<Loading text="Loading" />}>
									<Route exact path="/" component={LazyPopular} />
									<Route exact path="/battle" component={LazyBattle} />
									<Route exact path="/battle/results" component={LazyResults} />
								</React.Suspense>

								<Route component={NoMatch} />
							</Switch>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
