import React, { useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import 'tailwindcss/tailwind.css'; 

const lightTheme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#5C6BC0',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#5C6BC0',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const darkTheme = {
  background: '#1a202c',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#2d3748',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#2d3748',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

function Chat({ theme }) {
  useEffect(() => {
    const element = document.documentElement;
    if (theme === 'dark') {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }, [theme]);

  const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <div className=" bg-gray-100 dark:bg-black dark:text-white flex items-center justify-center">
        <ChatBot
          steps={[
            {
              id: '1',
              message: 'Adınız nedir?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Selam {previousValue}, tanıştığımıza sevindim!',
              trigger: '4',
            },
            {
              id: '4',
              message: 'Size nasıl yardımcı edebilirim?',
              trigger: '5',
            },
            {
              id: '5',
              options: [
                { value: 1, label: 'Seçenek 1', trigger: '7' },
                { value: 2, label: 'Seçenek 2', trigger: '6' },
                { value: 3, label: 'Seçenek 3', trigger: '8' },
              ],
            },
            {
              id: '6',
              message: 'Alışverişle ilgili problem yaşıyorum.',
              trigger: '5',
            },
            {
              id: '7',
              message: 'Kayıtla ilgili problem yaşıyorum.',
              end: true,
            },
            {
              id: '8',
              message: 'Ödeme yapamıyorum.',
              end: true,
            },
          ]}
          floating={true} 
       
        />
      </div>
    </ThemeProvider>
  );
}

export default Chat;
