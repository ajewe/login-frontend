import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/context';
import { Router } from './Router';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
