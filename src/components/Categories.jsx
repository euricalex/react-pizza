import React from "react";
import { setCategoryId } from "../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";


const categoryNames = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];


 const Categories = React.memo(function Categories({    value }) {
  const dispatch = useDispatch();

const onClickCategory = React.useCallback(
  debounce((id) => {
    dispatch(setCategoryId(id))
  }, 50 ), []
 
)
 

  return (
    <div className="categories">
      <ul>
       {categoryNames.map((item, index) => (
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
