import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import HeroList from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];

  const openDialog = () => {
      const dialogOptions = {
        height: 50,
        width: 40,
        displayInIframe: true,
      };
        // Serialize the mydata object to a query string parameter
    // const dataQueryString = encodeURIComponent(JSON.stringify(mydata));
    const dialogUrl = `https://localhost:3000/taskpane.html`;

        Office.context.ui.displayDialogAsync(dialogUrl, dialogOptions, function (asyncResult) {
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.error("Dialog failed to display. Error: " + asyncResult.error.message);
          } else {
            const dialog = asyncResult.value;
            dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
              // Handle messages received from the dialog
              const message = JSON.parse(arg.message);
              console.log("Message received from dialog:", message);
            });
          }
        });
      }


  return (
    <div className={styles.root}>
     <button onClick={openDialog}>Open Dialog</button>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
