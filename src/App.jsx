import React, { useContext, useEffect } from 'react'
// import Header from './components/Header/Header'
// import Carousel from './components/Carousel/Carousel'
// import Category from './components/Category/Category'
// import Product from './components/Product/Product'
import Routing from './Router'
import { DataContext } from './components/DataProvider/DataProvider';
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebase';

const App = () => {
  const [{user}, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // user is logged out
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, [])
  return (
    <>
    <Routing/>
    
    </>
  )
}

export default App