import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import EmailSimulator from './components/EmailSimulator.jsx';
import AdminPanel from './components/AdminPanel.jsx';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const login = () => setIsAdmin(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white shadow-lg border-b sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-phishing rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <h1 className="text-2xl font-bold">HumanFirewall</h1>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className={`px-4 py-2 rounded-lg ${location.pathname === '/' ? 'bg-phishing text-white' : ''}`}>Тренажёр</Link>
            <button onClick={login} className="px-6 py-2 bg-phishing text-white rounded-lg">Войти</button>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<EmailSimulator />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel /> : <div className="text-center py-20"><button onClick={login} className="bg-phishing text-white px-8 py-3 rounded-lg">Войти в админку</button></div>} />
        </Routes>
      </main>
    </div>
  );
}
