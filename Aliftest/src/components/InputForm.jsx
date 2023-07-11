import React, { useState } from "react";
import Button from "@material-ui/core/Button";

export default function InputForm() {
  const [user, setUser] = useState({
    id: crypto.randomUUID(),
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    age: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorMail, setErrorMail] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^[0-9]{0,3}$/.test(value)) {
      setUser({
        ...user,
        age: value,
      });
      setAge(value); // также сохраняем значение в состоянии компонента
      setErrorMessage("");
    } else {
      setAge(age); // восстанавливаем предыдущее значение
      setErrorMessage("Тут нужно указать возрасть болше сифр нельзя!");
    }
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    if (/^[0-9+]*$/.test(value)) {
      // только числа и "+"
      setUser({
        ...user,
        phone: value,
      });
      setPhoneNumber(value); // также сохраняем значение в состоянии компонента
      setErrorMessage("");
    } else {
      setPhoneNumber(phoneNumber); // восстанавливаем предыдущее значение
      setErrorMessage("Тут нужно указать телефон в формате +XXXXXXXXXXX");
    }
  };

  const handlePhoneNumberFocus = () => {
    if (phoneNumber === "") {
      setPhoneNumber("+992");
    }
  };

  console.log("user", user);

  const onPostChange = (key, minLength) => (e) => {
    const value = e.target.value;
    if (key === "email" && !value.includes("@")) {
      // проверка на наличие "@"
      setErrorMail("Email должен содержать символ '@'");
    } else if (value.length < minLength) {
      // если введено слишком короткое имя или фамилия
      setErrorFirstName(
        `${key} должно содержать минимум ${minLength} символов`
      );
    } else {
      // если все данные корректны
      setUser({
        ...user,
        [key]: value,
      });
      setErrorMessage("");
      setErrorFirstName("");
      setErrorLastName("");
      setErrorMail("");
    }
  };

  const onSave = async () => {
    //fetch request to server
    try {
      const res = await fetch(`http://localhost:3002/users-create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log("Server response:", data);
    } catch (err) {
      console.error(err.users);
    }
    // getPosts();
  };

  return (
    <div class="flex flex-col items-center justify-center">
      <form class="w-full max-w-sm" onSubmit={onSave}>
        <div class="mb-4">
          <input
            class="block w-full px-2 py-1 leading-tight border border-gray-400 rounded appearance-none focus:outline-none focus:border-blue-500"
            placeholder="First Name"
            name="firstname"
            required
            onChange={onPostChange("firstname", 3)}
          />
          {errorFirstName && <p className="text-red-500">{errorFirstName}</p>}
        </div>
        <div class="mb-4">
          <input
            class="block w-full px-2 py-1 leading-tight border border-gray-400 rounded appearance-none focus:outline-none focus:border-blue-500"
            placeholder="Last Name"
            name="lastname"
            required
            onChange={onPostChange("lastname", 3)}
          />
          {errorLastName && <p className="text-red-500">{errorLastName}</p>}
        </div>
        <div class="mb-4">
          <input
            id="phone"
            className="block w-full px-2 py-1 leading-tight border border-gray-400 rounded appearance-none focus:outline-none focus:border-blue-500"
            placeholder="+992"
            name="phone"
            type="tel"
            required
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onFocus={handlePhoneNumberFocus}
            onKeyPress={(event) => {
              if (
                !/^[0-9+]$/.test(event.key) ||
                phoneNumber.length >= 13 // Allow "+" and numbers only
              ) {
                event.preventDefault();
              }
            }}
          />
        </div>
        <div class="mb-4">
          <input
            className="block w-full px-2 py-1 leading-tight border border-gray-400 rounded appearance-none focus:outline-none focus:border-blue-500"
            placeholder="Age 3number"
            name="age"
            type="text"
            value={age}
            required
            onChange={handleInputChange}
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <div class="mb-4">
          <input
            class="block w-full px-2 py-1 leading-tight border border-gray-400 rounded appearance-none focus:outline-none focus:border-blue-500"
            placeholder="Email"
            name="email"
            required
            onChange={onPostChange("email")}
          />
          {errorMail && <p className="text-red-500">{errorMail}</p>}
        </div>
        <div class="flex items-center justify-center">
          <Button
            variant="contained"
            className="px-4 py-2 font-bold animate__animated animate__slideInDown"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
