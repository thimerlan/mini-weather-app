import React, { useState } from "react";
import "./SearchBox.scss";
const SearchBox = ({ setSearch, search, query, onClickTo }) => {
  const [searchValue, setSearchValue] = useState(false);
  return (
    <div className="searchBox">
      <div className="searchContent">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          onKeyUp={query}
          placeholder=" Weather In Your City"
          type="text"
        />
        <img
          onClick={() => {
            onClickTo();
          }}
          className="searchImg"
          src="http://cdn.onlinewebfonts.com/svg/img_503691.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default SearchBox;
