import { useState } from "react";
import { signupFields } from "../constants/formFields";
import axios from "axios";

import FormAction from "./Form/FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    const formdata = new FormData(e.target),
      formDataObj = Object.fromEntries(formdata.entries());
    console.log(formDataObj);
    axios
      .post("http://localhost:3000/user/signup", formDataObj)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
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
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
