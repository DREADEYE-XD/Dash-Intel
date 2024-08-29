import { RouterProvider } from "react-router-dom";
import { router } from "../routes/routes";
import "../styles/home.css";
import "../styles/input.css";
import { ThemeProvider } from "../lib/themeContext";

function Home() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default Home;
