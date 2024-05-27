import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile_menu_styles.css";
import { useNavigate, Link } from "react-router-dom";

const Profile_menu = () => {
  const [userData, setUserData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [mallsData, setMallsData] = useState(null);
  const savedUsername = localStorage.getItem("username");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/profile/${savedUsername}/`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Помилка при отриманні даних користувача:", error);
    }
  };

  const fetchMallsData = async () => {
    try {
      const response1 = await axios.get(`http://127.0.0.1:8000/api/malls/`);
      setMallsData(response1.data);
    } catch (error) {
      console.error("Помилка при отриманні даних про ТЦ:", error);
    }
  };

  useEffect(() => {
    if (savedUsername) {
      fetchData();
    }
  }, [savedUsername]);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/cities/${userData.city}/`
        );
        setCityData(response.data);
      } catch (error) {
        console.error("Помилка при отриманні даних про місто:", error);
      }
    };
    if (userData && userData.city) {
      fetchCityData();
    }
  }, [userData?.city]);

  useEffect(() => {
    if (userData && userData.city) {
      fetchMallsData();
    }
  }, [userData?.city]);

  const isMallInFavorites = (mallId) => {
    return userData?.fav_malls.includes(mallId);
  };

  const handleRemoveFromFavorites = async (mallId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/profile/${savedUsername}/remove_favorite/`,
        { mall_id: mallId }
      );
      fetchData();
      fetchMallsData();
    } catch (error) {
      console.error("Помилка при видаленні з обраних:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/profile/${savedUsername}/delete/`
      );
      let temp = ""
      console.log(savedUsername)
      localStorage.setItem("username", temp);
      navigate("/login");
    } catch (error) {
      console.error("Помилка при видаленні користувача:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#f4f5f7" }}>
      {userData ? (
        <>
          <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-6 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                    <div className="row g-0">
                      <div
                        className="col-md-4 gradient-custom text-white col-lg-4 d-flex justify-content-center align-items-center"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                        }}
                      >
                        <div>
                          <div className="text-center">
                            <h5>Ім'я користувача:</h5>
                          </div>
                          <div>
                            <h5>{userData.username}</h5>
                          </div>
                          <div>
                            <i className="far fa-edit mb-5"></i>
                          </div>
                        </div>
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
                            </div>
                          </div>
                          <div className="d-flex justify-content-start">
                            <Link className="btn btn-edit" to="/edit_profile">
                              Редагувати профіль
                            </Link>
                            <Link className="btn btn-edit" to="/login">
                              Змінити користувача
                            </Link>
                            <button
                              className="btn btn-edit-new"
                              onClick={handleDeleteUser}
                            >
                              Видалити користувача
                            </button>
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
      {mallsData &&
        mallsData.filter((mall) => isMallInFavorites(mall.id)).length > 0 && (
          <h2 className="favorites-label">Перелік улюблених ТЦ</h2>
        )}
      {mallsData ? (
        mallsData
          .filter((mall) => isMallInFavorites(mall.id))
          .map((mall) => (
            <div className="mb-1-1" key={mall.id}>
              <div className="mall-container">
                <div className="mall">
                  <h4>{mall.name}</h4>
                  <p>{mall.description}</p>
                  <h3>{mall.address}</h3>
                  <button
                    className="add-button"
                    onClick={() => handleRemoveFromFavorites(mall.id)}
                  >
                    Видалити з обраних
                  </button>
                </div>
              </div>
            </div>
          ))
      ) : (
        <p>Завантаження даних про ТЦ...</p>
      )}
    </div>
  );
};

export default Profile_menu;
