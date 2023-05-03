import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DailyBlocksPage from 'libs/pages/DailyBlocksPage';

function Hello() {
  return (
    <div className="h-screen">
      <DailyBlocksPage />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
