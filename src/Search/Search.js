import React, { useState } from "react";
import "./Search.css";

const Search = (props) => {
	const API_KEY = "76bad4fc24f14d7dba30f3640dc73941";
	const [searchTerm, setSearchTerm] = useState("");

	const onFormSubmit = (e) => {
		e.preventDefault();

		props.onSearchSubmit(searchTerm);
	};

	return (
		<div className='search'>
			<form onSubmit={onFormSubmit}>
				<input
					type='search'
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
					placeholder='search for a recipe'></input>
			</form>
		</div>
	);
};

export default Search;
