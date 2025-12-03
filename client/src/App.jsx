import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import api from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";
import { useEffect } from "react";
import {Toaster} from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        // Simulate fetching user data with the token
        const { data } = await api.get("/api/users/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.user) {
          dispatch(login({ user: data.user, token }));
        }

        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(()=>{
    getUserData();
  }, []);

  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
