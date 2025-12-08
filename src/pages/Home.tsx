import Sidebar from "../component/Sidebar";
// import { useTheme } from "../contexts/themeProvider";

export default function Home() {
  // const { theme, setTheme } = useTheme();

  return (
    <div className="dark:bg-zinc-700 min-h-screen">
      {/* <button onClick={() => setTheme(!theme)}>Change theme</button> */}
      <Sidebar/>
    </div>
  );
}
