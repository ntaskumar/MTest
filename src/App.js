import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab, Paper, Typography } from "@mui/material";
import "./index.css";
import Header from "../src/components/Header";
import rimage from "../src/components/images/red.png"
import gimage from "../src/components/images/green.png"
import { useCart } from '../src/components/context/CartProvider';

const App = ({ dish }) => {
  const [menuData, setMenuData] = useState([]);
  const [menuTabs, setMenuTabs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [allquantity, setAllquantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { addToCart, removeFromCart, cartQtd } = useCart();

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89")
      .then((response) => {
        console.log("API Response:", response.data);
        setMenuData(response.data.data);
        const uniqueCategories = Array.from(
          new Set(
            response.data.data.flatMap((item) =>
              item.table_menu_list.map((menuItem) => menuItem.menu_category)
            )
          )
        );
        setMenuTabs(uniqueCategories);
        setSelectedCategory(uniqueCategories[0]);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  const toSentenceCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  function toggleCount() {
    setCount((prevCount) => (prevCount % 2 === 0 ? prevCount + 1 : prevCount - 1));
  }

  const handleIncrement = (dish, increment) => {
    addToCart(dish);
  };

  const handleDecrement = (dish) => {
    removeFromCart(dish);
  };

  return (
    <div>
      <Header />
      <Paper>
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ backgroundColor: 'black' }}
        >
          {menuTabs.map((category) => (
            <Tab
              key={category}
              label={
                <Typography style={{ color: selectedCategory === category ? 'red' : 'white', textTransform: 'none', fontSize: '14px' }}>
                  {toSentenceCase(category)}
                </Typography>
              }
              value={category}
              sx={{ backgroundColor: 'black' }}
            />
          ))}
        </Tabs>
      </Paper>
      <div id="menuContent" style={{ marginLeft: '330px', marginTop: '40px' }}>
        {selectedCategory && (
          <div className="tab" id={selectedCategory}>
            {menuData
              .flatMap((item) =>
                item.table_menu_list
                  .filter((menuItem) => menuItem.menu_category === selectedCategory)
                  .map((menuItem) => menuItem.category_dishes)
              )
              .map((dishList, categoryIndex) =>
                dishList.map((dish, dishIndex) => (
                  <div key={`${categoryIndex}-${dishIndex}`} className="dish-item">
                    <div className="dish-details">
                      <Typography variant="h6" style={{ color: 'white', fontSize: '13px', fontFamily: 'Arial', display: 'flex', alignItems: 'center' }}>
                        {(categoryIndex + dishIndex) % 2 === 0 ? <img src={gimage} style={{ width: '18px', height: '18px', marginRight: '5px' }} /> : <img src={rimage} style={{ width: '18px', height: '18px', marginRight: '5px' }} />}
                        {dish.dish_name}
                      </Typography>
                      <Typography style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                        <span>{dish.dish_currency} {dish.dish_price}</span>
                        <span style={{ color: 'white', fontSize: 'small', marginRight: '10px' }}>{dish.dish_calories} Calories</span>
                      </Typography>
                      <Typography style={{ color: 'grey', fontSize: '11px', fontFamily: 'Times New Roman, serif' }}>
                        {dish.dish_description}
                      </Typography>
                      <br />
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          const buttonWidth = e.currentTarget.offsetWidth;
                          const clickPosition = e.clientX - e.currentTarget.getBoundingClientRect().left;
                          if (clickPosition < buttonWidth / 2) {
                            setQuantity((prevQuantity) => {
                              const currentQuantity = prevQuantity[dish.dish_id] || 0;
                              if (currentQuantity > 0) {
                                const newQuantity = currentQuantity - 1;
                                return { ...prevQuantity, [dish.dish_id]: newQuantity };
                              }
                              return prevQuantity;
                            });
                            handleDecrement(dish);
                          }
                          if (clickPosition >= buttonWidth / 2) {
                            setQuantity((prevQuantity) => {
                              const newQuantity = (prevQuantity[dish.dish_id] || 0) + 1;
                              return { ...prevQuantity, [dish.dish_id]: newQuantity };
                            });
                            handleIncrement(dish);
                          }
                        }}
                        style={{
                          backgroundColor: 'green', width: '120px', height: '25px', borderRadius: '15px', display: 'flex',
                          justifyContent: 'space-between', alignItems: 'center', padding: '0 10px'
                        }}
                      >
                        <p style={{ color: 'white', margin: '0' }}>-</p>
                        <span style={{ color: 'white', margin: '0' }}>{quantity[dish.dish_id] || 0}</span>
                        <p style={{ color: 'white', margin: '0' }}>+</p>
                      </button>
                      {dish.addonCat && dish.addonCat.length > 0 && (
                        <div style={{ color: 'red', marginTop: '10px', fontSize: '11px' }}>
                          Customizations available
                        </div>
                      )}
                    </div>
                    <div className="dish-info">
                      <img
                        className="dish-image"
                        src={dish.dish_image}
                        alt={`Image for ${dish.dish_name}`}
                        style={{ width: '120px', height: '100px', borderRadius: '10px' }}
                      />
                    </div>
                  </div>
                ))
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;