import React, { useState } from 'react';
import './Search.css';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')


    return (
        <div className='search'>
            <input type='search' onChange={ e => setSearchTerm(e.target.value) } value={ searchTerm } placeholder="search for a recipe"></input>
        </div>
    )
}

export default Search;