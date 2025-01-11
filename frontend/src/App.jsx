import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import { Home, Dashboard, Generate, Calendar, Profile } from "./Pages/pages.js";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import ProtectedPage from "./components/ProtectedPage";
// import Home from "./Pages/Home";
import Layout from "./components/Layout";
import Landings from "./landingPages/Landings.jsx";
import CommunityPage from './Pages/Community/CommunityPage';
// import Generate from "./Pages/Generate";
// import Calendar from "./Pages/Calendar";
// import Profile from "./Pages/Profile";
// import StudentTable from "./Pages/Dashboard/StudentTable";
const App = () => {
  const { loading } = useSelector((state) => state.loaders);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="overflow-x-hidden">
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landings />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/landing-pages"
            element={
              <Landings/>
          }
          
          />
        
          <Route
            path="/dashboard"
            element={
              // <ProtectedPage>
              <Layout>
                <Dashboard />
              </Layout>
              // </ProtectedPage>
            }
          />
          <Route
            path="/generate"
            element={
              //  <ProtectedPage>
              <Layout>
                <Generate />
              </Layout>
              // </ProtectedPage>
            }
          />
          <Route
            path="/calendar"
            element={
              // <ProtectedPage>
              <Layout>
                <Calendar />
              </Layout>
              // </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              //<ProtectedPage>
              <Layout>
                <Profile />
              </Layout>
              // </ProtectedPage>
            }
          />
          <Route
            path="/community"
            element={
              <Layout>
                <CommunityPage />
              </Layout>
            }
          />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
