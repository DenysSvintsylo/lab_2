import React, { useState } from "react";
import "./login_style.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/validate-login/",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        navigate("/profile");
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Помилка запиту:", error);
    }

    // console.log(Cookies.get('email'))
    // console.log(Cookies.get('password'))
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee'}}>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Вітаємо вас!</h4>
                      </div>
                      <form id="loginForm" onSubmit={handleSubmit}>
                        <p>Будь ласка, ввійдіть в свій аккаунт</p>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="form-control"
                            placeholder="Username"
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control"
                            placeholder="Password"
                            required
                          />
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          >
                            Вхід
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2" style={{ marginRight: '10px'}}>
                            Немаєте аккаунту?
                          </p>
                          <a
                            href="register.html"
                            className="btn btn-outline-danger"
                            role="button"
                          >
                            Створити
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4 text-start">
                        Ми більше ніж просто сайт
                      </h4>
                      <p className="small mb-0">
                        Наша ціль - допомогти користувачам з ріних куточків
                        нашої країни.
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

export default LoginForm;
