import React, { useContext } from "react";
//import { DataContext } from "../../context/AppContext";
import { useAppContext } from "../../context/AppContext";
const MainHome = ({ openDialog }) => {

  const { message } = useAppContext();

  //   const mydata = {
  //     name: "test",
  //     phone: "077",
  //     age: 20,
  //   };

  // updateData(mydata);

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
      <h1>Name: {message.name} </h1>
      <h1>Age: {message.age} </h1>
    </div>
  );
};

export default MainHome;
