import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search/Search";

const App = () => {
	const onSearchSubmit = (searchTerm) => {
		console.log(searchTerm);
	};

	return (
		<div>
			<Search onSearchSubmit={onSearchSubmit} />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
