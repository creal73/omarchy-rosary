// Latin texts, with the accents of the traditional liturgical books. Same
// keys as fr.js; see that file for how to add a language.

var LOCALE = {
  ui: {
    title: "Rosárium",
    today: "hódie",
    step: "Gradus %1 ex %2",
    previous: "Præcédens",
    next: "Sequens",
    restart: "Ab inítio",
    finished: "Rosárium absolútum",
    mysteryOrdinal: ["Mystérium primum", "Mystérium secúndum", "Mystérium tértium", "Mystérium quartum", "Mystérium quintum"],
    fruit: "Fructus mystérii : %1",
    opening: "Preces initiáles",
    closing: "Preces fináles",
    hailMaryCount: "Ave María %1/%2",
    keys: "← → procédere · R ab inítio · Esc cláudere",
    tooltipIdle: "Rosárium oráre"
  },

  prayers: {
    sign: {
      name: "Signum Crucis",
      text: "In nómine Patris, et Fílii, et Spíritus Sancti. Amen."
    },
    creed: {
      name: "Credo",
      text: "Credo in Deum, Patrem omnipoténtem, Creatórem cæli et terræ. "
        + "Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum : qui concéptus est de Spíritu Sancto, "
        + "natus ex María Vírgine, passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus : "
        + "descéndit ad ínferos ; tértia die resurréxit a mórtuis ; ascéndit ad cælos ; "
        + "sedet ad déxteram Dei Patris omnipoténtis : inde ventúrus est iudicáre vivos et mórtuos. "
        + "Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, Sanctórum communiónem, "
        + "remissiónem peccatórum, carnis resurrectiónem, vitam ætérnam. Amen."
    },
    ourFather: {
      name: "Pater noster",
      text: "Pater noster, qui es in cælis, sanctificétur nomen tuum. Advéniat regnum tuum. "
        + "Fiat volúntas tua, sicut in cælo et in terra. "
        + "Panem nostrum quotidiánum da nobis hódie, et dimítte nobis débita nostra, "
        + "sicut et nos dimíttimus debitóribus nostris. "
        + "Et ne nos indúcas in tentatiónem : sed líbera nos a malo. Amen."
    },
    hailMary: {
      name: "Ave María",
      text: "Ave María, grátia plena, Dóminus tecum. Benedícta tu in muliéribus, "
        + "et benedíctus fructus ventris tui, Iesus. "
        + "Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc et in hora mortis nostræ. Amen."
    },
    glory: {
      name: "Glória Patri",
      text: "Glória Patri, et Fílio, et Spirítui Sancto. "
        + "Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen."
    },
    fatima: {
      name: "Orátio Fatimæ",
      text: "O mi Iesu, dimítte nobis débita nostra, líbera nos ab igne inférni, "
        + "perduc in cælum omnes ánimas, præsértim illas quæ misericórdiæ tuæ máxime índigent."
    },
    salve: {
      name: "Salve Regína",
      text: "Salve, Regína, Mater misericórdiæ, vita, dulcédo, et spes nostra, salve. "
        + "Ad te clamámus, éxsules fílii Hevæ. Ad te suspirámus, geméntes et flentes in hac lacrimárum valle. "
        + "Eia, ergo, advocáta nostra, illos tuos misericórdes óculos ad nos convérte. "
        + "Et Iesum, benedíctum fructum ventris tui, nobis post hoc exsílium osténde. "
        + "O clemens, O pia, O dulcis Virgo María.\n\n"
        + "℣. Ora pro nobis, sancta Dei Génetrix.\n"
        + "℟. Ut digni efficiámur promissiónibus Christi."
    }
  },

  // Same mysteries and fruits as fr.js; references use the Latin book abbreviations.
  mysteries: {
    joyful: {
      name: "Mystéria gaudiósa",
      short: "Gaudiósa",
      items: [
        { title: "Annuntiátio", fruit: "humílitas", ref: "Luc. 1, 26-38" },
        { title: "Visitátio", fruit: "cáritas fratérna", ref: "Luc. 1, 39-56" },
        { title: "Natívitas Dómini", fruit: "spíritus paupertátis", ref: "Luc. 2, 1-20" },
        { title: "Præsentátio in Templo et Purificátio", fruit: "púritas cordis, obœdiéntia", ref: "Luc. 2, 22-38" },
        { title: "Invéntio Iesu in Templo", fruit: "Deum in ómnibus quǽrere", ref: "Luc. 2, 41-52" }
      ]
    },
    sorrowful: {
      name: "Mystéria dolorósa",
      short: "Dolorósa",
      items: [
        { title: "Orátio in Horto", fruit: "contrítio peccatórum", ref: "Luc. 22, 39-46" },
        { title: "Flagellátio", fruit: "mortificátio sénsuum", ref: "Ioan. 19, 1" },
        { title: "Coronátio Spinis", fruit: "mortificátio supérbiæ", ref: "Matth. 27, 27-31" },
        { title: "Baiulátio Crucis", fruit: "patiéntia in advérsis", ref: "Luc. 23, 26-32" },
        { title: "Crucifíxio et Mors Dómini", fruit: "maior amor Dei et animárum", ref: "Luc. 23, 33-46" }
      ]
    },
    glorious: {
      name: "Mystéria gloriósa",
      short: "Gloriósa",
      items: [
        { title: "Resurréctio", fruit: "fides", ref: "Marc. 16, 1-8" },
        { title: "Ascénsio Dómini", fruit: "desidérium cæli", ref: "Act. 1, 6-11" },
        { title: "Descénsus Spíritus Sancti", fruit: "zelus apostólicus, certámen pro fide", ref: "Act. 2, 1-13" },
        { title: "Assúmptio Beátæ Maríæ Vírginis", fruit: "grátia bonæ mortis", ref: "Apoc. 12, 1" },
        { title: "Coronátio Beátæ Maríæ Vírginis in Cælo", fruit: "maior amor et devótio erga Beátam Vírginem", ref: "Apoc. 12, 1-6" }
      ]
    }
  }
}

if (typeof module !== "undefined") module.exports = LOCALE
