import react from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Broadcast from './pages/Broadcast';
import Login from './components/Login';
import Default from './layout/Default';

function App() {
  return (
    <Router>
      <Default>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/broadcast">
            <Broadcast />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        </Default>
    </Router>
  );
}

export default App;
