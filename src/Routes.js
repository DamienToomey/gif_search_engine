import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";

import App from './App';
import NewPage from './NewPage';

function Routes() {
    return (
        <BrowserRouter>
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
            {/* <Redirect
                to={{ pathname: "/", }}
            /> */}
        </BrowserRouter>
    );
  }

export default Routes;
  