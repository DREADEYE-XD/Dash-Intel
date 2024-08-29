import React, { useEffect, useState } from "react";
import { useTheme } from "../../lib/themeContext";
import { useNavigate, useParams } from "react-router-dom";
import { MenuArrow } from "../../components/sidebar/menuArrow";

export const Sidebar = () => {
  const { theme, themeOptions } = useTheme();
  const [games, setGames] = useState({});
  const navigate = useNavigate();
  const { gameName } = useParams(); // Get the current game name from URL params

  const [isExpanded, setIsExpanded] = useState(() => {
    const savedIsExpanded = localStorage.getItem("isExpanded");
    return savedIsExpanded ? JSON.parse(savedIsExpanded) : false;
  });

  useEffect(() => {
    localStorage.setItem("isExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  useEffect(() => {
    const loadFiles = () => {
      const context = require.context("../../gameFiles", false, /\.json$/);
      const files = context.keys().map((key) => key.replace("./", ""));

      const gameMap = {};
      files.forEach((file) => {
        const match = file.match(
          /CapFrameX-(.+)\.exe-(\d{4}-\d{2}-\d{2}T\d+)\.json/
        );
        if (match) {
          const [, gameName, dateTime] = match;
          if (!gameMap[gameName]) {
            gameMap[gameName] = [];
          }
          gameMap[gameName].push({ fileName: file, dateTime });
        }
      });

      Object.keys(gameMap).forEach((game) => {
        gameMap[game].sort(
          (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        );
      });

      setGames(gameMap);
    };

    loadFiles();
  }, []);

  const handleGameClick = (game) => {
    const filePaths = games[game].map((file) => `${file.fileName}`);
    navigate(`/analysis/${encodeURIComponent(game)}/frameTimeGraph`, {
      state: { filePaths },
    });
  };

  return (
    <div
      className="h-[calc(100vh-60px)] w-[300px]"
      style={{
        borderColor: themeOptions.borderColor,
        backgroundColor: themeOptions.sidebarBgColor,
      }}
    >
      <div className="w-full h-full flex flex-col px-4 py-2">
        <div
          className="flex flex-col rounded-md "
          style={{ backgroundColor: themeOptions.backgroundColor }}
        >
          <div
            className="rounded-md hoverMode border-b-[1px]"
            style={{ borderColor: themeOptions.borderColor }}
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <MenuArrow isExpanded={isExpanded} theme={theme} />
          </div>

          {isExpanded && (
            <ul className="indent-6 py-2 flex flex-col gap-[2px]">
              {Object.keys(games).map((game) => (
                <li
                  key={game}
                  className={`rounded-md cursor-pointer hoverMode ${
                    game === decodeURIComponent(gameName) ? "gameTabActive" : ""
                  }`}
                  onClick={() => handleGameClick(game)}
                >
                  {game}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
// import React, { useEffect, useState } from "react";
// import { useTheme } from "../../lib/themeContext";
// import { useNavigate } from "react-router-dom";
// import { MenuArrow } from "../../components/sidebar/menuArrow";

// export const Sidebar = () => {
//   const { theme, themeOptions } = useTheme();

//   const [games, setGames] = useState({});

//   const navigate = useNavigate();

//   // We will replace this with one caching method and map all the files to be read
//   // to render using a single component
//   const [isExpanded, setIsExpanded] = useState(() => {
//     // Initialize cart items from localStorage if available
//     const savedIsExpanded = localStorage.getItem("isExpanded");
//     return savedIsExpanded ? JSON.parse(savedIsExpanded) : false;
//   });

//   //Saving the state of the tabs if expanded or not
//   useEffect(() => {
//     localStorage.setItem("isExpanded", JSON.stringify(isExpanded));
//   }, [isExpanded]);

//   useEffect(() => {
//     const loadFiles = () => {
//       // Use require.context to get all .json files from the lib folder
//       const context = require.context("../../gameFiles", false, /\.json$/);
//       const files = context.keys().map((key) => key.replace("./", ""));

//       const gameMap = {};
//       files.forEach((file) => {
//         const match = file.match(
//           /CapFrameX-(.+)\.exe-(\d{4}-\d{2}-\d{2}T\d+)\.json/
//         );
//         if (match) {
//           const [, gameName, dateTime] = match;
//           if (!gameMap[gameName]) {
//             gameMap[gameName] = [];
//           }
//           gameMap[gameName].push({ fileName: file, dateTime });
//         }
//       });

//       // Sort files for each game by date and time
//       Object.keys(gameMap).forEach((game) => {
//         gameMap[game].sort(
//           (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//         );
//       });

//       // console.log(gameMap)
//       setGames(gameMap);
//     };

//     loadFiles();
//   }, []);

//   const handleGameClick = (game) => {
//     const filePaths = games[game].map(file => `${file.fileName}`);
//     // console.log(filePaths)
//     navigate(`/analysis/${encodeURIComponent(game)}/frameTimeGraph`, { state: { filePaths } });
//   };

//   return (
//     // wrapper
//     <div
//       className="h-[calc(100vh-60px)] w-[300px]"
//       style={{
//         borderColor: themeOptions.borderColor,
//         backgroundColor: themeOptions.sidebarBgColor,
//       }}
//     >
//       {/* file system container */}
//       <div className="w-full h-full flex flex-col ">
//         {/* file sys 1 */}
//         <div className="flex flex-col px-4 py-2 ">
//           {/* menu */}
//           <div
//             className="rounded-md hoverMode"
//             onClick={() => {
//               setIsExpanded(!isExpanded);
//             }}
//           >
//             <MenuArrow isExpanded={isExpanded} theme={theme}/>
//           </div>

//           {/* sub menu responive to expandaing and collapsing*/}
//           {isExpanded ? (
//             <ul className="indent-6 py-2 flex flex-col gap-[2px]">
//               {Object.keys(games).map(game => (
//             <li
//               key={game}
//               className="rounded-md cursor-pointer hoverMode"
//               onClick={() => handleGameClick(game)}
//             >
//               {game}
//             </li>
//           ))}
//             </ul>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
