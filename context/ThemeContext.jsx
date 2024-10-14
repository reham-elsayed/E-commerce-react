import React, { createContext, useContext, useState , useRef, useEffect} from 'react';

export const ThemeContext = createContext();
export const ThemeDispatchContext = createContext();
export default  function ThemeContextProvider({ children }){
   let initialtheme = localStorage.getItem('theme') || 'light'
  const [theme, setTheme] = useState(initialtheme);
 
 useEffect(()=>{
localStorage.setItem('theme', theme)
 },[theme])
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    
  };

  return (
    <ThemeContext.Provider value={{theme}}>
       <ThemeDispatchContext.Provider value={{toggleTheme}}>
      {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};