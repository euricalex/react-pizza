import React from "react";

 const Categories = React.memo(function Categories({ items, onClickCategory,  value }) {

  return (
    <div className="categories">
      <ul>
       {items.map((item, index) => (
          <li
            className={index === 0 && value === 0 ? 'active' : value === index ? 'active' : null}
            onClick={() => onClickCategory(index)}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
)
export default Categories;
