import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import { Login } from "./pages/Login/Login";
import { useSelector } from "react-redux";
import { NotAccess } from "./pages/NotAccess/NotAccess";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [apiAllCamsDataFromAppCom, setApiAllCamsDataFromAppCom] = useState([]);

  const UUU = useSelector((state) => state.authReducer.authData);

  //
  // get all cams start

  useEffect(() => {
    // dispatch(allCamsData());
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");

    headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

    const getALlCamsDataFun = async () => {
      const API = axios.create({
        baseURL: "http://localhost:8081",
      });
      await API.get("/all-cams", {
        headers: headers,
      })
        .then((res) => {
          // console.log(res.data);
          setApiAllCamsDataFromAppCom(res.data);
          //  setInitialCam(res.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getALlCamsDataFun();
  }, []);

  // get all cams end

  // console.log(apiAllCamsDataFromAppCom);

  return (
    <div className="App">
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                UUU ? (
                  <Home apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                UUU ? (
                  UUU[0].role === "admin" ? (
                    <Admin
                      apiAllCamsDataFromAppCom={apiAllCamsDataFromAppCom}
                    />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/super-admin"
              element={
                UUU ? (
                  UUU[0].role === "super-admin" ? (
                    <SuperAdmin />
                  ) : (
                    <NotAccess />
                  )
                ) : (
                  <Navigate to="/login" />
                )

                // UUU?.[0]?.role === "super-admin" ? (
                //   <SuperAdmin />
                // ) : (
                //   <NotAccess />
                // )
              }
            />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
