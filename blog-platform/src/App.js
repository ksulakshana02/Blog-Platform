import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { UserContextProvider } from "./UserContext";
import Edit from "./Edit";


function App() {
  return (
    <UserContextProvider>
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path= "/create">
              <Create />
            </Route>
            <Route path= "/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout" />
            <Route path="/edit/:id">
              <Edit />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    </UserContextProvider>
  );
}

export default App;
