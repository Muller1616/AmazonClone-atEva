import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser ? authUser : null,
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
};

export default App;
