import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./Search/Search";
import RecipeCard from "./RecipeCard/RecipeCard";

const API_KEY = "76bad4fc24f14d7dba30f3640dc73941";

const App = () => {
	const [recipes, setRecipes] = useState([]);

	const onSearchSubmit = async (searchTerm) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}`
		);

		setRecipes(response.data.results);
	};

	let recipeArray = [...recipes];
	let recipeIds = [];

	recipeArray.forEach((element) => {
		recipeIds.push(element.id);
	});

	return (
		<div>
			<Search onSearchSubmit={onSearchSubmit} />
			<RecipeCard ids={recipeIds} />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
