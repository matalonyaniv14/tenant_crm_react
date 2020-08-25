import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import './App.css';
import HomeScreen from './Screens/HomeScreen/Homescreen';
import TenantScreen from './Screens/TenantScreen/TenantScreen';
import Navbar from './Components/Navbar/Navbar';
import TenantForm from './Components/TenantForm/TenantForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Switch>
            <Route path='/tenant/new' >
              <TenantForm />
            </Route>
            <Route path='/tenant/:tenantId'>
              <TenantScreen />
            </Route>
            <Route path='/'>
              <HomeScreen />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
