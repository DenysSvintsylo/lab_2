import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile_menu_styles.css";
const Profile_menu = () => {
  const [userData, setUserData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [mallsData, setMallsData] = useState(null);
  const savedUsername = localStorage.getItem("username");
  const fetchData = async () => {
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

  useEffect(() => {
    if (savedUsername) {
      fetchData();
    }
  }, [savedUsername]); // Виконувати запит лише при зміні savedEmail

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/cities/${userData.city}/`
        );

        setCityData(response.data);
      } catch (error) {
        console.error("Помилка при отриманні даних про місто:", error);
        // Додайте обробку помилок, наприклад, відображення повідомлення про помилку користувачу
      }
    };
    if (userData && userData.city) {
      fetchCityData();
    }
  }, [userData?.city]);

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
  const isMallInFavorites = (mallId) => {
    return userData?.fav_malls.includes(mallId);
  };

  const handleRemoveFromFavorites = async (mallId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/profile/${savedUsername}/remove_favorite/`, // Новий ендпойнт
        { mall_id: mallId }
      );
      console.log(response.data); // Виводимо відповідь сервера в консоль (опціонально)

      // Оновлюємо дані користувача після видалення з обраних
      fetchData();
      fetchMallsData();
    } catch (error) {
      console.error("Помилка при видаленні з обраних:", error);
      // Обробка помилки (наприклад, повідомлення користувачу)
    }
  };
  return (
    <div>
      {userData ? (
        <>
          {/* <h2 className='Success-Page-Greet'>Успіх!</h2>
          <p className='Success-Page-Greet'>Ім'я: {userData.first_name}</p>
          <p className='Success-Page-Greet'>Прізвище: {userData.last_name}</p> */}
          {/* Відображення інших даних користувача */}

          <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-6 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                    <div className="row g-0">
                      <div
                        className="col-md-4 gradient-custom text-center text-white"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                        }}
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="Avatar"
                          className="img-fluid my-5"
                          style={{ width: "80px" }}
                        />
                        {/* <h5>Марія Мельник</h5> */}

                        <i className="far fa-edit mb-5"></i>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-4">
                          <h6>Інформація</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Ім'я</h6>
                              <p className="text-muted">
                                {userData.first_name}
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Прізвище</h6>
                              <p className="text-muted">{userData.last_name}</p>
                            </div>
                          </div>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Місто</h6>
                              {cityData ? (
                                <p className="text-muted">{cityData.name}</p>
                              ) : (
                                <p className="text-muted">{userData.city}</p>
                              )}
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Улюблені</h6>
                              {mallsData ? (
                                mallsData.map((mall) => (
                                  <div key={mall.id}>
                                    {isMallInFavorites(mall.id) ? (
                                      <>
                                        <p style={{ fontWeight: "bold" }}>
                                          {mall.name}
                                        </p>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <p>Завантаження даних про ТЦ...</p>
                              )}
                              {/* <p className="text-muted">{userData.fav_malls}</p> */}
                            </div>
                          </div>
                          <div className=" d-flex justify-content-start">
                            <a className="btn btn-edit" href="edit_prof.html">
                              Редагувати профіль
                            </a>
                            <a className="btn btn-edit" href="login.html">
                              Змінити користувача
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Завантаження даних користувача...</p>
      )}
      {mallsData ? (
        mallsData
          .filter((mall) => isMallInFavorites(mall.id))
          .map((mall) => (
            <div key={mall.id}>
              <p style={{ marginTop: "" }}>{mall.name}</p>
              <p>{mall.address}</p>
              <button
                className="add-button"
                onClick={() => handleRemoveFromFavorites(mall.id)}
              >
                Видалити з обраних
              </button>
              <hr />
            </div>
          ))
      ) : (
        <p>Завантаження даних про ТЦ...</p>
      )}
    </div>
  );
};

export default Profile_menu;
