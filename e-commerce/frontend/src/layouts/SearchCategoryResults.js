import React from "react";
import { Link } from "react-router-dom";

const SearchCategoryResults = ({ results }) => {
    return (
        <div>
            <ul className="list-group">
                {results.map(category => (
                    <li key={category.id} className="list-group-item">
                        <Link to={`/product-detail?productId=${category.id}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchCategoryResults;
