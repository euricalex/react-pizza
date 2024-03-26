import React from "react";
import qs from "qs";
import { Categories, SortPopUp, PizzaBlock } from "../components";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { SortPropertyEnum, selectFilter, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { sortItems } from "../components/SortPopUp";
import { useAppDispatch } from "../redux/store";


const Home: React.FC = () =>  {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  React.useEffect(() => {
    getPizzas();
  }, [location]); // Пустой массив зависимостей означает, что этот эффект будет вызван только один раз при монтировании компонента

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch( 
 
      fetchPizzas({ search, categoryId: categoryId.toString(), sort: sort.sortProperty, currentPage: currentPage.toString()  }));

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
          sort: sort || { name: "", sortProperty: SortPropertyEnum.RATING_DESC },
          searchValue: "", // Замените пустыми строками, если эти свойства не определены
          categoryId: 0,
          currentPage: 1,
          value: "", // Замените пустой строкой, если это свойство не определено
          
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (isSearch.current) {
      getPizzas();
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

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId}  />
        <SortPopUp />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content-error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
           К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((item: any) => <PizzaBlock key={item.id}  {...item} />)}
        </div>
      )}

      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
