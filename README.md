# Rosary for Omarchy

A bar widget for [Omarchy](https://omarchy.org/) that guides you through the traditional rosary
(fifteen mysteries).

![The rosary panel during the third sorrowful mystery](preview.png)

- The mysteries of the day are picked automatically (joyful on Monday and Thursday, sorrowful on Tuesday and
  Friday, glorious on Wednesday, Saturday and Sunday), and can be changed by hand.
- Shows the beads of the current decade, the text of each prayer, and the title, fruit and Scripture
  reference of each mystery.
- Progress is saved: you pick up where you left off.

Prayer texts are currently available in French.

## Installation

```bash
omarchy plugin add https://github.com/creal73/omarchy-rosary.git --enable
```

## Usage

| Action | Effect |
|---|---|
| Left click on ✝ | Open / close the panel |
| Middle click on ✝ | Start the rosary over |
| `→` `↓` `Space` `Enter` | Next prayer |
| `←` `↑` | Previous prayer |
| `R` | Start over |
| `Esc` | Close |
| Click on a bead or a decade | Jump to it |

To bind a key, add this command in `~/.config/hypr/bindings.lua`:
`omarchy-shell shell toggle io.github.creal73.rosary '{}'`.

## Settings (`~/.config/omarchy/shell.json`)

| Key | Default | Purpose |
|---|---|---|
| `language` | `"fr"` | Language of the texts |
| `showProgress` | `true` | Show "3/5 · 7/10" next to the cross |

State is stored in `~/.local/state/omarchy/rosary.json`.

## Adding a language

1. Copy `i18n/fr.js` to `i18n/<code>.js` and translate the values (keep the keys).
2. Register it in `i18n/I18n.js` (one `.import` line and one entry in `LOCALES`).
3. `node test/rosary-test.js` checks the structure.

## Development

The code lives in `~/.config/omarchy/plugins/io.github.creal73.rosary/`, and the shell reloads the plugin on
every save. Hot reload does not always pick up indirectly loaded files (`Panel.qml`, `Cross.qml`, `i18n/*.js`):
if a change does not show up, run `omarchy restart shell`. Do not put symlinks inside the plugin folder
(`omarchy plugin validate` rejects them).

## License

MIT
