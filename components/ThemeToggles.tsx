// components/theme-toggles.tsx
"use client"

import * as React from "react"
import { Moon, Sun, Trees, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ThemeToggles() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('light');
  const [isChristmas, setIsChristmas] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedChristmas = localStorage.getItem('theme-christmas') === 'true';

    setTheme(savedTheme === 'dark' ? 'dark' : 'light');
    setIsChristmas(savedChristmas);
  }, []);

  const toggleDarkMode = () => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return newTheme;
    });
  };

  const toggleChristmas = () => {
    setIsChristmas(prev => {
      const newValue = !prev;
      localStorage.setItem('theme-christmas', String(newValue));

      if (newValue) {
        document.documentElement.classList.add('christmas');
      } else {
        document.documentElement.classList.remove('christmas');
      }

      return newValue;
    });
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="h-9 w-9 bg-background"
            >
              {theme === 'dark' ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle {theme === 'dark' ? 'light' : 'dark'} mode</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleChristmas}
              className={`h-9 w-9 bg-background
                ${isChristmas ? 'text-red-500 dark:text-red-400' : ''}`}
            >
              {isChristmas ? (
                <Trees className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <TreePine className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle Christmas theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Christmas theme</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}