
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoaderGif from './assets/loader.gif';
import Profile from './pages/Dashboard/Profile';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LoadScript } from '@react-google-maps/api';
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const Layout = lazy(() => import('./components/dashboard/Layout'));
const Home = lazy(() => import('./pages/Dashboard/Home'));
const Contacts = lazy(() => import('./pages/Dashboard/Contacts'));
const Companies = lazy(() => import('./pages/Dashboard/Companies'));
const CallLogs = lazy(() => import('./pages/Dashboard/CallLogs'));
const User = lazy(() => import('./pages/Dashboard/User'));

function SuspenseWithDelay({ children, fallback, delay = 0, minDisplayTime = 2000 }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), minDisplayTime);
    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  return isLoading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <img src={LoaderGif} alt="Loading..." className="h-[6rem]" />
    </div>
  ) : (
    <Suspense fallback={fallback}>{children}</Suspense>
  );
}

function App() {
  const googleMapsApiKey = "AIzaSyA0P_pnW6OWas9hZhiEOt0qJ8hSopz_91s";

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      <Toaster />
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <BrowserRouter>
          <SuspenseWithDelay fallback={<div className="flex justify-center items-center w-screen h-screen"><img src={LoaderGif} alt="HopOn Dashboard- Loader" className="h-[6rem]" /></div>} minDisplayTime={2000}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard/" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="wallet" element={<Contacts />} />
                <Route path="bookings" element={<Companies />} />
                <Route path="calls" element={<CallLogs />} />
                <Route path="users" element={<User />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </SuspenseWithDelay>
        </BrowserRouter>
      </LoadScript>
    </>
  );
}

export default App;
