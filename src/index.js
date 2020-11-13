import React from "react";
import ReactDOM from 'react-dom';
import Search from "./Search/Search";

const App = () => {
    return (
        <div>
            <Search />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))