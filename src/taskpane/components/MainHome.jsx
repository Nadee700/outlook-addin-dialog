import React, { useContext } from "react";
//import { DataContext } from "../../context/AppContext";

const MainHome = ({ openDialog }) => {
//   const { data, updateData } = useContext(DataContext);

//   const mydata = {
//     name: "test",
//     phone: "077",
//     age: 20,
//   };

  // updateData(mydata);

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>
    </div>
  );
};

export default MainHome;
