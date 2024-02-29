import React from "react";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { Categories, SortPopUp, PizzaBlock } from "../components";
import Skeleton from "../components/Skeleton";
// import { setCategory } from '../redux/actions/filters';

const categoryNames = [
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
const sortItems = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "alphabet" },
];

function Home() {

  const [items, setItems] = React.useState([]);
  const [category, setCategory] = React.useState(0);
  const [isloading, setIsLoading] = React.useState(true);
  window.scrollTo(0, 0);
  React.useEffect(() => {
    axios
      .get("https://65de3e3adccfcd562f56a3ca.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickItem={(index) => setCategory(index)}
          items={categoryNames}
          category={category}
        />
        <SortPopUp items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isloading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items &&
            items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
}

export default Home;
