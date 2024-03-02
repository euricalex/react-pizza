import React from "react";
import axios from "axios";
import { Categories, SortPopUp, PizzaBlock } from "../components";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";


const categoryNames = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
const sortItems = [
  { name: "популярности", sortProperty: "popular" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

function Home() {
  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isloading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sort, setSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating'
  });



  window.scrollTo(0, 0);
  React.useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}`: '';
    axios.get
    (`https://65de3e3adccfcd562f56a3ca.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}&`: ''}&sortby=${sort.sortProperty}&order=asc${search}`  )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      }).catch((err) => console.error(err, 'No Pizzas'))
    
  
  }, [categoryId, sort, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
        onClickCategory={(index) => setCategoryId(index)}
        value= {categoryId}
          items={categoryNames}
         
        />
        <SortPopUp 
          onClickSort={(index) => setSort(index)}
          value = {sort}
        items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isloading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
<Pagination onChangePage= {num => setCurrentPage(num)}/>
    </div>
  );
}

export default Home;
