import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import AddPage from './components/AddPage'
import ContactPage from './components/ContactPage'
import Menu from './components/Menu'
import { ThemeContext, LangContext } from './contexts/Context'
import { translations } from './assets/translations'

// Опціонально: додати можливість авторизації
// Форма авторизації, обробка помилок
// При введенні admin/admin - пускати в телефонну книгу, інакше - не відображати “закритий” контент

function App() {
  const [contacts, setContacts] = useState([]);
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');

  useEffect(()=> {
    const currentLang = localStorage.getItem('lang');
    const currentTheme = localStorage.getItem('theme');
    if (currentLang) setLang(currentLang);
    if (currentTheme) setTheme(currentTheme);
  }, []);

  useEffect(()=> {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme': 'light-theme';
  }, [theme]);

  useEffect(()=> {
    localStorage.setItem('lang', lang);
  }, [lang])

  useEffect(() => {
        const loadData = async ()=> {
          const response = await fetch('/contacts.json');
          const result = await response.json();
          setContacts(result);
          localStorage.setItem('contacts', JSON.stringify(result))
        } 

        const localContacts = localStorage.getItem('contacts');
        localContacts ? setContacts(JSON.parse(localContacts)) : loadData(); 
  }, [])

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
    localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]))
  }

  const deleteContact = (id) => {
    const deletedContacts = contacts.filter(contact => contact.id !== id );
    setContacts(deletedContacts);
    localStorage.setItem('contacts', JSON.stringify(deletedContacts));
  }

  const toggleTheme = ()=> {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }

  const toggleLang = ()=> {
    setLang(current => current === 'en' ? 'ua' : 'en');
  }

  const translate = (key)=> {
    return translations[lang][key] || key;
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
      <LangContext.Provider value={{lang, toggleLang, translate}}>
      <header> 
        <nav>
          <Menu/>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<ContactPage contacts={contacts} deleteContact={deleteContact}/>}/>
        <Route path='/add-contact' element={<AddPage contacts={contacts} addContact={addContact} />}/>
      </Routes>

      </LangContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>

      
  )
}

export default App
