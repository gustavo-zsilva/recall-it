import { createContext, ReactNode, useState } from "react";

export const ThemeContext = createContext({} as ThemeContextProps)

type ThemeContextProps = {
    theme: {
        bg: string;
    };
    changeTheme: (theme: string) => void;
}

type ThemeProviderProps = {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const themes = {
        light: {
            bg: 'gray.300'
        },
        dark: {
            bg: 'gray.700'
        },
        sweet: {
            bg: 'pink.200'
        },
        moon: {
            bg: 'cyan.700'
        }
    }
    const [theme, setTheme] = useState(themes['light'])

    function changeTheme(theme: string) {
        setTheme(themes[theme])
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                changeTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}