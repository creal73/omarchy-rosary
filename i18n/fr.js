// French texts. To add a language, copy this file to i18n/<code>.js, translate
// every value (keep the keys), and register it in I18n.js.

var LOCALE = {
  ui: {
    title: "Chapelet",
    today: "du jour",
    step: "Étape %1 sur %2",
    previous: "Précédent",
    next: "Suivant",
    restart: "Recommencer",
    finished: "Chapelet terminé",
    mysteryOrdinal: ["1er mystère", "2e mystère", "3e mystère", "4e mystère", "5e mystère"],
    fruit: "Fruit du mystère : %1",
    opening: "Prières d'ouverture",
    closing: "Prières de conclusion",
    hailMaryCount: "Je vous salue Marie %1/%2",
    keys: "← → avancer · R recommencer · Échap fermer",
    tooltipIdle: "Prier le chapelet"
  },

  prayers: {
    sign: {
      name: "Signe de la croix",
      text: "Au nom du Père, et du Fils, et du Saint-Esprit. Ainsi soit-il."
    },
    creed: {
      name: "Je crois en Dieu",
      text: "Je crois en Dieu, le Père tout-puissant, Créateur du ciel et de la terre. "
        + "Et en Jésus-Christ, son Fils unique, Notre-Seigneur, qui a été conçu du Saint-Esprit, "
        + "est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort, a été enseveli, "
        + "est descendu aux enfers, le troisième jour est ressuscité des morts, est monté aux cieux, "
        + "est assis à la droite de Dieu le Père tout-puissant, d'où il viendra juger les vivants et les morts. "
        + "Je crois au Saint-Esprit, à la sainte Église catholique, à la communion des saints, "
        + "à la rémission des péchés, à la résurrection de la chair, à la vie éternelle. Ainsi soit-il."
    },
    ourFather: {
      name: "Notre Père",
      text: "Notre Père, qui êtes aux cieux, que votre nom soit sanctifié, que votre règne arrive, "
        + "que votre volonté soit faite sur la terre comme au ciel. "
        + "Donnez-nous aujourd'hui notre pain de chaque jour. "
        + "Pardonnez-nous nos offenses, comme nous pardonnons à ceux qui nous ont offensés. "
        + "Et ne nous laissez pas succomber à la tentation, mais délivrez-nous du mal. Ainsi soit-il."
    },
    hailMary: {
      name: "Je vous salue Marie",
      text: "Je vous salue, Marie, pleine de grâce ; le Seigneur est avec vous. "
        + "Vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. "
        + "Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, "
        + "maintenant et à l'heure de notre mort. Ainsi soit-il."
    },
    glory: {
      name: "Gloire au Père",
      text: "Gloire au Père, et au Fils, et au Saint-Esprit, "
        + "comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Ainsi soit-il."
    },
    fatima: {
      name: "Prière de Fatima",
      text: "Ô mon Jésus, pardonnez-nous nos péchés, préservez-nous du feu de l'enfer, "
        + "conduisez au ciel toutes les âmes, spécialement celles qui ont le plus besoin de votre sainte miséricorde."
    },
    salve: {
      name: "Salve Regina",
      text: "Salut, ô Reine, Mère de miséricorde, notre vie, notre douceur, notre espérance, salut ! "
        + "Enfants d'Ève, exilés, nous crions vers vous ; vers vous nous soupirons, "
        + "gémissant et pleurant dans cette vallée de larmes. "
        + "Ô vous, notre avocate, tournez vers nous vos regards miséricordieux. "
        + "Et, après cet exil, montrez-nous Jésus, le fruit béni de vos entrailles. "
        + "Ô clémente, ô miséricordieuse, ô douce Vierge Marie.\n\n"
        + "℣. Priez pour nous, sainte Mère de Dieu.\n"
        + "℟. Afin que nous devenions dignes des promesses du Christ."
    }
  },

  // Keyed by the set ids in Rosary.js. Each mystery: title, fruit to ask
  // for, and the Gospel or Acts reference to meditate on.
  mysteries: {
    joyful: {
      name: "Mystères joyeux",
      short: "Joyeux",
      items: [
        { title: "L'Annonciation", fruit: "l'esprit d'humilité", ref: "Lc 1, 26-38" },
        { title: "La Visitation", fruit: "la charité fraternelle", ref: "Lc 1, 39-56" },
        { title: "La Nativité", fruit: "l'esprit de pauvreté", ref: "Lc 2, 1-20" },
        { title: "La Présentation de Jésus au Temple et la Purification", fruit: "la pureté de cœur, l'obéissance", ref: "Lc 2, 22-38" },
        { title: "Le Recouvrement de Jésus au Temple", fruit: "la recherche de Dieu en toute chose", ref: "Lc 2, 41-52" }
      ]
    },
    sorrowful: {
      name: "Mystères douloureux",
      short: "Douloureux",
      items: [
        { title: "L'Agonie de Notre-Seigneur au jardin des Oliviers", fruit: "le regret de nos péchés", ref: "Lc 22, 39-46" },
        { title: "La Flagellation", fruit: "la mortification de nos sens", ref: "Jn 19, 1" },
        { title: "Le Couronnement d'épines", fruit: "la mortification de notre orgueil", ref: "Mt 27, 27-31" },
        { title: "Le Portement de Croix", fruit: "la patience dans les épreuves", ref: "Lc 23, 26-32" },
        { title: "Le Crucifiement", fruit: "un plus grand amour de Dieu et des âmes", ref: "Lc 23, 33-46" }
      ]
    },
    glorious: {
      name: "Mystères glorieux",
      short: "Glorieux",
      items: [
        { title: "La Résurrection", fruit: "la foi", ref: "Mc 16, 1-8" },
        { title: "L'Ascension de Notre-Seigneur", fruit: "le désir du Ciel", ref: "Ac 1, 6-11" },
        { title: "La Pentecôte", fruit: "le zèle apostolique, le combat pour la Foi", ref: "Ac 2, 1-13" },
        { title: "L'Assomption de la Très Sainte Vierge", fruit: "la grâce d'une bonne mort", ref: "Ap 12, 1" },
        { title: "Le Couronnement de la Sainte Vierge au Ciel", fruit: "un plus grand amour et une plus grande dévotion envers la sainte Vierge", ref: "Ap 12, 1-6" }
      ]
    }
  }
}

if (typeof module !== "undefined") module.exports = LOCALE
