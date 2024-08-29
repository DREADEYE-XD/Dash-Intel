import React, { useState, useEffect } from 'react';

const GameSidebar = () => {
  const [games, setGames] = useState({});

  useEffect(() => {
    const loadFiles = () => {
      // Use require.context to get all .json files from the lib folder
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

      // Sort files for each game by date and time
      Object.keys(gameMap).forEach(game => {
        gameMap[game].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      });

      setGames(gameMap);
    };

    loadFiles();
  }, []);

  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    // Here you would typically call a function to pass the files to another component
    console.log(`Files for ${game}:`, games[game]);
  };

  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Games</h2>
        <ul>
          {Object.keys(games).map(game => (
            <li 
              key={game} 
              className={`cursor-pointer p-2 hover:bg-gray-200 ${selectedGame === game ? 'bg-gray-300' : ''}`}
              onClick={() => handleGameClick(game)}
            >
              {game}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        {selectedGame && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Files for {selectedGame}:</h3>
            <ul>
              {games[selectedGame].map(file => (
                <li key={file.fileName} className="mb-1">
                  {file.fileName} - {file.dateTime}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSidebar;