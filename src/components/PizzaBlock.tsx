import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, addItem, cartItemSelectorById } from "../redux/slices/CartSlice";
import { Link } from "react-router-dom";

type PizzaPlockProps = {
  id: string;
  name: string;
  imageUrl: string;
  types: number[];
  category: number;
  sizes: number[];
  price: number;
  rating: number;
};

const PizzaBlock: React.FC<PizzaPlockProps> = ({
  id,
  name,
  imageUrl,
  types,
  sizes,
  price,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(cartItemSelectorById(id));
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const availableTypes = ["тонкое", "традиционное"];
  const availableSizes = [26, 30, 40];
  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      type: availableTypes[activeType],
      size: sizes[activeSize],
      count: 0
    };
    dispatch(addItem(item));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {availableTypes.map((type, index) => (
              <li
                key={type}
                onClick={() => setActiveType(index)}
                className={classNames({
                  active: activeType === index,
                  disabled: !types.includes(index),
                })}
              >
                {type}
              </li>
            ))}
          </ul>
          <ul>
            {availableSizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={classNames({
                  active: activeSize === index,
                  disabled: !sizes.includes(size),
                })}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price"> oт {price} грн</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
