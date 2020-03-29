import React from 'react';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import NavBar from './components/NavBar';
import history from './history';
import { Router, Switch, Route } from 'react-router';
import { StoreState } from './common/state';
import { useSelector } from 'react-redux';

const App = () => {
   const theme = useSelector((state: StoreState) => state.theme)
   const currTheme = theme === 'light' ? '' : 'dark'
   return (
      <div className={`app-container ${currTheme}`}>
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
