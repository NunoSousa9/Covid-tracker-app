import React from "react";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="search-box" style={{width: "80%", margin: "0 auto"}}>
            <input 
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{width: "100%"}}
            />
        </div>
    );
};

export default SearchBox;