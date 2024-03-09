import React from "react";
import axios from "axios";
import qs from "qs";
import { Categories, SortPopUp, PizzaBlock } from "../components";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { setPizzas } from "../redux/slices/pizzasSlice";
import { useNavigate } from "react-router-dom";
import { sortItems } from "../components/SortPopUp";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const items = useSelector((state) => state.pizzas.items);

  const [isloading, setIsLoading] = React.useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://65de3e3adccfcd562f56a3ca.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}&` : ""
        }&sortby=${sort.sortProperty}&order=asc${search}`
      )
      .then((res) => {
        dispatch(setPizzas(res.data));
        setIsLoading(false);
      })
      .catch((err) => console.error(err, "No Pizzas"));
  };
// Парсим параметры при первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find(
        (item) => item.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (isSearch.current) {
      fetchPizzas();
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
// Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (!isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} />
        <SortPopUp />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isloading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
}

export default Home;