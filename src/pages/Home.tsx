import { useTheme } from "../contexts/themeProvider";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dark:bg-zinc-700 min-h-screen p-4">
      <h1>Home</h1>
      <button onClick={() => setTheme(!theme)}>Change theme</button>
    </div>
  );
}
