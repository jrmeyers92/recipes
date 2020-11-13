import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./Search/Search";

const API_KEY = "76bad4fc24f14d7dba30f3640dc73941";

const App = () => {
	const onSearchSubmit = (searchTerm) => {
		axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}`
		);
	};

	return (
		<div>
			<Search onSearchSubmit={onSearchSubmit} />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
