import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;

  }>();
  const { id } = useParams();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://65de3e3adccfcd562f56a3ca.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
      alert('Getting pizzas error');
      }
    }
    fetchPizza();
  }, []);

  if(!pizza) {
    return 'Loading...'
  }
  return (
    <div className="container">
      <img className="full-pizza-img" src={pizza.imageUrl} alt="" />
      <h2>{pizza.name}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At modi
        architecto laboriosam cumque vitae non illum sed aspernatur! Temporibus
        quisquam iusto corrupti tempore ipsa, voluptas mollitia vero vitae iste
        delectus?
      </p>
      <h4>{pizza.price} UA</h4>
    </div>
  );
}

export default FullPizza;
