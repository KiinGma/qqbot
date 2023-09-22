const frFR = {
  "signIn": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Se connecter"]);
  },
  "signUp": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["S'inscrire"]);
  },
  "username": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nom d'utilisateur"]);
  },
  "password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mot de passe"]);
  },
  "Username is required": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nom d'utilisateur requis"]);
  },
  "Password is required": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mot de passe requis"]);
  },
  "Create your account": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Cr\xE9er votre compte"]);
  },
  "createAccount": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Cr\xE9er un compte"]);
  },
  "email": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["E-mail"]);
  },
  "Sign in instead": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["S'identifier \xE0 la place"]);
  },
  "Please enter your username": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Veuillez saisir votre nom d'utilisateur"]);
  },
  "Username must be at least 4 characters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Le nom d'utilisateur doit comporter au moins 4 caract\xE8res"]);
  },
  "Please enter your e-mail address": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Veuillez saisir votre adresse e-mail"]);
  },
  "E-mail address must be valid": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["L'adresse e-mail doit \xEAtre valide"]);
  },
  "Please enter your password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Veuillez saisir votre mot de passe"]);
  },
  "Password must be at least 8 characters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Le mot de passe doit comporter au moins 8 caract\xE8res"]);
  },
  "Please confirm your password": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Veuillez confirmer votre mot de passe"]);
  },
  "welcomeTo": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Bienvenue \xE0"]);
  },
  "language": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Langue"]);
  },
  "setApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["D\xE9finir la cl\xE9 API"]);
  },
  "setOpenAIApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["D\xE9finir la cl\xE9 API OpenAI"]);
  },
  "openAIApiKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Cl\xE9 API OpenAI"]);
  },
  "getAKey": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Obtenir une cl\xE9"]);
  },
  "openAIModels": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mod\xE8les OpenAI"]);
  },
  "aboutTheModels": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\xC0 propos des mod\xE8les"]);
  },
  "saveAndClose": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Enregistrer et fermer"]);
  },
  "pleaseSelectAtLeastOneModelDot": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Veuillez s\xE9lectionner au moins un mod\xE8le."]);
  },
  "writeAMessage": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["\xC9crire un message"]);
  },
  "frequentlyPrompts": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Prompts fr\xE9quents"]);
  },
  "addPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Ajouter un prompt"]);
  },
  "titlePrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Titre"]);
  },
  "addNewPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Ajouter un nouveau prompt"]);
  },
  "pressEnterToSendYourMessageOrShiftEnterToAddANewLine": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Appuyez sur Entr\xE9e pour envoyer votre message ou sur Maj+Entr\xE9e pour ajouter une nouvelle ligne"]);
  },
  "lightMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mode clair"]);
  },
  "darkMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mode sombre"]);
  },
  "followSystem": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Suivre le syst\xE8me"]);
  },
  "themeMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mode th\xE8me"]);
  },
  "feedback": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Commentaires"]);
  },
  "newConversation": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nouvelle conversation"]);
  },
  "defaultConversationTitle": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Sans titre"]);
  },
  "clearConversations": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Effacer les conversations"]);
  },
  "modelParameters": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Param\xE8tres du mod\xE8le"]);
  },
  "model": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mod\xE8le"]);
  },
  "temperature": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Temp\xE9rature"]);
  },
  "topP": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Top P"]);
  },
  "frequencyPenalty": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["P\xE9nalit\xE9 de fr\xE9quence"]);
  },
  "presencePenalty": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["P\xE9nalit\xE9 de pr\xE9sence"]);
  },
  "maxTokens": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nombre maximal de jetons"]);
  },
  "roles": {
    "me": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Moi"]);
    },
    "ai": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["IA"]);
    }
  },
  "edit": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Modifier"]);
  },
  "copy": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Copier"]);
  },
  "copied": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Copi\xE9"]);
  },
  "delete": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Supprimer"]);
  },
  "signOut": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["D\xE9connexion"]);
  },
  "resetPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["R\xE9initialiser le mot de passe"]);
  },
  "submit": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Soumettre"]);
  },
  "agree": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Accepter"]);
  },
  "newPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Nouveau mot de passe"]);
  },
  "currentPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mot de passe actuel"]);
  },
  "confirmPassword": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Confirmer le mot de passe"]);
  },
  "yourPasswordHasBeenReset": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Votre mot de passe a \xE9t\xE9 r\xE9initialis\xE9"]);
  },
  "nowYouNeedToSignInAgain": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Vous devez maintenant vous reconnecter"]);
  },
  "webSearch": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Recherche Web"]);
  },
  "webSearchDefaultPrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["R\xE9sultats de la recherche Web : \n\n[r\xE9sultats_web]\nDate actuelle : [date_actuelle]\n\nInstructions : Utilisez les r\xE9sultats de la recherche Web fournis pour r\xE9diger une r\xE9ponse compl\xE8te \xE0 la question donn\xE9e. Assurez-vous de citer les r\xE9sultats en utilisant la notation [nombre] apr\xE8s la r\xE9f\xE9rence. Si les r\xE9sultats de recherche fournis font r\xE9f\xE9rence \xE0 plusieurs sujets avec le m\xEAme nom, r\xE9digez des r\xE9ponses distinctes pour chaque sujet. \nQuestion : [question]"]);
  },
  "genTitlePrompt": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["G\xE9n\xE9rer un titre court pour le contenu suivant, pas plus de 10 mots. \n\nContenu : "]);
  },
  "maxTokenTips1": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["La longueur maximale du contexte pour le mod\xE8le actuel est de"]);
  },
  "maxTokenTips2": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["jeton, ce qui inclut la longueur du prompt et la longueur du texte g\xE9n\xE9r\xE9. Le param\xE8tre Max Tokens ici fait r\xE9f\xE9rence \xE0 la longueur du texte g\xE9n\xE9r\xE9. Vous devriez donc laisser de l'espace pour votre prompt et ne pas le r\xE9gler trop grand ou \xE0 la limite maximale."]);
  },
  "frugalMode": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Mode \xE9co"]);
  },
  "frugalModeTip": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Activez le mode frugal, le client n'enverra pas les messages historiques \xE0 ChatGPT, ce qui peut \xE9conomiser la consommation de jetons. Si vous souhaitez que ChatGPT comprenne le contexte de la conversation, veuillez d\xE9sactiver le mode frugal."]);
  },
  "welcomeScreen": {
    "introduction1": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["est un client non officiel pour ChatGPT, mais utilise l'API officielle d'OpenAI."]);
    },
    "introduction2": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Vous aurez besoin d'une cl\xE9 API OpenAI avant de pouvoir utiliser ce client."]);
    },
    "examples": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Exemples"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize([`"Expliquez l'informatique quantique en termes simples"`]);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize([`"Avez-vous des id\xE9es cr\xE9atives pour l'anniversaire d'un enfant de 10 ans?"`]);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(['"Comment faire une requ\xEAte HTTP en JavaScript?"']);
      }
    },
    "capabilities": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Fonctionnalit\xE9s"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Se souvient de ce que l'utilisateur a dit pr\xE9c\xE9demment dans la conversation"]);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Permet \xE0 l'utilisateur de fournir des corrections de suivi"]);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Entra\xEEn\xE9 \xE0 refuser les demandes inappropri\xE9es"]);
      }
    },
    "limitations": {
      "title": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Limitations"]);
      },
      "item1": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Peut occasionnellement g\xE9n\xE9rer des informations incorrectes"]);
      },
      "item2": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Peut occasionnellement produire des instructions dangereuses ou du contenu biais\xE9"]);
      },
      "item3": (ctx) => {
        const { normalize: _normalize } = ctx;
        return _normalize(["Connaissance limit\xE9e du monde et des \xE9v\xE9nements apr\xE8s 2021"]);
      }
    }
  }
};

export { frFR as default };
//# sourceMappingURL=fr-FR-515b1d69.mjs.map
