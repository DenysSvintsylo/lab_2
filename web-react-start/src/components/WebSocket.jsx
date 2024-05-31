import React, { useEffect, useState } from "react";
import "./WebSocket.css";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://127.0.0.1:8080/ws/socket-server/");
    setSocket(newSocket);

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connected!");
      setAlertMessage("WebSocket connected!");
      setAlertType("success");
    });

    newSocket.addEventListener("message", ({ data }) => {
      const parsedData = JSON.parse(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: parsedData.message, isSent: false, timestamp: new Date() },
      ]);
    });

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
      setAlertMessage("WebSocket connection error.");
      setAlertType("danger");
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket closed.");
      setAlertMessage("WebSocket connection closed.");
      setAlertType("warning");
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setAlertMessage("WebSocket connection not active.");
      setAlertType("danger");
      return;
    }

    const newMessage = {
      text: inputMessage,
      isSent: true,
      timestamp: new Date(),
    };

    socket.send(JSON.stringify({ message: inputMessage }));
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setAlertMessage("Message sent successfully!");
    setAlertType("success");
    setInputMessage("");
  };

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div style={{}}>
      <GlobalHeader />
      <section style={{ marginTop: "200px" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">Чат технічної підтримки</h5>
                </div>
                <div
                  className="card-body"
                  style={{ position: "relative", height: "400px" }}
                >
                  <div
                    className="chat-messages"
                    data-mdb-perfect-scrollbar="true"
                  >
                    <div className={`d-flex flex-row justify-content-start`}>
                      <p
                        className={`small p-2 mb-2 rounded-3`}
                        style={{
                          backgroundColor: "#f5f6f7",
                          marginLeft: "0.75rem",
                          marginRight: "0",
                        }}
                      >
                        Здоровенькі були! <br/>
                        Якщо виникли певні неполадки в роботі сайту, <br/>
                        або ж в чомусь не вдалось розібратись - ласкаво просимо в чат підтримки!
                        <br/>
                        <br/>
                        Якщо виникли проблеми з редагуванням користувача - відправте цифру 1;<br/>
                        <br/>
                        Якщо інформація представленя на сайті не відповідає дійсьності - 2;<br/>
                        <br/>
                        Якщо не вдається ввійти в аккаунт - 3.
                      </p>
                    </div>

                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`d-flex flex-row ${
                          msg.isSent
                            ? "justify-content-end"
                            : "justify-content-start"
                        } mb-2`}
                      >
                        <div>
                          <p
                            className={`small p-2 mb-1 rounded-3 ${
                              msg.isSent ? "text-white bg-primary" : ""
                            }`}
                            style={{
                              backgroundColor: msg.isSent ? "blue" : "#f5f6f7",
                              marginLeft: msg.isSent ? "0" : "0.75rem",
                              marginRight: msg.isSent ? "0.75rem" : "0",
                            }}
                          >
                            {msg.text}
                          </p>
                          <p
                            className="small mb-2 rounded-3 text-muted"
                            style={{ textAlign: msg.isSent ? "right" : "left" }}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <form
                    className="d-flex flex-row w-100"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      className="form-control form-control-lg flex-grow-1"
                      placeholder="Введіть повідомлення"
                      value={inputMessage}
                      onChange={handleChange}
                      required
                      style={{ maxWidth: '80%' }}
                    />
                    <button type="submit" className="btn btn-primary ms-3" style={{ width: '100px' , height: '47px'}}>
                      <p>Надіслати</p>
                      {/* Іконка "паперового літака" */}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GlobalFooter />
    </div>
  );
};

export default WebSocketComponent;
