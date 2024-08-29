import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameSidebar = () => {
  const [games, setGames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadFiles = () => {
      const context = require.context('../lib', false, /\.json$/);
      const files = context.keys().map(key => key.replace('./', ''));

      const gameMap = {};
      files.forEach(file => {
        const match = file.match(/CapFrameX-(.+)\.exe-(\d{4}-\d{2}-\d{2}T\d+)\.json/);
        if (match) {
          const [, gameName, dateTime] = match;
          if (!gameMap[gameName]) {
            gameMap[gameName] = [];
          }
          gameMap[gameName].push({ fileName: file, dateTime });
        }
      });

      Object.keys(gameMap).forEach(game => {
        gameMap[game].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      });

      setGames(gameMap);
    };

    loadFiles();
  }, []);

  const handleGameClick = (game) => {
    const filePaths = games[game].map(file => `../lib/${file.fileName}`);
    // Navigate to the analysis page with the game name in the URL
    navigate(`/analysis/${encodeURIComponent(game)}`, { state: { filePaths } });
  };

  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Games</h2>
      <ul>
        {Object.keys(games).map(game => (
          <li 
            key={game} 
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={() => handleGameClick(game)}
          >
            {game}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameSidebar;