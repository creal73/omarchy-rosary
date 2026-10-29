// Run with: node test/rosary-test.js
const assert = require("assert")
const R = require("../Rosary.js")
const locales = { fr: require("../i18n/fr.js"), la: require("../i18n/la.js") }

// 7 opening steps, 5 decades of 13, Salve and the closing sign.
assert.strictEqual(R.STEPS.length, 7 + 5 * 13 + 2)
assert.strictEqual(R.STEPS.filter(s => s.prayer === "hailMary").length, 53)

// Mysteries of the day (2026-11-02 is a Monday).
assert.strictEqual(R.setForDate(new Date(2026, 10, 1)), "glorious")
assert.strictEqual(R.setForDate(new Date(2026, 10, 2)), "joyful")
assert.strictEqual(R.setForDate(new Date(2026, 10, 3)), "sorrowful")
assert.strictEqual(R.setForDate(new Date(2026, 10, 4)), "glorious")
assert.strictEqual(R.setForDate(new Date(2026, 10, 5)), "joyful")
assert.strictEqual(R.setForDate(new Date(2026, 10, 6)), "sorrowful")
assert.strictEqual(R.setForDate(new Date(2026, 10, 7)), "glorious")

// Traditional rosary: fifteen mysteries, no luminous set.
assert.deepStrictEqual(R.SETS, ["joyful", "sorrowful", "glorious"])
assert.strictEqual(R.isValidSet("luminous"), false)

assert.strictEqual(R.progressLabel(0), "")
assert.strictEqual(R.progressLabel(R.firstStepOfDecade(2) + 7), "3/5 · 7/10")
assert.strictEqual(R.clampStep(999), R.STEPS.length - 1)
assert.strictEqual(R.clampStep("nope"), 0)

// Every locale covers every prayer, every set and every UI key of French.
for (const [code, t] of Object.entries(locales)) {
  for (const s of R.STEPS) assert.ok(t.prayers[s.prayer] && t.prayers[s.prayer].text, code + ": missing prayer " + s.prayer)
  for (const id of R.SETS) assert.strictEqual(t.mysteries[id].items.length, 5, code + ": " + id)
  for (const key of Object.keys(locales.fr.ui)) assert.ok(key in t.ui, code + ": missing ui." + key)
  assert.strictEqual(t.ui.mysteryOrdinal.length, 5, code + ": mysteryOrdinal")
}

console.log("ok")
