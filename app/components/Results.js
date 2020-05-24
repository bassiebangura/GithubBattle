import React, { useState, useReducer, useEffect } from "react";

import { battle } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";
import queryString from "query-string";
import {
	FaCompass,
	FaBriefcase,
	FaUsers,
	FaUserFriends,
	FaCode,
	FaUser,
} from "react-icons/fa";
import PropTypes from "prop-types";

function ProfileList({ profile }) {
	return (
		<ul className="card-list">
			<li>
				<FaUser color="rgb(239, 115, 115)" size={22} />
				{profile.name}
			</li>

			<li>
				<Tooltip text="User's location">
					<FaCompass color="rgb(144, 115, 255)" size={22} />
					{profile.location}
				</Tooltip>
			</li>

			<li>
				<Tooltip text="User's Company">
					<FaBriefcase color="#795548" size={22} />
					{profile.company}
				</Tooltip>
			</li>

			<li>
				<FaUsers color="rgb(129, 195, 245)" size={22} />
				{profile.followers.toLocaleString()} followers
			</li>
			<li>
				<FaUsers color="rgb(64, 183, 95)" size={22} />
				{profile.following.toLocaleString()} following
			</li>
		</ul>
	);
}

ProfileList.propTypes = {
	profile: PropTypes.object.isRequired,
};

const resultsReducer = (state, { type, payload }) => {
	if (type === "success") {
		return {
			...state,
			winner: payload[0],
			loser: payload[1],
			loading: false,
		};
	} else if (type === "error") {
		return {
			...state,
			loading: false,
			error: payload,
		};
	} else {
		throw error("Action type no defined");
	}
};
export default function Results(players) {
	const initialState = {
		winner: null,
		loser: null,
		loading: true,
		error: null,
	};
	const [state, dispatch] = useReducer(resultsReducer, initialState);
	const { playerOne, playerTwo } = queryString.parse(players.location.search);

	useEffect(() => {
		battle([playerOne, playerTwo])
			.then((players) => {
				dispatch({ type: "success", payload: players });
			})
			.catch(({ message }) => {
				dispatch({ type: "error", payload: message });
			});
	}, [playerOne, playerTwo]);
	const { winner, loser, loading, error } = state;

	if (loading === true) {
		return <Loading text="Battle Is On" />;
	}

	if (error) {
		return <p className="center-text error">{error}</p>;
	}

	return (
		<React.Fragment>
			<div className="grid space-around container-sm">
				<Card
					header={winner.score === loser.score ? "Tie" : "Winner"}
					subheader={`Score ${winner.score.toLocaleString()}`}
					avatar={winner.profile.avatar_url}
					href={winner.profile.html_url}
					name={winner.profile.login}
				>
					<ProfileList profile={winner.profile} />
				</Card>

				<Card
					header={winner.score === loser.score ? "Tie" : "Loser"}
					subheader={`Score ${loser.score.toLocaleString()}`}
					avatar={loser.profile.avatar_url}
					href={loser.profile.html_url}
					name={loser.profile.login}
				>
					<ProfileList profile={loser.profile} />
				</Card>
			</div>
			<Link to="/battle" className="btn dark-btn btn-space">
				Reset
			</Link>
		</React.Fragment>
	);
}

// export default class Results extends React.Component {
// 	state = {
// 		winner: null,
// 		loser: null,
// 		loading: true,
// 		error: null,
// 	};

// 	componentDidMount() {
// 		const { playerOne, playerTwo } = queryString.parse(
// 			this.props.location.search
// 		);

// 		battle([playerOne, playerTwo])
// 			.then((players) => {
// 				this.setState({
// 					winner: players[0],
// 					loser: players[1],
// 					error: null,
// 					loading: false,
// 				});
// 			})
// 			.catch(({ message }) => {
// 				this.setState({
// 					error: message,
// 					loading: false,
// 				});
// 			});
// 	}
// 	render() {
// 		const { winner, loser, loading, error } = this.state;

// 		if (loading === true) {
// 			return <Loading text="Battle Is On" />;
// 		}

// 		if (error) {
// 			return <p className="center-text error">{error}</p>;
// 		}
// 		return (
// 			<React.Fragment>
// 				<div className="grid space-around container-sm">
// 					<Card
// 						header={winner.score === loser.score ? "Tie" : "Winner"}
// 						subheader={`Score ${winner.score.toLocaleString()}`}
// 						avatar={winner.profile.avatar_url}
// 						href={winner.profile.html_url}
// 						name={winner.profile.login}
// 					>
// 						<ProfileList profile={winner.profile} />
// 					</Card>

// 					<Card
// 						header={winner.score === loser.score ? "Tie" : "Loser"}
// 						subheader={`Score ${loser.score.toLocaleString()}`}
// 						avatar={loser.profile.avatar_url}
// 						href={loser.profile.html_url}
// 						name={loser.profile.login}
// 					>
// 						<ProfileList profile={loser.profile} />
// 					</Card>
// 				</div>
// 				<Link to="/battle" className="btn dark-btn btn-space">
// 					Reset
// 				</Link>
// 			</React.Fragment>
// 		);
// 	}
// }
