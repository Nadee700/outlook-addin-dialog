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
  const openDialog = () => {
    const dialogOptions = {
      height: 50,
      width: 40,
      displayInIframe: true,
    };

    const dataQueryString = encodeURIComponent(JSON.stringify(message));
    const dialogUrl = `https://localhost:3000/commands.html?data=${dataQueryString}`;

    Office.context.ui.displayDialogAsync(dialogUrl, dialogOptions, function (asyncResult) {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.error("Dialog failed to display. Error: " + asyncResult.error.message);
      } else {
        const dialog = asyncResult.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
          const msg = JSON.parse(arg.message);
          setMessage(msg);
          console.log("Message received from dialog:", msg);
        });
      }
    });
  };

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
