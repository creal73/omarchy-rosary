// Run with: node test/rosary-test.js
const assert = require("assert")
const R = require("../Rosary.js")
const fr = require("../i18n/fr.js")

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

// Every prayer and set used by the structure has a text in each locale.
for (const s of R.STEPS) assert.ok(fr.prayers[s.prayer], "missing prayer " + s.prayer)
for (const id of R.SETS) assert.strictEqual(fr.mysteries[id].items.length, 5)

console.log("ok")
