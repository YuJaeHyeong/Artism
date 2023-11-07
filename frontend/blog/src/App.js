import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Logout from './pages/Logout';
import PrivateRoute from './routes/PrivateRoute';
import Welcome from "./pages/Welcome";
import Sign from "./pages/Sign";
import Write from "./pages/Write";
import Update from "./pages/Update";
import Header from "./component/Header";
import Footer from "./component/Footer";
import List from "./pages/List";
import View from "./pages/View";

function App() {
  return (

      <Router>
        <Header />
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/logout" element={<Logout />} />
                </Route>
                
                <Route path="/login" element={ <Login /> }/>
                <Route path="/" element={<Welcome />}/>
                <Route path="/welcome" element={<Welcome />}/>
                <Route path="/sign" element={ <Sign />}/>
                <Route path="/write" element={<Write />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/list" element={ <List />}/>
                <Route path="/view/:id" element={ <View />}/>

            </Routes>
        <Footer />
      </Router>

  );
}

export default App;