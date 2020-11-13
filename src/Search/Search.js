import React, { useState } from "react";
import "./Search.css";

const Search = (props) => {
	const [searchTerm, setSearchTerm] = useState("");

	const onFormSubmit = (e) => {
		e.preventDefault();
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
