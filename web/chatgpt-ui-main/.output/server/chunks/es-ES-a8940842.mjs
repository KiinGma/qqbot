const esES = {
  "signIn": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Iniciar sesi\xF3n"]);
  },
  "signUp": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Registrarse"]);
  },
  "username": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nombre de usuario"]);
  },
  "password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Contrase\xF1a"]);
  },
  "Username is required": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Se requiere nombre de usuario"]);
  },
  "Password is required": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Se requiere contrase\xF1a"]);
  },
  "Create your account": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Cree su cuenta"]);
  },
  "createAccount": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Crear cuenta"]);
  },
  "email": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Correo electr\xF3nico"]);
  },
  "Sign in instead": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Iniciar sesi\xF3n en su lugar"]);
  },
  "Please enter your username": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Por favor ingrese su nombre de usuario"]);
  },
  "Username must be at least 4 characters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["El nombre de usuario debe tener al menos 4 caracteres"]);
  },
  "Please enter your e-mail address": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Por favor ingrese su direcci\xF3n de correo electr\xF3nico"]);
  },
  "E-mail address must be valid": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["La direcci\xF3n de correo electr\xF3nico debe ser v\xE1lida"]);
  },
  "Please enter your password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Por favor ingrese su contrase\xF1a"]);
  },
  "Password must be at least 8 characters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["La contrase\xF1a debe tener al menos 8 caracteres"]);
  },
  "Please confirm your password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Confirme su contrase\xF1a"]);
  },
  "welcomeTo": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Bienvenido a"]);
  },
  "language": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Idioma"]);
  },
  "setApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Establecer clave API"]);
  },
  "setOpenAIApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Establecer clave de API de OpenAI"]);
  },
  "openAIApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Clave de API de OpenAI"]);
  },
  "getAKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Obtener una clave"]);
  },
  "openAIModels": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Modelos de OpenAI"]);
  },
  "aboutTheModels": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Acerca de los modelos"]);
  },
  "saveAndClose": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Guardar y cerrar"]);
  },
  "pleaseSelectAtLeastOneModelDot": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Por favor seleccione al menos un modelo."]);
  },
  "writeAMessage": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Escribir un mensaje"]);
  },
  "frequentlyPrompts": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Prompts frecuentes"]);
  },
  "addPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Agregar prompt"]);
  },
  "titlePrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["T\xEDtulo"]);
  },
  "addNewPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Agregar un nuevo prompt"]);
  },
  "pressEnterToSendYourMessageOrShiftEnterToAddANewLine": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Presione Enter para enviar su mensaje o Shift + Enter para agregar una nueva l\xEDnea"]);
  },
  "lightMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Modo claro"]);
  },
  "darkMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Modo oscuro"]);
  },
  "followSystem": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Seguir el sistema"]);
  },
  "themeMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Modo de tema"]);
  },
  "feedback": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Comentarios"]);
  },
  "newConversation": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nueva conversaci\xF3n"]);
  },
  "defaultConversationTitle": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Sin nombre"]);
  },
  "clearConversations": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Borrar conversaciones"]);
  },
  "modelParameters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Par\xE1metros del modelo"]);
  },
  "model": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Modelo"]);
  },
  "temperature": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Temperatura"]);
  },
  "topP": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Top P"]);
  },
  "frequencyPenalty": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Penalizaci\xF3n de frecuencia"]);
  },
  "presencePenalty": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Penalizaci\xF3n de presencia"]);
  },
  "maxTokens": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["M\xE1ximo de tokens"]);
  },
  "roles": {
    "me": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Yo"]);
    },
    "ai": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["IA"]);
    }
  },
  "edit": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Editar"]);
  },
  "copy": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Copiar"]);
  },
  "copied": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Copiado"]);
  },
  "delete": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Eliminar"]);
  },
  "signOut": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Cerrar sesi\xF3n"]);
  },
  "resetPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Restablecer contrase\xF1a"]);
  },
  "submit": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Enviar"]);
  },
  "agree": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Aceptar"]);
  },
  "newPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nueva contrase\xF1a"]);
  },
  "currentPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Contrase\xF1a actual"]);
  },
  "confirmPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Confirmar contrase\xF1a"]);
  },
  "yourPasswordHasBeenReset": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Su contrase\xF1a ha sido restablecida"]);
  },
  "nowYouNeedToSignInAgain": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Ahora debe iniciar sesi\xF3n nuevamente"]);
  },
  "webSearch": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["B\xFAsqueda en la web"]);
  },
  "webSearchDefaultPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Resultados de b\xFAsqueda en la web: \n\n [web_results] \n Fecha actual: [current_date] \n\n Instrucciones: Utilice los resultados de b\xFAsqueda proporcionados para escribir una respuesta completa a la consulta dada. Aseg\xFArese de citar los resultados utilizando la notaci\xF3n [n\xFAmero] despu\xE9s de la referencia. Si los resultados de b\xFAsqueda proporcionados se refieren a varios temas con el mismo nombre, escriba respuestas separadas para cada tema. \n Consulta: [query]"]);
  },
  "genTitlePrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Generar un t\xEDtulo corto para el siguiente contenido, no m\xE1s de 10 palabras. \n\n Contenido:"]);
  },
  "maxTokenTips1": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["La longitud m\xE1xima del contexto del modelo actual es de"]);
  },
  "maxTokenTips2": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["token, lo que incluye la longitud del prompt y la longitud del texto generado. El M\xE1ximo de tokens se refiere a la longitud del texto generado. Por lo tanto, deber\xEDa dejar espacio para el prompt y no establecerlo demasiado grande o hasta el m\xE1ximo."]);
  },
  "frugalMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Modo frugal"]);
  },
  "frugalModeTip": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Activar el modo frugal, el cliente no enviar\xE1 mensajes hist\xF3ricos a ChatGPT, lo que puede ahorrar consumo de tokens. Si desea que ChatGPT comprenda el contexto de la conversaci\xF3n, apague el modo frugal."]);
  },
  "welcomeScreen": {
    "introduction1": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["es un cliente no oficial para ChatGPT, pero utiliza la API oficial de OpenAI."]);
    },
    "introduction2": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Necesitar\xE1 una clave de API de OpenAI antes de poder usar este cliente."]);
    },
    "examples": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Ejemplos"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(['" Explicar la computaci\xF3n cu\xE1ntica en t\xE9rminos simples "']);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(['" \xBFTienes alguna idea creativa para el cumplea\xF1os de un ni\xF1o de 10 a\xF1os ? "']);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(['" \xBFC\xF3mo hago una solicitud HTTP en Javascript ? "']);
      }
    },
    "capabilities": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Capacidades"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Recuerda lo que el usuario dijo anteriormente en la conversaci\xF3n"]);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Permite al usuario proporcionar correcciones de seguimiento"]);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Entrenado para rechazar solicitudes inapropiadas"]);
      }
    },
    "limitations": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Limitaciones"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Puede generar informaci\xF3n incorrecta de vez en cuando"]);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Puede producir instrucciones da\xF1inas o contenido sesgado de vez en cuando"]);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Conocimiento limitado del mundo y eventos despu\xE9s de 2021"]);
      }
    }
  }
};

export { esES as default };
//# sourceMappingURL=es-ES-a8940842.mjs.map
