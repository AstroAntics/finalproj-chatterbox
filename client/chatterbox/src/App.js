import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import './index.css';
import { BrowserRouter, Navigate, Routes, Route, renderMatches } from 'react-router-dom';
import MainPage from './scenes/home/home';
import AuthPage from './scenes/auth/authPage';
import ProfilePage from './scenes/profile/profilePage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={AuthPage}>
            Login
          </Route>
          <Route path="/" element={MainPage}>
            Home
          </Route>
          <Route path="/account/:userId" element={ProfilePage}>
            Dashboard
          </Route>
        </Routes>
      </BrowserRouter>
      <h1>Hello, world!</h1>
    </div>
  );
}

export default App;
