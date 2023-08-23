import React, { useState } from "react";
import "./SignIn.css";

export default function Register(props) {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onNameChange = (event) => {
    setUserInput({ ...userInput, name: event.target.value });
  };

  const onEmailChange = (event) => {
    setUserInput({ ...userInput, email: event.target.value });
  };

  const onPasswordChange = (event) => {
    setUserInput({ ...userInput, password: event.target.value });
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          props.loadUser(user);
          props.onRouteChange("home");
        }
      });
  };

  return (
    <article className="article br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="center f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="name-label db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="name-input pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="center">
            <input
              onClick={onSubmitSignIn}
              className="signin-btn b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-100"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  );
}
