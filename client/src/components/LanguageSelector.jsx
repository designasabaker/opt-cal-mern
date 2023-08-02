import LANGUAGE from "../constants/language.js";
import {useLanguage} from "../context/LanguageContext.jsx";

export default function LanguageSelector(){
    const {language, setLanguage} = useLanguage();
    const LANGUAGEARRAY = Object.entries(LANGUAGE);

    return(
        <div className="languageSelector">
            {LANGUAGEARRAY.map(([key, value]) => {
                    return (
                        <button
                            className="languageButton"
                            key={key}
                            onClick={() => setLanguage(value)}
                        >
                            {language === value ?
                                <span className="selected">{value}</span> :
                                <span>{value}</span>}
                            {language === value && <span className="selected">✓</span>}
                        </button>
                    )
            })}
        </div>
    )
}