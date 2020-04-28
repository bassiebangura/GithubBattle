const id = "9a624d1ac73ce1039724";
const sec = "6cdb87a5d599e05db170d4d189fd2ff8795ca706";
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMsg(message, username) {
	if (message === "Not found") {
		return `${username} doesn't exist`;
	}

	return message;
}
function getProfile(username) {
	return fetch(`https://api.github.com/users/${username}`)
		.then(res => res.json())
		.then(profile => {
			if (profile.message) {
				throw new Error(getErrorMsg(profile.message, username));
			}
			return profile;
		});
}

function getRepos(username) {
	return fetch(`https://api.github.com/users/${username}/repos`)
		.then(res => res.json())
		.then(repos => {
			if (repos.message) {
				throw new Error(getErrorMsg(repos.message, username));
			}
			return repos;
		});
}
function getStartCount(repos) {
	return repos.reduce(
		(count, { stargazers_count }) => count + stargazers_count,
		0
	);
}

function calculateScore(followers, repos) {
	return followers * 3 + getStartCount(repos);
}

function getUserData(player) {
	return Promise.all([getProfile(player), getRepos(player)]).then(
		([profile, repos]) => {
			return {
				profile,
				score: calculateScore(profile.followers, repos)
			};
		}
	);
}

function sortPlayers(players) {
	return players.sort((a, b) => b.score - a.score);
}
export function battle(players) {
	return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
		results => {
		
			return sortPlayers(results);
		}
	);
}
export function fetchPopularRepos(language) {
	const endpoint = window.encodeURI(
		`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
	);

	return fetch(endpoint)
		.then(res => {
			return res.json();
		})
		.then(data => {
			if (!data.items) {
				throw new Error(data.message);
			}

			return data.items;
		});
}
