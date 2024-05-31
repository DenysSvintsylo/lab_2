import React, { useState } from "react";
import "./login_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register_form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    Username: "",
    City: "",
    password: "",
    Password_confirm: "",
  });

  const getCitiesMap = () => ({
    Львів: 1,
    Луцьк: 2,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: formData.Username,
      first_name: formData.First_name,
      last_name: formData.Last_name,
      city: getCitiesMap()[formData.City],
      password: formData.password,
      fav_malls: [],
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create-user/",
        userData
      );
      console.log("User registered successfully:", response.data);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert("There was an error registering the user. Please try again later.");
    }
  };
  const cities = Object.keys(getCitiesMap());

  const handleCityChange = (e) => {
    setFormData({ ...formData, City: e.target.value });
  };
  return (
    <div>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"></img>
                                          style="width: 185px;" alt="logo"> */}
                        <h4 className="mt-1 mb-5 pb-1">Вітаємо вас!</h4>
                      </div>

                      <form id="registrationForm" onSubmit={handleSubmit}>
                        <p>Будь ласка, створіть аккаунт</p>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First_name"
                            id="First_name"
                            onChange={handleChange}
                          />
                          {/* <!-- <label className="form-label" for="form2Example22">Password</label> --> */}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last_name"
                            id="Last_name"
                            onChange={handleChange}
                          />
                          {/* <!-- <label className="form-label" for="form2Example22">Password</label> --> */}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control"
                            id="Username"
                            placeholder="Username"
                            onChange={handleChange}
                          />
                          {/* <!-- <label className="form-label" for="form2Example11">Username</label> --> */}
                        </div>
                        <div className="form-outline mb-4">
                          <select
                            className="form-select"
                            id="City"
                            onChange={handleCityChange}
                            value={formData.City}
                          >
                            <option value="">Виберіть місто</option>
                            {cities.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          {/* <!-- <label className="form-label" for="form2Example22">Password</label> --> */}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            id="password"
                            onChange={handleChange}
                          />
                          {/* <!-- <label className="form-label" for="form2Example22">Password</label> --> */}
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password confirm"
                            id="Password_confirm"
                            onChange={handleChange}
                          />
                          {/* <!-- <label className="form-label" for="form2Example22">Password</label> --> */}
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          {/* <!--                                            <a-->
<!--                                               className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"-->
<!--                                               role="button" type="submit">Зареєструватися</a>--> */}
                          <button
                            type="submit"
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          >
                            Зареєструвати
                          </button>
                          {/* <!-- <a className="text-muted" href="#!">Forgot password?</a> --> */}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4 text-center">
                        Ми більше ніж просто сайт
                      </h4>
                      <p className="small mb-0">
                        Наша ціль - допомогти користувачам з різних куточків
                        нашої країни.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register_form;
