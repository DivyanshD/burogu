import { useState } from "react";
import { loginFields } from "../constants/formFields";
import axios from "axios";
import FormAction from "./Form/FormAction";
import FormExtra from "./Form/FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginState);
    const formdata = new FormData(e.target),
      formDataObj = Object.fromEntries(formdata.entries());
    console.log(formDataObj);
    axios
      .post("http://localhost:3000/user/signin", formDataObj)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          try {
            localStorage.setItem("profile", JSON.stringify(response.data));
            location.replace("/");
          } catch (err) {
            console.log(err);
          }
        }
      });
  };

  return (
    <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
