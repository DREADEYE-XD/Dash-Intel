import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameSidebar from './GameSidebar';
import { GraphView } from './GraphView';
import FPSGraph from './FPSGraph';
import FrameTimeGraph from './FrameTimeGraph';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <GameSidebar />
        <Routes>
          <Route path="/analysis/:gameName" element={<GraphView />}>
            <Route path="fpsGraph" element={<FPSGraph />} />
            <Route path="frameTimeGraph" element={<FrameTimeGraph />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;