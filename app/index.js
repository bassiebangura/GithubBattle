import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";

import NoMatch from "./components/NoMatch";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import { ThemeProvider } from "./contexts/theme";

const LazyBattle = React.lazy(() => import("./components/Battle"));
const LazyResults = React.lazy(() => import("./components/Results"));
const LazyPopular = React.lazy(() => import("./components/Popular"));

function App() {
	const [theme, setTheme] = useState("light");
	const toggleTheme = () =>
		setTheme(theme => (theme === "light" ? "dark" : "light"));

	return (
		<Router>
			<ThemeProvider value={theme}>
				<div className={theme}>
					<div className="container">
						<Nav toggleTheme={toggleTheme} />
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

ReactDOM.render(<App />, document.getElementById("app"));
