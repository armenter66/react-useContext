import { Link } from "react-router-dom";
import { useContext } from "react";
import { LangContext, ThemeContext } from "../contexts/Context";


export default function Menu() {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {lang, toggleLang, translate} = useContext(LangContext);

    return (
        <>
            <ul className='app-controls'>
                <li><Link to="/">{translate("contacts")}</Link></li>
                <li><Link to="/add-contact">{translate("addContact")}</Link></li>
                <button className="control-btn" onClick={toggleTheme}>{translate("theme")}: {theme === 'dark' ? translate("dark") : translate("light") }  </button>
                <button className="control-btn" onClick={toggleLang}>{lang === 'en' ? translate("EN") : translate("UA")} </button>
            </ul>
        </>
    )
}