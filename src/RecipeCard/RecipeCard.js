import React from "react";
import "./RecipeCard.css";

const RecipeCard = (props) => {
	const titleArray = [...props.recipes];

	const recipes = titleArray.map((recipe) => {
		return (
			<div className='recipe' key={recipe.title}>
				<img src={recipe.image} className='recipe__image'></img>
				<h2 className='recipe__title'>{recipe.title}</h2>
				<button>Ingedients</button>
				<button>Go to recipe</button>
			</div>
		);
	});

	return <div>{recipes}</div>;
};

export default RecipeCard;
