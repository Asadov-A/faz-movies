import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayOut from "./components/shared/LayOut";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Movies from "./pages/movies/Movies";
import ProtectedRoute from "./services/ProtectedRoute/ProtectedRoute";
import Login from "./pages/login/Login";
import ScrollToTop from "./components/ScrollToTop";
import Movie from "./pages/movie/Movie";

function App() {
  //https://imdb.iamidiotareyoutoo.com/search?tt=tt30274401
  //https://imdb.iamidiotareyoutoo.com/search?q=2
  //https://69198b479ccba073ee933bd9.mockapi.io/users/
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route
          path="/"
          element={
            <LayOut>
              <Home />
            </LayOut>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <LayOut>
                <Movies />
              </LayOut>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <LayOut>
                <Contact />
              </LayOut>
            </ProtectedRoute>
          }
        />

        <Route>
          <Route path="/movies/:tt" element={
            <LayOut>
              <Movie />
            </LayOut>
          } />
        </Route>


        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <LayOut>
              <Home />
            </LayOut>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
