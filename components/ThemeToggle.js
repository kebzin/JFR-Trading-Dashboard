"use client";
import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem onClick={toggleTheme}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ThemeToggler;
