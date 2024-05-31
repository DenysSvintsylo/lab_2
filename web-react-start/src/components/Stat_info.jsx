import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Stat_styles.css";

const Stat_info = () => {
  const [userData, setUserData] = useState([]);
  const [mallsData, setMallsData] = useState([]);
  const [cityData, setCityData] = useState([]);


  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/`);
      setUserData(response.data);
    } catch (error) {
      console.error("Помилка при отриманні даних користувачів:", error);
    }
  };

 
  const fetchMallsData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/malls/`);
      setMallsData(response.data);
    } catch (error) {
      console.error("Помилка при отриманні даних про ТЦ:", error);
    }
  };


  const fetchCityData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cities/`);
      setCityData(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchMallsData();
    fetchCityData();
  }, []);


  const getMallFavoritesCount = () => {
    const favoritesCount = {};
    mallsData.forEach((mall) => {
      favoritesCount[mall.id] = 0;
    });

    userData.forEach((user) => {
      user.fav_malls.forEach((mallId) => {
        if (favoritesCount[mallId] !== undefined) {
          favoritesCount[mallId]++;
        }
      });
    });

    return favoritesCount;
  };

  const favoritesCount = getMallFavoritesCount();

  const mostFavoredMall = mallsData.reduce((max, mall) =>
    favoritesCount[mall.id] > (favoritesCount[max.id] || 0) ? mall : max, {});
  const leastFavoredMall = mallsData.reduce((min, mall) =>
    favoritesCount[mall.id] < (favoritesCount[min.id] || Infinity) ? mall : min, {});

  const getCityMallCounts = () => {
    const cityMallCount = {};
    mallsData.forEach((mall) => {
      if (cityMallCount[mall.city] !== undefined) {
        cityMallCount[mall.city]++;
      } else {
        cityMallCount[mall.city] = 1;
      }
    });
    return cityMallCount;
  };

  const cityMallCounts = getCityMallCounts();


  const mostMallsCity = cityData.reduce((max, city) =>
    cityMallCounts[city.id] > (cityMallCounts[max.id] || 0) ? city : max, {});
  const leastMallsCity = cityData.reduce((min, city) =>
    cityMallCounts[city.id] < (cityMallCounts[min.id] || Infinity) ? city : min, {});

  return (
    <section className="center-screen">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8 col-xxl-7">
            <div className="row gy-4">
              <div className="col-12 col-sm-6">
                <div className="card widget-card border-light shadow-sm">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title mb-3">Більше всього людей додало в улюблені</h5>
                        <h4 className="card-subtitle text-body-secondary m-0">{mostFavoredMall.name || "Loading..."}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="lh-1 text-white gradient-custom-2 rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <i className="bi bi-star fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-up-short"></i>
                          </span>
                          <div>
                            <p className="fs-7 mb-0">{favoritesCount[mostFavoredMall.id]} вподобань</p>
                            <p className="fs-7 mb-0 text-secondary"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="card widget-card border-light shadow-sm">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title mb-3">Менше всього людей додало в улюблені</h5>
                        <h4 className="card-subtitle text-body-secondary m-0">{leastFavoredMall.name || "Loading..."}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="lh-1 text-white gradient-custom-2 rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <i className="bi bi-star-half"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-down-short"></i>
                          </span>
                          <div>
                            <p className="fs-7 mb-0">{favoritesCount[leastFavoredMall.id]} вподобань</p>
                            <p className="fs-7 mb-0 text-secondary"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="card widget-card border-light shadow-sm">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title mb-3">Місто з найбільшою кількостю ТЦ</h5>
                        <h4 className="card-subtitle text-body-secondary m-0">{mostMallsCity.name || "Loading..."}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="lh-1 text-white gradient-custom-2 rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <i className="bi bi-building"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-up-short"></i>
                          </span>
                          <div>
                            <p className="fs-7 mb-0">{cityMallCounts[mostMallsCity.id]} ТЦ</p>
                            <p className="fs-7 mb-0 text-secondary"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="card widget-card border-light shadow-sm">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title mb-3">Місто з найменшою кількостю ТЦ</h5>
                        <h4 className="card-subtitle text-body-secondary m-0">{leastMallsCity.name || "Loading..."}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="lh-1 text-white gradient-custom-2 rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <i className="bi bi-building"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-down-short"></i>
                          </span>
                          <div>
                            <p className="fs-7 mb-0">{cityMallCounts[leastMallsCity.id]} malls</p>
                            <p className="fs-7 mb-0 text-secondary"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stat_info;
