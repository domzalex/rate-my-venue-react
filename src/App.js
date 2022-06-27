import './App.css';
import Nav from './Nav';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';
import Venue from './Venue';
import Create from './Create';
import Review from './Review';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import React, { useEffect, useState } from 'react';

function App() {

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:8080/register",
    }).then((res) => console.log(res));
  };
  const login = () => {
    axios({
      method: "POST",
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:8080/login",
    }).then((res) => console.log(res));
  };


  ////////////////
  // Sets main state for the app: all reviews and the important selected venue (so Venue can filter the right reviews)
  ////////////////
  const [reviews, setReviews] = useState()
  const [selectedVenue, venueSelect] = useState()


  ////////////////
  // Fetches all of the reviews from the database
  ////////////////
  useEffect(() => {
    const url = "http://192.168.1.170:8080/reviews";
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.log("error", error);
        }
    };
    fetchData();
  });


  ////////////////
  // This pulls all venue names from the DB and creates an array of unique venue names for use later
  ////////////////
  const venueNames = []
  if (reviews) {
    venueNames.push(...new Set(reviews.map(review => review.venue)))
  }


  return (
      <Router>
        <Nav />
        <Routes>

          {/* Home props include venues as the unique venue names, and the state function venueSelect so when the form on the home page has data changed it will reflect in the 'selected venue' state in App  */}
          <Route path="/" element={<Home userData={setData} venues={venueNames} venueSelect={venueSelect}/>} />

          {/* Venue props include venue being the selected venue data passed back from Home to App, and reviews being all of the reviews fetched via App */}
          <Route path="/venue" element={<Venue venue={selectedVenue} allReviews={reviews} RenderComponent={Review} pageLimit={5} dataLimit={4}/>}/>

          <Route path="/contact" element={<Contact setLoginEmail={setLoginEmail} />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/create" element={<Create venues={venueNames} allReviews={reviews} userData={data}/>} />
        </Routes>
      </Router>
      
  );

}

export default App;
