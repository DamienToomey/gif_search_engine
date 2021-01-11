import { Switch, Route, HashRouter } from "react-router-dom";

import App from './App';
import NewPage from './NewPage';

function Routes() {
    return (
        <HashRouter basename="/">
            <div>
            <Switch>
              <Route exact={true} path="/">
                <App />
              </Route>
              <Route path="/newpage">
                <NewPage />
              </Route>
            </Switch>
            </div>
        </HashRouter>
    );
  }

export default Routes;
  
