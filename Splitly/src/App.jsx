import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Groups from './components/group';
import GroupDetail from './components/GroupDetail';
import Expenses from './components/expense';
import Settlements from './components/Settlements';
import ProtectedRoute from './components/ProtectedRoute';
import About from './components/about';
import Contact from './components/contact';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={
        <ProtectedRoute>
          <Groups />
        </ProtectedRoute>
      } />
      <Route path="/group/:groupId" element={
        <ProtectedRoute>
          <GroupDetail />
        </ProtectedRoute>
      } />
      <Route path="/group/:groupId/expenses" element={
        <ProtectedRoute>
          <Expenses />
        </ProtectedRoute>
      } />
      <Route path="/group/:groupId/settlements" element={
        <ProtectedRoute>
          <Settlements />
        </ProtectedRoute>
      } />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;