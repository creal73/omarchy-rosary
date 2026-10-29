// Pure rosary logic: the ordered list of steps, the mysteries of the day and
// progress read-outs. No Qt and no strings here, so it runs under node
// (test/rosary-test.js) and every language shares the same structure; the
// words live in i18n/<lang>.js.

// The traditional fifteen-mystery rosary, keyed by the ids the locale files
// use. The luminous mysteries added in 2002 are deliberately left out.
var SETS = ["joyful", "sorrowful", "glorious"]

// Indexed by Date.getDay(), traditional distribution: joyful on Monday and
// Thursday, sorrowful on Tuesday and Friday, glorious on Wednesday, Saturday
// and Sunday.
var SET_BY_WEEKDAY = ["glorious", "joyful", "sorrowful", "glorious", "joyful", "sorrowful", "glorious"]

function setForDate(date) {
  return SET_BY_WEEKDAY[date.getDay()]
}

function dayKey(date) {
  var m = date.getMonth() + 1
  var d = date.getDate()
  return date.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d
}

// One entry per prayer said. `decade` is 0..4 inside a decade and -1 for the
// opening and closing prayers; `bead` is the Hail Mary's number (1..10, or
// 1..3 for the opening ones) and 0 otherwise.
function buildSteps() {
  var steps = []
  function push(prayer, section, decade, bead) {
    steps.push({ prayer: prayer, section: section, decade: decade, bead: bead })
  }

  push("sign", "intro", -1, 0)
  push("creed", "intro", -1, 0)
  push("ourFather", "intro", -1, 0)
  for (var i = 1; i <= 3; i++) push("hailMary", "intro", -1, i)
  push("glory", "intro", -1, 0)

  for (var d = 0; d < 5; d++) {
    push("ourFather", "decade", d, 0)
    for (var b = 1; b <= 10; b++) push("hailMary", "decade", d, b)
    push("glory", "decade", d, 0)
    push("fatima", "decade", d, 0)
  }

  push("salve", "outro", -1, 0)
  push("sign", "outro", -1, 0)
  return steps
}

var STEPS = buildSteps()

function clampStep(step) {
  var n = Number(step)
  if (!isFinite(n)) return 0
  return Math.max(0, Math.min(STEPS.length - 1, Math.floor(n)))
}

function isValidSet(id) {
  return SETS.indexOf(id) >= 0
}

// Compact bar read-out: "3/5 · 7/10" inside a decade, "" before the first
// decade starts and after the last one ends.
function progressLabel(step) {
  var s = STEPS[clampStep(step)]
  if (s.decade < 0) return ""
  var label = (s.decade + 1) + "/5"
  if (s.bead > 0) label += " · " + s.bead + "/10"
  return label
}

// Index of the first step of a decade, used to jump straight to a mystery.
function firstStepOfDecade(decade) {
  for (var i = 0; i < STEPS.length; i++) if (STEPS[i].decade === decade) return i
  return 0
}

// Exported for node; QML ignores it.
if (typeof module !== "undefined") {
  module.exports = {
    SETS: SETS, STEPS: STEPS, setForDate: setForDate, dayKey: dayKey,
    clampStep: clampStep, isValidSet: isValidSet, progressLabel: progressLabel,
    firstStepOfDecade: firstStepOfDecade
  }
}
