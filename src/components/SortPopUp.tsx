import React from "react";
import { SortPropertyEnum, selectSort, setSort } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}


export const sortItems: SortItem[] = [
  { name: "популярности", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "цене", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту", sortProperty: SortPropertyEnum.NAME_DESC },
];


const SortPopUp: React.FC = () =>  {
  const [viseblePopUp, setVisiblePopUp] = React.useState(false);
const dispatch = useDispatch();
const sorting = useSelector(selectSort);




  const sortRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside:  EventListener = (e) => {
      if(sortRef.current && !sortRef.current.contains(e.target as HTMLElement)) {
        setVisiblePopUp(false);
      }
   
     }
     document.body.addEventListener('click', handleClickOutside);
     return () => {
      document.body.removeEventListener('click', handleClickOutside)
     }
  }, [])
 
  

  return (
    <div ref={sortRef}  className="sort">
      <div className="sort__label">
        <svg
          className={viseblePopUp ? "rotated" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisiblePopUp(!viseblePopUp)}>{sorting && sorting.name}</span>
      </div>
      {viseblePopUp && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((item, index) => (
              <li
                onClick={() => {
                  dispatch(setSort(item));
                  setVisiblePopUp(false);
                }}
                className={
                  sorting.sortProperty === sortItems[index].sortProperty ? "active" : undefined
                }
                key={index}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default SortPopUp;
