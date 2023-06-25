import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Employee from './pages/Employee';
import NoPage from './pages/404';
import {Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
        <Toaster />
        <Routes>
            <Route path="/" exact element={<Employee />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
