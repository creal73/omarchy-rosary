.pragma library
.import "fr.js" as Fr
.import "la.js" as La

// Registry of available languages. Adding one is two lines: an .import above
// and an entry below. Unknown codes fall back to French.
var LOCALES = {
  fr: Fr.LOCALE,
  la: La.LOCALE
}

var FALLBACK = "fr"

function locale(code) {
  return LOCALES[String(code || "").toLowerCase()] || LOCALES[FALLBACK]
}

// "%1"-style substitution, the same convention as Qt's arg().
function format(template) {
  var out = String(template)
  for (var i = 1; i < arguments.length; i++) out = out.split("%" + i).join(String(arguments[i]))
  return out
}
