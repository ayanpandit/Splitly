import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Groups from './components/group';
import GroupDetail from './components/GroupDetail';
import Expenses from './components/expense';
import Settlements from './components/Settlements';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/group/:groupId" element={<GroupDetail />} />
      <Route path="/group/:groupId/expenses" element={<Expenses />} />
      <Route path="/group/:groupId/settlements" element={<Settlements />} />
    </Routes>
  );
}

export default App;