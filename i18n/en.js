// English texts, in the traditional form (Holy Ghost, thee and thou). Same
// keys as fr.js; see that file for how to add a language.

var LOCALE = {
  ui: {
    title: "Rosary",
    today: "today",
    step: "Step %1 of %2",
    previous: "Previous",
    next: "Next",
    restart: "Start over",
    finished: "Rosary completed",
    mysteryOrdinal: ["First mystery", "Second mystery", "Third mystery", "Fourth mystery", "Fifth mystery"],
    fruit: "Fruit of the mystery: %1",
    opening: "Opening prayers",
    closing: "Closing prayers",
    hailMaryCount: "Hail Mary %1/%2",
    keys: "← → move · R start over · S settings · Esc close",
    tooltipIdle: "Pray the rosary",
    languageName: "English",
    settings: "Settings",
    back: "Back to the prayer",
    language: "Language",
    showProgress: "Progress in the bar",
    showFruit: "Fruit of the mystery",
    showReference: "Scripture reference",
    settingsKeys: "↑ ↓ select · Space change · S or Esc back"
  },

  prayers: {
    sign: {
      name: "Sign of the Cross",
      text: "In the name of the Father, and of the Son, and of the Holy Ghost. Amen."
    },
    creed: {
      name: "Apostles' Creed",
      text: "I believe in God, the Father Almighty, Creator of heaven and earth; "
        + "and in Jesus Christ, His only Son, our Lord; who was conceived by the Holy Ghost, "
        + "born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. "
        + "He descended into hell; the third day He arose again from the dead; He ascended into heaven, "
        + "and sitteth at the right hand of God, the Father Almighty; "
        + "from thence He shall come to judge the living and the dead. "
        + "I believe in the Holy Ghost, the Holy Catholic Church, the communion of saints, "
        + "the forgiveness of sins, the resurrection of the body, and life everlasting. Amen."
    },
    ourFather: {
      name: "Our Father",
      text: "Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; "
        + "Thy will be done on earth as it is in heaven. Give us this day our daily bread; "
        + "and forgive us our trespasses as we forgive those who trespass against us; "
        + "and lead us not into temptation, but deliver us from evil. Amen."
    },
    hailMary: {
      name: "Hail Mary",
      text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, "
        + "and blessed is the fruit of thy womb, Jesus. "
        + "Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen."
    },
    glory: {
      name: "Glory Be",
      text: "Glory be to the Father, and to the Son, and to the Holy Ghost. "
        + "As it was in the beginning, is now, and ever shall be, world without end. Amen."
    },
    fatima: {
      name: "Fatima Prayer",
      text: "O my Jesus, forgive us our sins, save us from the fires of hell, "
        + "lead all souls to heaven, especially those in most need of Thy mercy."
    },
    salve: {
      name: "Hail, Holy Queen",
      text: "Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope! "
        + "To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, "
        + "mourning and weeping in this valley of tears. "
        + "Turn then, most gracious advocate, thine eyes of mercy toward us; "
        + "and after this our exile show unto us the blessed fruit of thy womb, Jesus. "
        + "O clement, O loving, O sweet Virgin Mary.\n\n"
        + "℣. Pray for us, O holy Mother of God.\n"
        + "℟. That we may be made worthy of the promises of Christ."
    }
  },

  // Same mysteries and fruits as fr.js; references use the English book abbreviations.
  mysteries: {
    joyful: {
      name: "Joyful Mysteries",
      short: "Joyful",
      items: [
        { title: "The Annunciation", fruit: "the spirit of humility", ref: "Luke 1:26-38" },
        { title: "The Visitation", fruit: "fraternal charity", ref: "Luke 1:39-56" },
        { title: "The Nativity", fruit: "the spirit of poverty", ref: "Luke 2:1-20" },
        { title: "The Presentation in the Temple and the Purification", fruit: "purity of heart, obedience", ref: "Luke 2:22-38" },
        { title: "The Finding of Our Lord in the Temple", fruit: "seeking God in all things", ref: "Luke 2:41-52" }
      ]
    },
    sorrowful: {
      name: "Sorrowful Mysteries",
      short: "Sorrowful",
      items: [
        { title: "The Agony of Our Lord in the Garden", fruit: "sorrow for our sins", ref: "Luke 22:39-46" },
        { title: "The Scourging at the Pillar", fruit: "mortification of our senses", ref: "John 19:1" },
        { title: "The Crowning with Thorns", fruit: "mortification of our pride", ref: "Matt. 27:27-31" },
        { title: "The Carrying of the Cross", fruit: "patience in trials", ref: "Luke 23:26-32" },
        { title: "The Crucifixion", fruit: "a greater love of God and of souls", ref: "Luke 23:33-46" }
      ]
    },
    glorious: {
      name: "Glorious Mysteries",
      short: "Glorious",
      items: [
        { title: "The Resurrection", fruit: "faith", ref: "Mark 16:1-8" },
        { title: "The Ascension of Our Lord", fruit: "the desire of Heaven", ref: "Acts 1:6-11" },
        { title: "The Descent of the Holy Ghost", fruit: "apostolic zeal, the fight for the Faith", ref: "Acts 2:1-13" },
        { title: "The Assumption of Our Lady", fruit: "the grace of a happy death", ref: "Apoc. 12:1" },
        { title: "The Coronation of Our Lady in Heaven", fruit: "a greater love of and devotion to Our Lady", ref: "Apoc. 12:1-6" }
      ]
    }
  }
}

if (typeof module !== "undefined") module.exports = LOCALE
