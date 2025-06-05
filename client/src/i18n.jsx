import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useContext } from "react";
import { initReactI18next } from "react-i18next";
import { AppContent } from "./context/AppContent";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    resources: {
      en: {
        translation: {
          greeting: "Welcome to the Authentication portal!",
          greeting_2:
            " TEXA AI Model(AI text generator), Sign Up or Login to begin your journey with us.",
          getstarted: "Get Started",
          Hello: "Hello",
          verify_email: " Verify Email",
          logout: "Logout",
          login: "Login",
          ask: " How can I help you?",
          prompt1:
            "How does the backend of a web application securely handle user authentication, store tokens, and communicate with an external AI API to fetch contextual responses?",
          prompt2:
            "Can you help me understand the potential impact of generative AI on the job market and what new opportunities or challenges it might create in the future?",
          prompt3:
            " What are the visa requirements, travel safety tips, and must-know local customs I should be aware of before visiting Japan for the first time as a solo traveler?",
          prompt4:
            "How can I design a secure backend architecture that includes rate limiting, token validation, and input sanitization when building an AI-powered chat platform?",
          yourrecents: "Your Recents...",
          norecents: "No Recent searches",
          placeholdertxt: "Enter your prompt here!",
          disclaimer:
            " Texa may generate inaccurate text. Please Double check.",
        },
      },
      hi: {
        translation: {
          greeting: "प्रमाणीकरण पोर्टल में आपका स्वागत है!",
          greeting_2:
            "टेक्सा एआई मॉडल (एआई टेक्स्ट जनरेटर), हमारे साथ अपनी यात्रा शुरू करने के लिए साइन अप करें या लॉगिन करें।",
          getstarted: "आगे बढ़ें",
          Hello: "नमस्ते",
          verify_email: "ईमेल सत्यापित करें",
          logout: "लॉग आउट",
          login: "लॉग इन करें",
          ask: "मैं आपकी कैसे मदद कर सकता हूँ?",
          prompt1:
            "एक वेब एप्लिकेशन का बैकएंड उपयोगकर्ता प्रमाणीकरण को सुरक्षित रूप से कैसे संभालता है, टोकन को कैसे स्टोर करता है, और संदर्भात्मक प्रतिक्रियाएं प्राप्त करने के लिए बाहरी AI API से कैसे संवाद करता है?",
          prompt2:
            "क्या आप मेरी मदद कर सकते हैं यह समझने में कि जनरेटिव AI का नौकरी बाजार पर क्या संभावित प्रभाव पड़ सकता है और यह भविष्य में कौन से नए अवसर या चुनौतियाँ उत्पन्न कर सकता है?",
          prompt3:
            "जापान की पहली बार एकल यात्रा करने से पहले मुझे किन वीज़ा आवश्यकताओं, यात्रा सुरक्षा सुझावों और स्थानीय रीति-रिवाजों के बारे में पता होना चाहिए?",
          prompt4:
            "जब मैं एक AI-संचालित चैट प्लेटफ़ॉर्म बना रहा हूँ, तो मैं एक सुरक्षित बैकएंड आर्किटेक्चर कैसे डिज़ाइन कर सकता हूँ जिसमें रेट लिमिटिंग, टोकन सत्यापन और इनपुट सैनिटाइजेशन शामिल हो?",

          yourrecents: "हाल की खोजें",
          norecents: "कोई हालिया खोज उपलब्ध नहीं है",
          placeholdertxt: "आप अपना प्रॉम्प्ट यहां दर्ज कर सकते हैं!",
          disclaimer:
            "TEXA गलत टेक्स्ट उत्पन्न कर सकता है। कृपया दोबारा जाँच करें।",
        },
      },
      es: {
        translation: {
          greeting: "¡Bienvenido al portal de autenticación!",
          greeting_2:
            "Modelo TEXA AI (generador de texto con IA), ¡Regístrese o inicie sesión para comenzar su viaje con nosotros!",
          getstarted: "Comenzar",
          Hello: "Hola",
          verify_email: "Verificar correo electrónico",
          logout: "Cerrar sesión",
          login: "Iniciar sesión",
          ask: "¿Cómo puedo ayudarte?",
          prompt1:
            "¿Cómo maneja de forma segura el backend de una aplicación web la autenticación de usuarios, el almacenamiento de tokens y la comunicación con una API de IA externa para obtener respuestas contextuales?",
          prompt2:
            "¿Puedes ayudarme a entender el impacto potencial de la inteligencia artificial generativa en el mercado laboral y qué nuevas oportunidades o desafíos podría crear en el futuro?",
          prompt3:
            "¿Cuáles son los requisitos de visa, consejos de seguridad para viajar y costumbres locales que debo conocer antes de visitar Japón por primera vez como viajero solitario?",
          prompt4:
            "¿Cómo puedo diseñar una arquitectura de backend segura que incluya limitación de tasa, validación de tokens y saneamiento de entradas al construir una plataforma de chat con IA?",

          yourrecents: "Tus búsquedas recientes...",
          norecents: "No hay búsquedas recientes",
          placeholdertxt: "¡Introduce tu prompt aquí!",
          disclaimer:
            "Texa puede generar texto inexacto. Por favor, verifica dos veces.",
        },
      },
    },
  });
