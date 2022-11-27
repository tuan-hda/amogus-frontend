import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getProfile } from "./api/user";
import { auth } from "./firebase";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { Achievement, Admin, Home, Profile } from "./pages";
import Check from "./pages/Check";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./utils/UserProvider";

const App = () => {
  const { setUser, setLoading } = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        auth.currentUser.getIdToken().then((token) => {
          getProfile(token)
            .then((result) => {
              console.log(result);
              setUser({
                ...auth.currentUser,
                ...result.data[0],
              });
            })
            .catch((error) => console.log(error))
            .finally(() => {
              setLoading(false);
            });
        });
      } else {
        console.log("Not signed in");
        setLoading(false);
      }
    });
  }, []);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/*' element={<Profile type='other' />} />
        <Route path='/achievement' element={<Achievement />} />
        <Route path='/approve' element={<Admin />} />
        <Route path='/check' element={<Check />} />
      </Route>
    </Routes>
  );
};

export default App;
