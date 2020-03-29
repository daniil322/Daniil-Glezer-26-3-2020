import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import NavBar from './components/NavBar';
import history from './history';
import { Router, Switch, Route } from 'react-router';
import { StoreState } from './common/state';
import { useSelector } from 'react-redux';
import ErrorModal from './components/ErrorModal';
import { State } from './common/types';
import Progress from 'rsup-progress'

const App = () => {
   const { theme, state } = useSelector((state: StoreState) => state)
   const currTheme = theme === 'light' ? '' : 'dark'
   const [progress] = useState(new Progress())

   if (state === State.Init || state === State.Loading) {
      progress.start()
   } else {
      progress.end()
   }

   return (
      <div className={`app-container ${currTheme}`}>
         <ErrorModal state={state} />
         <Router history={history}>
            <NavBar />
            <Switch >
               <Route path="/Favorites" component={FavoritesPage} exact />
               <Route path="/" component={HomePage} />
            </Switch>
         </Router>
      </div>
   )
}

export default App;
