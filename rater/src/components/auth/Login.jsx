
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
    const [email, setEmail] = useState("gob");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.valid) {
                    localStorage.setItem("token", JSON.stringify(authInfo));
                    navigate("/");
                    window.location.reload();
                } else {
                    setShowAlert(true); // Show alert if credentials are invalid
                }
            });
    };

    const closeAlert = () => {
        setShowAlert(false); // Close the alert
    };

    return (
        <div className="display">
            <main className="container">
                {showAlert && ( // Conditional rendering for the alert
                    <div className="centered-alert">
                        <p>Invalid Credentials, Please Try Again.</p>
                        <button onClick={closeAlert}>OK</button>
                    </div>
                )}

                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <h1 className="text-4xl mt-7 mb-3">Gamer Rater</h1>
                        <h2 className="text-xl mb-10">Please sign in</h2>
                        <fieldset className="mb-4">
                            <label htmlFor="inputEmail"> Email address </label>
                            <input type="email" id="inputEmail"
                                value={email}
                                onChange={evt => setEmail(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset className="mb-4">
                            <label htmlFor="inputPassword"> Password </label>
                            <input type="password" id="inputPassword"
                                value={password}
                                onChange={evt => setPassword(evt.target.value)}
                                className="form-control"
                                placeholder="Password"
                            />
                        </fieldset>
                        <fieldset>
                            <button type="submit" className="button p-3 rounded-md bg-blue-800 text-blue-100" onClick={handleLogin}>
                                Sign in
                            </button>
                        </fieldset>
                    </form>
                </section>
                <div className="loginLinks">
                    <section className="link--register">
                        <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/register">Not a member yet?</Link>
                    </section>
                </div>
            </main>
        </div>
    );
};
