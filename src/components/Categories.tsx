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

type CategoriesProps = {
value: number;
getCategories?: (categoryNames: string[]) => void;
}
 const  Categories:React.FC<CategoriesProps> = ({    value, getCategories }) => {
  getCategories?.(categoryNames);
  const dispatch = useDispatch();

const onClickCategory = React.useCallback(
  debounce((id: number) => {
    dispatch(setCategoryId(id))
  }, 50 ), []
 
)
 

  return (
    <div className="categories">
      <ul>
       {categoryNames.map((item, index) => (
          <li
            className={index === 0 && value === 0 ? 'active' : value === index ? 'active' : undefined}
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

export default Categories;
