import React from "react";
import axios from "axios";
import "./Malls_list.css";
import { useState, useEffect } from "react";

const Malls_list = () => {
  const [userData, setUserData] = useState(null);
  const [mallsData, setMallsData] = useState(null);
  const savedUsername = localStorage.getItem("username");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/profile/${savedUsername}/`
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Помилка при отриманні даних користувача:", error);
      // Додайте обробку помилок, наприклад, відображення повідомлення про помилку користувачу
    }
  };

  useEffect(() => {
    
    if (savedUsername) {
      // fetchUserData().then(() => {
      //   if (userData && userData.city) {
      //     fetchMallsData();
      //   }
      // });
      fetchUserData();
    }
  }, [savedUsername]); 
  
  useEffect(() => {
    const fetchMallsData = async () => {
      try {
        const response1 = await axios.get(
          `http://127.0.0.1:8000/malls/${userData.city}/`
        );
        setMallsData(response1.data);
      } catch (error) {
        console.error("Помилка при отриманні даних про ТЦ:", error);
        // Обробка помилок
      }
    };
  
    if (userData && userData.city) {
      fetchMallsData();
    }
  }, [userData?.city]);

  const handleAddToFavorites = async (mallId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/profile/${savedUsername}/add_favorite/`,
        { mall_id: mallId } // Відправляємо ID ТЦ в тілі запиту
      );

      // Оновлюємо дані користувача після додавання до обраних
      fetchUserData(); 
    } catch (error) {
      console.error("Помилка при додаванні до обраних:", error);
      // Обробка помилки (наприклад, повідомлення користувачу)
    }
  };
  const isMallInFavorites = (mallId) => {
    return userData?.fav_malls.includes(mallId);
  };
  return (
    // <div>
    //   <div className="content-container">
    //     <div className="header">
    //       <h2>Домашня сторінка</h2>
    //       <a href="profile.html" className="profile-button-2">
    //         Профіль
    //       </a>
    //     </div>
    //     <div className="row">
    //       <div className="col-md-6">
    //         <div className="mall-container">
    //           <div className="mall">
    //             <h4>Форум Львів</h4>
    //             <p>
    //               Форум Львів — торгово-розважальний центр у Львові, відкритий
    //               25 вересня 2015 року. Розміщений у центральній частині міста
    //               на вул. Під Дубом, 7Б. Належить нідерландській
    //               девелоперській компанії Multi Corporation, яка через свій
    //               офіс у Києві Multi Ukraine LLC керує торговим центром.
    //             </p>
    //             <h3>вулиця Під Дубом, 7Б, Львів, Львівська область, 79000</h3>
    //             <div className="image-container mr-md-3 mb-md-0 justify-content-center">
    //               {/* <img src="forum.jpg" alt="Image"> */}
    //             </div>
    //             <a className="add-button">Додати до обраних</a>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-md-6">
    //         <div className="mall-container">
    //           <div className="mall">
    //             <h4> ТРЦ King Cross Leopolis</h4>
    //             <p>
    //               «Кінг Крос Леополіс» - перший великий торгово-розважальним
    //               центр, на теренах Західної України. Серед переваг цього
    //               торгового центру слід виділити зручне розташування – «Кінг
    //               Крос» знаходиться на виїзді зі Львова. Тут круто, власники
    //               вас сюди запрошують.
    //             </p>
    //             <h3>с. Сокільники, вул. Стрийська, 30.</h3>
    //             <div className="image-container mr-md-3 mb-md-0 justify-content-center">
    //               {/* <img src="king.jpg" alt="Image"> */}
    //             </div>
    //             <a className="add-button">Додати до обраних</a>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-md-6">
    //         <div className="mall-container">
    //           <div className="mall">
    //             <h4> ТЦ "Кордон"</h4>
    //             <p>
    //               Універмаг із супермаркетом, магазинами модного одягу,
    //               рестораном і баром на даху.
    //             </p>
    //             <h3>Незалежності, 40, Берестечко</h3>
    //             <div className="image-container mr-md-3 mb-md-0 justify-content-center">
    //               {/* <img src="border.jpg" alt="Image"> */}
    //             </div>
    //             <a className="add-button">Додати до обраних</a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      {mallsData ? (
        mallsData.map((mall) => (
          <div key={mall.id}>
            <p>{mall.name}</p>
            <p>{mall.address}</p>
            {isMallInFavorites(mall.id) ? (
              <button className="add-button" disabled>
                Вже в обраних
              </button>
            ) : (
              <button
                className="add-button"
                onClick={() => handleAddToFavorites(mall.id)}
              >
                Додати до обраних
              </button>
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>Завантаження даних про ТЦ...</p>
      )}
    </>
  );
};

export default Malls_list;
