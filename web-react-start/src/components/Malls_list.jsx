import React, { useState } from "react";
import axios from "axios";
import "./Malls_list.css";
import { useEffect } from "react";

const MallsList = () => {
  const [userData, setUserData] = useState(null);
  const [mallsData, setMallsData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const savedUsername = localStorage.getItem("username");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/profile/${savedUsername}/`
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Помилка при отриманні даних користувача:", error);
    }
  };

  useEffect(() => {
    if (savedUsername) {
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
        { mall_id: mallId }
      );

      fetchUserData();
    } catch (error) {
      console.error("Помилка при додаванні до обраних:", error);
    }
  };

  const isMallInFavorites = (mallId) => {
    return userData?.fav_malls.includes(mallId);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/malls/filter/?name=${searchQuery}`
      );
      setMallsData(response.data);
    } catch (error) {
      console.error("Помилка при виконанні пошуку:", error);
    }
  };

  return (
    <div className="content-container">
      <div className="header d-flex align-items-center justify-content-center">
        <h2>Домашня сторінка</h2>
      </div>
      <div className="search-container d-flex justify-content-center my-4">
        <div className="input-group" style={{ maxWidth: '600px', width: '100%' }}>
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук ТЦ за іменем"
          />
          <button className="btn btn-dark" onClick={handleSearch}>Пошук</button>
        </div>
      </div>
      <div className="row">
        {mallsData ? (
          mallsData.map((mall) => (
            <div
              className="col-md-6 d-flex align-items-center justify-content-center"
              key={mall.id}
            >
              <div className="mall-container">
                <div className="mall">
                  <h4>{mall.name}</h4>
                  <p>{mall.description}</p>
                  <h3>{mall.address}</h3>

                  {isMallInFavorites(mall.id) ? (
                    <button
                      className="add-button"
                      disabled
                      style={{ color: "#4cae4c", backgroundColor: "white" }}
                    >
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Завантаження даних про ТЦ...</p>
        )}
      </div>
    </div>
  );
};

export default MallsList;
