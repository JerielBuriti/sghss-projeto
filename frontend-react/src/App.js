import React from 'react';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
export default function App(){
  const [route, setRoute] = React.useState(localStorage.getItem('sghss_route') || 'login');
  function navigate(r){ localStorage.setItem('sghss_route', r); setRoute(r); }
  if(route === 'login') return <LoginPage onSuccess={()=> navigate('admin')} />;
  return <AdminPanel onLogout={()=> navigate('login')} />;
}
