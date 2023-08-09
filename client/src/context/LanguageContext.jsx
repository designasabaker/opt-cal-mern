import React from 'react';
import LANGUAGE from "../constants/language.js";

const LanguageContext = React.createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = React.useState(LANGUAGE.ENGLISH);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = React.useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageProvider;