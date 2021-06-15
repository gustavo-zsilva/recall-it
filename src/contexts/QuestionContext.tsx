import { createContext, ReactNode } from "react";

export const QuestionContext = createContext({})

interface QuestionContextProps {

}

interface QuestionProviderProps {
    children: ReactNode;
}

export function QuestionProvider({ children }: QuestionProviderProps) {
    

    return (
        <QuestionContext.Provider
            value={{

            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}