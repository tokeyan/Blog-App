import TopBar from "./components/topbar/TopBar"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Write from "./pages/write/Write"
import Setting from "./pages/setting/Settings"
import Single from "./pages/single/Single"
import { BrowserRouter as Router , Route,Routes} from "react-router-dom"
import {useContext} from "react"
import {Context} from "./components/context/Context"

function App() {
  const {user} = useContext(Context)
  return (
     <Router>
      <TopBar/>
        <Routes>
          <Route exact path = "/" element={<Home />}/>
          <Route path = "/register" element={user ? <Register /> : <Register/>}/>
          <Route path = "/login" element={user ? <Login /> : <Login />}/>
          <Route path = "/write" element={user ? <Write /> : <Login />}/>
          <Route path = "/setting" element={user ? <Setting /> : <Login />}/>
          <Route path = "/post/:postid" element={user ? <Single /> : <Login />}/>
        </Routes>
     </Router>
  );
}

export default App;
