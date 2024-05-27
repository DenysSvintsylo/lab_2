import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login_style.css";
import { useNavigate } from "react-router-dom";
import GlobalFooter from "./GlobalFooter";
import GlobalHeader from "./GlobalHeader";
const EditProfile = () => {
  const navigate = useNavigate();
  const savedUsername = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    city: "", 
  });
  const [cities, setCities] = useState([]); 

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cities/");
        setCities(response.data);
      } catch (error) {
        
      }
    };
    fetchCities(); 
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/profile/${savedUsername}/`
        );
        setUserData(response.data);
        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          username: response.data.username,
          city: response.data.city || "", 
        });
      } catch (error) {
        
      }
    };
    fetchUserData();
  }, [savedUsername]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const selectedCity = cities.find(
      (city) => city.id === parseInt(formData.city)
    );
    if (!selectedCity) {
      alert("Будь ласка, оберіть місто.");
      return;
    }

    const cityId = selectedCity ? selectedCity.id : null;

    const updatedUserData = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      city: cityId, 
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/profile/${savedUsername}/modify/`,
        updatedUserData
      );
      console.log("User updated successfully:", response.data);
      alert("Профіль успішно оновлено!");
      localStorage.setItem("username", updatedUserData.username);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Помилка при оновленні профілю. Будь ласка, спробуйте пізніше.");
    }
  };

  if (!userData) {
    return <div>Завантаження...</div>; 
  }

  return (
    <div>
        <GlobalHeader />
      <div>
        <section
          className="h-100 gradient-form"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container py-3 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          <h4 className="mt-1 mb-5 pb-1">Вітаємо вас!</h4>
                        </div>
                        <form id="registrationForm" onSubmit={handleSubmit}>
                          <p>Будь ласка, відредагуйте свій аккаунт</p>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First_name"
                              id="first_name"
                              onChange={handleChange}
                              value={formData.first_name}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last_name"
                              id="last_name"
                              onChange={handleChange}
                              value={formData.last_name}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Username"
                              onChange={handleChange}
                              value={formData.username}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <select
                              className="form-control"
                              id="city"
                              defaultValue={formData.city}
                              onChange={handleChange}
                            >
                              <option value="">Оберіть місто</option>
                              {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            >
                              Оновити профіль
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default EditProfile;
