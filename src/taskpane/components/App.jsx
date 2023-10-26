import React, { useEffect, useContext } from "react";
import { makeStyles } from "@fluentui/react-components";
import { Route, Switch } from "react-router-dom";
import MainHome from "./MainHome";
import { useAppContext } from "../../context/AppContext";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = () => {
  const styles = useStyles();
  const { message, setMessage } = useAppContext();

  const mydata = {
    name: "test",
    phone: "077",
    age: 20,
  };

  const openDialog = () => {
    const dialogOptions = {
      height: 50,
      width: 40,
      displayInIframe: true,
    };
    //updateData(mydata);
    const dataQueryString = encodeURIComponent(JSON.stringify(mydata));
    const dialogUrl = `https://localhost:3000/commands.html?data=${dataQueryString}`;

    Office.context.ui.displayDialogAsync(dialogUrl, dialogOptions, function (asyncResult) {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.error("Dialog failed to display. Error: " + asyncResult.error.message);
      } else {
        const dialog = asyncResult.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
          const message = JSON.parse(arg.message);
          console.log("Message received from dialog:", message);
        });
      }
    });
  };

  useEffect(() => {
    const receiveMessage = (event) => {
      console.log(event.data, "event", event.origin, window.location.origin);
      // Check if the message is coming from the correct origin (security measure)

      // Assuming the message is a JSON string
      //const data = JSON.parse(event.data);

      // Now `data` contains the information sent from your HTML file
      console.log("Received data:", event);
    };

    // Add an event listener for messages
    window.addEventListener("message", receiveMessage);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  window.addEventListener("message", (event) => {
    // const received = JSON.parse(event.data);
    console.log(event, "event");

    // Handle the received data in your React application
    // You can update state or perform actions based on the received data
  });

  // console.log(message, "message");

  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path="/">
          <MainHome openDialog={openDialog} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
