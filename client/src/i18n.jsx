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
            "What is Generative AI? and how it works in backend to provide us the related solutions for the provided prompt?",
          prompt2:
            "What are the other generative AI tools that i can use other than Gemini? How is Gemini better than those tools.",
          prompt3:
            " Suggest different places to travel around the world! , along with public reviews for the particular destination location.",
          prompt4:
            "Explain the concept of Stack and Queue with their Time Complexity of these Data Structure.",
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
            "जेनरेटिव एआई क्या है? और यह बैकएंड में कैसे काम करता है ताकि हमें दिए गए प्रॉम्प्ट के लिए संबंधित समाधान प्रदान किया जा सके?",
          prompt2:
            "जेमिनी के अलावा मैं और कौन से जनरेटिव AI टूल इस्तेमाल कर सकता हूँ? जेमिनी उन टूल से किस तरह बेहतर है?",
          prompt3:
            "दुनिया भर में यात्रा करने के लिए अलग-अलग स्थानों का सुझाव दें! ,साथ ही विशेष गंतव्य स्थान के लिए सार्वजनिक समीक्षाएँ भी दें।",
          prompt4:
            "इन डेटा संरचना की समय जटिलता के साथ स्टैक और क्यू की अवधारणा को समझाइए।",
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
            "¿Qué es la IA generativa? y ¿cómo funciona en el backend para proporcionarnos las soluciones relacionadas con el prompt proporcionado?",
          prompt2:
            "¿Qué otras herramientas de IA generativa puedo usar además de Gemini? ¿En qué es Gemini mejor que esas herramientas?",
          prompt3:
            "¡Sugiere diferentes lugares para viajar por el mundo!, junto con reseñas públicas de la ubicación del destino en particular.",
          prompt4:
            "Explica el concepto de Pila y Cola con su Complejidad Temporal de estas Estructuras de Datos.",
          yourrecents: "Tus búsquedas recientes...",
          norecents: "No hay búsquedas recientes",
          placeholdertxt: "¡Introduce tu prompt aquí!",
          disclaimer:
            "Texa puede generar texto inexacto. Por favor, verifica dos veces.",
        },
      },
    },
  });
