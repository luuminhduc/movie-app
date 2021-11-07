import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Container from './components/Container';
import Home from './pages/Home';
import MovieBySearch from './pages/MoviesBySearch';
import MoviesByType from './pages/MoviesByType';
import DetailPage from './pages/DetailPage';
import ByTicket from './pages/ByTicket';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Container>
              <Home/>
            </Container>
          </Route>
          <Route exact path="/search">
            <Container>
              <MovieBySearch/>
            </Container>
          </Route>
          <Route exact path="/:type">
            <Container>
            <MoviesByType/>

            </Container>
          </Route>
          <Route exact path="/:id/detail">
            <Container>
            <DetailPage/>

            </Container>
          </Route>
          <Route exact path="/:id/ticket">
            <Container>
            <ByTicket/>

            </Container>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
 
export default App;