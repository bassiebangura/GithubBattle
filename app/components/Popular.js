import React, {useState, useEffect, useReducer, useRef} from "react";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api.js";
import {
	FaUser,
	FaStar,
	FaCodeBranch,
	FaExclamationTriangle
} from "react-icons/fa";

function LanguageNav({ selected, onUpdateLanguage }) {
	const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
	return (
		<ul className="flex-center">
			{languages.map(language => (
				<li key={language}>
					<button
						className="btn-clear nav-link"
						style={language === selected ? { color: "rgb(187,46,31" } : null}
						onClick={() => onUpdateLanguage(language)}
					>
						{language}
					</button>
				</li>
			))}
		</ul>
	);
}

LanguageNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func
};

function ReposGrid({ repos }) {
	return (
		<ul className="grid space-around">
			{repos.map((repo, index) => {
				const {
					name,
					owner,
					html_url,
					stargazers_count,
					forks,
					open_issues
				} = repo;
				const { login, avatar_url } = owner;
				return (
					<li key={html_url}>
						<Card
							header={`#${index + 1}`}
							avatar={avatar_url}
							name={login}
							href={html_url}
						>
							<ul className="card-list">
								<li>
									<Tooltip text="Github Username">
										<FaUser color="rgb(255, , 116)" size={22} />
										<a href={`https://github.com/${login}`}>{login}</a>
									</Tooltip>
								</li>
								<li>
									<FaStar color="rgb(255,215,0)" size={22} />
									{stargazers_count.toLocaleString()} stars
								</li>
								<li>
									<FaCodeBranch color="rgb(129, 195, 245)" size={22} />
									{forks.toLocaleString()} stars
								</li>
								<li>
									<FaExclamationTriangle color="rgb(241,138,147)" size={22} />
									{open_issues.toLocaleString()}
								</li>
							</ul>
						</Card>
					</li>
				);
			})}
		</ul>
	);
}

ReposGrid.propTypes = {
	repos: PropTypes.array.isRequired
};

const reducer = (state, {type, payload}) => {
	if (type === 'addRepos') {
		
		return ({
			...state,
			repos: {...state.repos, ...payload.repos},
			error: payload.error

		})
	} else if (type === "error") {
		return ({
			...state,
			error: payload
		})
	} 

}
export default function Popular() {
	const [selectedLanguage, setSelectedLanguage] = useState("All") 
	const initialState = {error: null, repos: {}}
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
			
		if (!state.repos[selectedLanguage]) {
			
			fetchPopularRepos(selectedLanguage)
				.then(data => {
					
					dispatch({type: "addRepos", payload: {repos: {[selectedLanguage]:data}, error: false}})
				
				})
				.catch((error) => {
					console.warn("Error fetching repos:", error);

					dispatch({
						type: "error",
						payload: "There was an error fetching the repositories."
					});
			
				});
		} 
	}, [selectedLanguage])

	const isLoading = () => {
	
	return state.repos[selectedLanguage] && state.error === null;
	};
	return (
		<React.Fragment>
			<LanguageNav
				selected={selectedLanguage}
				onUpdateLanguage={setSelectedLanguage}
			/>
			{isLoading() && <Loading text="Fetching Repos" />}
			{state.error && <p className="error center-text">{state.error}</p>}
			{state.repos[selectedLanguage] && <ReposGrid repos={state.repos[selectedLanguage]} />}
		</React.Fragment>
	);
}
// export default class Popular extends React.Component {
// 	state = {
// 		selectedLanguage: "All",
// 		error: null,
// 		repos: {}
// 	};

// 	componentDidMount() {
// 		this.updateLanguage(this.state.selectedLanguage);
// 	}

// 	updateLanguage = selectedLanguage => {
// 		this.setState({
// 			selectedLanguage,
// 			error: null
// 		});

// 		if (!this.state.repos[selectedLanguage]) {
// 			fetchPopularRepos(selectedLanguage)
// 				.then(data => {
// 					this.setState(({ repos }) => ({
// 						repos: {
// 							...repos,
// 							[selectedLanguage]: data
// 						}
// 					}));
// 				})
// 				.catch(() => {
// 					console.warn("Error fetching repos:", error);

// 					this.setState({
// 						error: "There was an error fetching the repositories."
// 					});
// 				});
// 		}
// 	};

// 	isLoading = () => {
// 		const { selectedLanguage, repos, error } = this.state;
// 		return !repos[selectedLanguage] && error === null;
// 	};

// 	render() {
// 		const { selectedLanguage, repos, error } = this.state;
// 		return (
// 			<React.Fragment>
// 				<LanguageNav
// 					selected={selectedLanguage}
// 					onUpdateLanguage={this.updateLanguage}
// 				/>
// 				{this.isLoading() && <Loading text="Fetching Repos" />}
// 				{error && <p className="error center-text">{error}</p>}
// 				{repos[selectedLanguage] && (
// 					<ReposGrid repos={repos[selectedLanguage]} />
// 				)}
// 			</React.Fragment>
// 		);
// 	}
// }
