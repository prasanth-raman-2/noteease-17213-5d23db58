import React from 'react';
import './App.css';
import { MainContainer } from './components/MainContainer';

// PUBLIC_INTERFACE
const App: React.FC = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> NoteEase
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          {/* Main NoteEase container */}
          <MainContainer />
        </div>
      </main>
    </div>
  );
};

export default App;
