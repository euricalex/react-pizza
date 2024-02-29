import React, { useState } from "react";

 const Categories = React.memo(function Categories({ items, onClickItem }) {
  const [activeItem, setActiveItem] = useState(null);
  function onSelectItem(index) {
    setActiveItem(index);
    onClickItem(index);
  }

  return (
    <div className="categories">
      <ul>
        <li
          className={activeItem === null ? "active" : null}
          onClick={() => onSelectItem(null)}
        >
          Все
        </li>
        {items.map((item, index) => (
          <li
            className={activeItem === index ? "active" : null}
            onClick={() => onSelectItem(index)}
            key={`${item}-${index}`}
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
// class Categories extends React.Component {
//     state = {
//         activeItem: 0,
//     }
//     onSelectItem = index => {
//         this.setState({
//             activeItem: index
//         })
//     }
//  render() {
//         const {items, onClickItem} = this.props
//         return (

//             <div className="categories">
//             <ul>
//               <li>Все</li>
//             {items.map((item, index) =>
//               <li className={this.state.activeItem === index ? 'active' : ''}
//               onClick={() => this.onSelectItem(index)}
//               key={`${item}-${index}`}>{item}</li>)}

//             </ul>

//             </div>
//             )

//     }
// }
