const ruRU = {
  "signIn": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Sign In"]);
  },
  "signUp": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Sign Up"]);
  },
  "username": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["User Name"]);
  },
  "password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Password"]);
  },
  "Username is required": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Username is required"]);
  },
  "Password is required": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Password is required"]);
  },
  "Create your account": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Create your account"]);
  },
  "createAccount": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Create Account"]);
  },
  "email": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["E-mail"]);
  },
  "Sign in instead": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Sign in instead"]);
  },
  "Please enter your username": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Please enter your username"]);
  },
  "Username must be at least 4 characters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Username must be at least 4 characters"]);
  },
  "Please enter your e-mail address": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Please enter your e-mail address"]);
  },
  "E-mail address must be valid": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["E-mail address must be valid"]);
  },
  "Please enter your password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Please enter your password"]);
  },
  "Password must be at least 8 characters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Password must be at least 8 characters"]);
  },
  "Please confirm your password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Please confirm your password"]);
  },
  "welcomeTo": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432"]);
  },
  "language": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u042F\u0437\u044B\u043A"]);
  },
  "setApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043A\u043B\u044E\u0447 API"]);
  },
  "setOpenAIApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043A\u043B\u044E\u0447 API OpenAI"]);
  },
  "openAIApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041A\u043B\u044E\u0447 API OpenAI"]);
  },
  "getAKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043B\u044E\u0447"]);
  },
  "openAIModels": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041C\u043E\u0434\u0435\u043B\u0438 OpenAI"]);
  },
  "aboutTheModels": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041E \u043C\u043E\u0434\u0435\u043B\u044F\u0445"]);
  },
  "saveAndClose": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C & \u0417\u0430\u043A\u0440\u044B\u0442\u044C"]);
  },
  "pleaseSelectAtLeastOneModelDot": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0443 \u043C\u043E\u0434\u0435\u043B\u044C."]);
  },
  "writeAMessage": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"]);
  },
  "frequentlyPrompts": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043E\u043A"]);
  },
  "addPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443"]);
  },
  "titlePrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"]);
  },
  "addNewPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443"]);
  },
  "pressEnterToSendYourMessageOrShiftEnterToAddANewLine": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041D\u0430\u0436\u043C\u0438\u0442\u0435 Enter, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435, \u0438\u043B\u0438 Shift+Enter, \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0441\u0442\u0440\u043E\u043A\u0443."]);
  },
  "lightMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0421\u0432\u0435\u0442\u043B\u0430\u044F"]);
  },
  "darkMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0422\u0435\u043C\u043D\u0430\u044F"]);
  },
  "followSystem": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F"]);
  },
  "themeMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0422\u0435\u043C\u0430"]);
  },
  "feedback": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C"]);
  },
  "newConversation": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041D\u043E\u0432\u044B\u0439 \u0447\u0430\u0442"]);
  },
  "defaultConversationTitle": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0411\u0435\u0437\u044B\u043C\u044F\u043D\u043D\u044B\u0439"]);
  },
  "clearConversations": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0447\u0430\u0442\u044B"]);
  },
  "modelParameters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043C\u043E\u0434\u0435\u043B\u0438"]);
  },
  "model": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041C\u043E\u0434\u0435\u043B\u044C"]);
  },
  "temperature": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Temperature"]);
  },
  "topP": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Top P"]);
  },
  "frequencyPenalty": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Frequency Penalty"]);
  },
  "presencePenalty": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Presence Penalty"]);
  },
  "maxTokens": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Max Tokens"]);
  },
  "roles": {
    "me": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u042F"]);
    },
    "ai": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["AI"]);
    }
  },
  "edit": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"]);
  },
  "copy": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C"]);
  },
  "copied": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"]);
  },
  "delete": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0423\u0434\u0430\u043B\u0438\u0442\u044C"]);
  },
  "signOut": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0412\u044B\u0445\u043E\u0434"]);
  },
  "resetPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C"]);
  },
  "submit": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"]);
  },
  "agree": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D"]);
  },
  "newPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"]);
  },
  "currentPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C"]);
  },
  "confirmPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C"]);
  },
  "yourPasswordHasBeenReset": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C \u0431\u044B\u043B \u0441\u0431\u0440\u043E\u0448\u0435\u043D"]);
  },
  "nowYouNeedToSignInAgain": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0422\u0435\u043F\u0435\u0440\u044C \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0441\u043D\u043E\u0432\u0430 \u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443"]);
  },
  "webSearch": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041F\u043E\u0438\u0441\u043A \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435"]);
  },
  "webSearchDefaultPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0432\u0435\u0431-\u043F\u043E\u0438\u0441\u043A\u0430:\n\n[web_results]\n\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0434\u0430\u0442\u0430: [current_date]\n\n\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438: \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0432\u0435\u0431-\u043F\u043E\u0438\u0441\u043A\u0430, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u043D\u0430 \u0437\u0430\u0434\u0430\u043D\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441. \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0446\u0438\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 [[number](URL)] \u043F\u043E\u0441\u043B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438. \u0415\u0441\u043B\u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u043E\u0442\u043D\u043E\u0441\u044F\u0442\u0441\u044F \u043A \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C \u0442\u0435\u043C\u0430\u043C \u0441 \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0439 \u0442\u0435\u043C\u044B.\n\u0417\u0430\u043F\u0440\u043E\u0441: [query]"]);
  },
  "genTitlePrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0434\u043B\u044F \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F, \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 10 \u0441\u043B\u043E\u0432. \n\n\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435: "]);
  },
  "maxTokenTips1": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["The maximum context length of the current model is"]);
  },
  "maxTokenTips2": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["token, which includes the length of the prompt and the length of the generated text. The `Max Tokens` here refers to the length of the generated text. Therefore, you should leave some space for your prompt and not set it too large or to the maximum."]);
  },
  "frugalMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Frugal mode"]);
  },
  "frugalModeTip": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Activate frugal mode, the client will not send historical messages to ChatGPT, which can save token consumption. If you want ChatGPT to understand the context of the conversation, please turn off frugal mode."]);
  },
  "welcomeScreen": {
    "introduction1": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C \u0434\u043B\u044F ChatGPT, \u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 API OpenAI."]);
    },
    "introduction2": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\u0412\u0430\u043C \u043F\u043E\u043D\u0430\u0434\u043E\u0431\u0438\u0442\u0441\u044F \u043A\u043B\u044E\u0447 API OpenAI, \u043F\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043C \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442."]);
    },
    "examples": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u041F\u0440\u0438\u043C\u0435\u0440\u044B"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(['"\u041E\u0431\u044A\u044F\u0441\u043D\u0438, \u0447\u0442\u043E \u0442\u0430\u043A\u043E\u0435 \u043A\u0432\u0430\u043D\u0442\u043E\u0432\u044B\u0435 \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0441\u0442\u044B\u043C\u0438 \u0441\u043B\u043E\u0432\u0430\u043C\u0438"']);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(['"\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0438 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u0438\u0434\u0435\u0439 \u0434\u043B\u044F \u0434\u043D\u044F \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F 10-\u043B\u0435\u0442\u043D\u0435\u0433\u043E \u0440\u0435\u0431\u0435\u043D\u043A\u0430?"']);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(['"\u041A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C HTTP-\u0437\u0430\u043F\u0440\u043E\u0441 \u0432 Javascript?"']);
      }
    },
    "capabilities": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u041F\u043E\u043C\u043D\u0438\u0442, \u0447\u0442\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u043A\u0430\u0437\u0430\u043B \u0440\u0430\u043D\u0435\u0435 \u0432 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0435"]);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E \u0432\u043D\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"]);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u041D\u0430\u0443\u0447\u0435\u043D \u043E\u0442\u043A\u043B\u043E\u043D\u044F\u0442\u044C \u043D\u0435\u0443\u043C\u0435\u0441\u0442\u043D\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B"]);
      }
    },
    "limitations": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u0418\u043D\u043E\u0433\u0434\u0430 \u043C\u043E\u0436\u0435\u0442 \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0435\u0432\u0435\u0440\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E"]);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u0418\u043D\u043E\u0433\u0434\u0430 \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0432\u0440\u0435\u0434\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u0432\u0437\u044F\u0442\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442"]);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u043D\u0438\u0435 \u043C\u0438\u0440\u0430 \u0438 \u0441\u043E\u0431\u044B\u0442\u0438\u0439 \u043F\u043E\u0441\u043B\u0435 2021 \u0433\u043E\u0434\u0430"]);
      }
    }
  }
};

export { ruRU as default };
//# sourceMappingURL=ru-RU-7913675f.mjs.map
