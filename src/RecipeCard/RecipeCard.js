import React from "react";

const RecipeCard = (props) => {
	const titleArray = [...props.recipes];

	const recipes = titleArray.map((recipe) => {
		return <h2 key={recipe.title}>{recipe.title}</h2>;
	});

	return <div>{recipes}</div>;
};

export default RecipeCard;
