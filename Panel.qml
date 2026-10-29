import QtQuick
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Commons as Commons
import qs.Ui
import "Rosary.js" as Rosary
import "i18n/I18n.js" as I18n

// The rosary popup: mystery set picker, the beads of the current group, and
// the text of the prayer to say. One step is one prayer; the arrows, space
// and the buttons walk the steps, and a click on a bead jumps to it.
//
// Progress lives in ~/.local/state/omarchy/rosary.json so closing the
// panel, restarting the shell or another monitor's bar all pick up where the
// prayer stopped. BarWidget.qml owns the bar label and reads `barLabel`.
Panel {
  id: root
  moduleName: "io.github.creal73.rosary"
  ipcTarget: "io.github.creal73.rosary"
  manageIpc: false

  property var anchorItem: null
  property var hostWidget: null
  readonly property var barIdentity: hostWidget || root

  readonly property var t: I18n.locale(setting("language", "fr"))

  // ---- Persisted state.
  property string setId: Rosary.setForDate(new Date())
  property int step: 0
  property bool finished: false
  property string day: Rosary.dayKey(new Date())

  readonly property string todaySet: Rosary.setForDate(new Date())
  readonly property var current: Rosary.STEPS[step]
  readonly property var mysterySet: t.mysteries[setId]
  readonly property var mystery: current.decade >= 0 ? mysterySet.items[current.decade] : null
  readonly property var prayer: t.prayers[current.prayer]

  // Shown next to the bar icon while a rosary is under way.
  readonly property string barLabel: finished || step === 0 ? "" : Rosary.progressLabel(step)
  readonly property string tooltip: barLabel !== ""
    ? mysterySet.name + " · " + barLabel
    : t.ui.tooltipIdle

  readonly property color fg: bar ? bar.foreground : Commons.Color.foreground
  readonly property color accent: Commons.Color.accent
  readonly property string fontFamily: bar ? bar.fontFamily : Style.font.family

  property string statePath: Quickshell.env("HOME") + "/.local/state/omarchy/rosary.json"

  function loadState(text) {
    var saved = {}
    try { saved = JSON.parse(text || "{}") || {} } catch (e) {}
    var today = Rosary.dayKey(new Date())
    var fresh = saved.day !== today && (saved.finished || !saved.step)

    // A rosary left half-said resumes, whatever the day. A finished or
    // untouched one starts over on today's mysteries.
    if (fresh || !Rosary.isValidSet(saved.setId)) {
      root.setId = Rosary.setForDate(new Date())
      root.step = 0
      root.finished = false
    } else {
      root.setId = saved.setId
      root.step = Rosary.clampStep(saved.step)
      root.finished = saved.finished === true
    }
    root.day = today
  }

  function saveState() {
    stateFile.setText(JSON.stringify({
      setId: root.setId, step: root.step, finished: root.finished, day: Rosary.dayKey(new Date())
    }, null, 2) + "\n")
  }

  function goTo(index) {
    root.finished = false
    root.step = Rosary.clampStep(index)
    saveState()
  }

  function next() {
    if (root.finished) return
    if (root.step >= Rosary.STEPS.length - 1) {
      root.finished = true
      saveState()
      return
    }
    goTo(root.step + 1)
  }

  function previous() {
    if (root.finished) { root.finished = false; saveState(); return }
    goTo(root.step - 1)
  }

  function restart() {
    root.setId = root.todaySet
    goTo(0)
  }

  function chooseSet(id) {
    if (!Rosary.isValidSet(id)) return
    root.setId = id
    saveState()
  }

  function refresh() { stateFile.reload() }

  function open() {
    stateFile.reload()
    root.controller.show()
  }

  function close() { root.controller.hide() }

  function toggle() {
    if (root.opened) root.close()
    else root.open()
  }

  function switchPanel(direction) {
    if (root.bar && typeof root.bar.switchPanelFrom === "function")
      return root.bar.switchPanelFrom(root.barIdentity, direction)
    return false
  }

  // Steps of the group around the current one: the opening prayers, one
  // decade, or the closing prayers. These are the beads drawn in the panel.
  readonly property var groupSteps: {
    var out = []
    for (var i = 0; i < Rosary.STEPS.length; i++) {
      var s = Rosary.STEPS[i]
      if (s.section === current.section && s.decade === current.decade) out.push({ index: i, prayer: s.prayer })
    }
    return out
  }

  readonly property string groupTitle: !t || !current ? ""
    : current.section === "intro" ? t.ui.opening
    : current.section === "outro" ? t.ui.closing
    : t.ui.mysteryOrdinal[current.decade] + " · " + (mystery ? mystery.title : "")

  FileView {
    id: stateFile
    path: root.statePath
    watchChanges: true
    atomicWrites: true
    printErrors: false
    onLoaded: root.loadState(text())
    onLoadFailed: root.loadState("{}")
    onFileChanged: reload()
  }

  KeyboardPanel {
    id: panel
    anchorItem: root.anchorItem
    owner: root.barIdentity
    bar: root.bar
    open: root.opened
    focusTarget: keyCatcher
    contentWidth: panel.fittedContentWidth(Style.space(460))
    contentHeight: panel.fittedContentHeight(content.implicitHeight)

    PanelKeyCatcher {
      id: keyCatcher
      anchors.fill: parent
      onCloseRequested: root.close()
      onTabRequested: function(direction) { root.switchPanel(direction) }
      onActivateRequested: root.next()
      onMoveRequested: function(dx, dy) {
        if (dx > 0 || dy > 0) root.next()
        else root.previous()
      }
      onTextKey: function(text) {
        if (text === "r" || text === "R") root.restart()
      }

      Column {
        id: content
        width: parent.width
        spacing: Style.spacing.panelGap

        // ---- Header: title and the four mystery sets.
        Item {
          width: parent.width
          height: setRow.height

          Row {
            anchors.left: parent.left
            anchors.verticalCenter: parent.verticalCenter
            spacing: Style.space(8)

            Cross {
              anchors.verticalCenter: parent.verticalCenter
              size: Style.font.heading
              color: root.accent
            }

            Text {
              anchors.verticalCenter: parent.verticalCenter
              textFormat: Text.PlainText
              text: root.t.ui.title
              color: root.fg
              font.family: root.fontFamily
              font.pixelSize: Style.font.heading
              font.bold: true
            }
          }

          Row {
            id: setRow
            anchors.right: parent.right
            spacing: Style.spacing.xs

            Repeater {
              model: Rosary.SETS

              Button {
                required property string modelData
                text: root.t.mysteries[modelData].short
                selected: root.setId === modelData
                foreground: root.fg
                fontFamily: root.fontFamily
                fontSize: Style.font.bodySmall
                tooltipText: modelData === root.todaySet ? root.t.mysteries[modelData].name + " (" + root.t.ui.today + ")" : root.t.mysteries[modelData].name
                onClicked: root.chooseSet(modelData)

                // The day's set gets a dot under its name.
                Rectangle {
                  visible: modelData === root.todaySet
                  width: Style.space(4)
                  height: width
                  radius: width / 2
                  color: root.accent
                  anchors.horizontalCenter: parent.horizontalCenter
                  anchors.bottom: parent.bottom
                  anchors.bottomMargin: Style.space(1)
                }
              }
            }
          }
        }

        PanelSeparator { foreground: root.fg }

        // ---- Decade dots: where we are among the five mysteries.
        Row {
          anchors.horizontalCenter: parent.horizontalCenter
          spacing: Style.space(10)

          Repeater {
            model: 5

            Rectangle {
              required property int index
              readonly property bool done: root.finished || root.current.section === "outro" || index < root.current.decade
              readonly property bool here: !root.finished && index === root.current.decade
              width: Style.space(here ? 12 : 9)
              height: width
              radius: width / 2
              anchors.verticalCenter: parent.verticalCenter
              color: here ? root.accent : done ? root.fg : "transparent"
              border.width: 1
              border.color: here ? root.accent : Qt.darker(root.fg, 1.4)

              MouseArea {
                anchors.fill: parent
                anchors.margins: -Style.space(4)
                cursorShape: Qt.PointingHandCursor
                onClicked: root.goTo(Rosary.firstStepOfDecade(index))
              }
            }
          }
        }

        // ---- Group title and mystery details.
        Column {
          width: parent.width
          spacing: Style.spacing.sm
          visible: !root.finished

          PanelSectionHeader {
            width: parent.width
            text: root.groupTitle.toUpperCase()
            foreground: root.fg
            fontFamily: root.fontFamily
            wrapMode: Text.WordWrap
          }

          Text {
            visible: root.mystery !== null
            width: parent.width
            textFormat: Text.PlainText
            // Non-breaking spaces keep the reference ("Mt 3, 13-17") on one line.
            text: root.mystery ? I18n.format(root.t.ui.fruit, root.mystery.fruit) + "\u00A0 · " + root.mystery.ref.replace(/ /g, "\u00A0") : ""
            color: Qt.darker(root.fg, 1.2)
            font.family: root.fontFamily
            font.pixelSize: Style.font.bodySmall
            font.italic: true
            wrapMode: Text.WordWrap
          }
        }

        // ---- Beads of the current group. Done beads are filled, the
        //      current one is the accent color, the rest are outlines.
        Flow {
          width: parent.width
          spacing: Style.space(6)
          visible: !root.finished

          Repeater {
            model: root.groupSteps

            Item {
              required property var modelData
              readonly property bool here: modelData.index === root.step
              readonly property bool done: modelData.index < root.step
              readonly property bool big: modelData.prayer === "ourFather" || modelData.prayer === "creed"
              readonly property bool small: modelData.prayer === "hailMary"
              width: Style.space(18)
              height: Style.space(18)

              Rectangle {
                anchors.centerIn: parent
                visible: parent.big || parent.small
                width: Style.space(parent.big ? 16 : 11)
                height: width
                radius: width / 2
                color: parent.here ? root.accent : parent.done ? root.fg : "transparent"
                border.width: 1
                border.color: parent.here ? root.accent : Qt.darker(root.fg, 1.4)
              }

              // Glory Be, Fatima, Salve and the sign of the cross: a small
              // diamond between the beads, as on most rosaries' chain.
              Rectangle {
                anchors.centerIn: parent
                visible: !parent.big && !parent.small
                width: Style.space(8)
                height: width
                rotation: 45
                color: parent.here ? root.accent : parent.done ? root.fg : "transparent"
                border.width: 1
                border.color: parent.here ? root.accent : Qt.darker(root.fg, 1.4)
              }

              MouseArea {
                anchors.fill: parent
                cursorShape: Qt.PointingHandCursor
                onClicked: root.goTo(parent.modelData.index)
              }
            }
          }
        }

        // ---- The prayer itself.
        Column {
          width: parent.width
          spacing: Style.spacing.md

          Text {
            width: parent.width
            textFormat: Text.PlainText
            text: root.finished ? root.t.ui.finished
              : root.current.prayer === "hailMary"
                ? I18n.format(root.t.ui.hailMaryCount, root.current.bead, root.current.section === "intro" ? 3 : 10)
                : root.prayer.name
            color: root.finished ? root.accent : root.fg
            font.family: root.fontFamily
            font.pixelSize: Style.font.title
            font.bold: true
            wrapMode: Text.WordWrap
          }

          Text {
            visible: !root.finished
            width: parent.width
            textFormat: Text.PlainText
            text: root.prayer.text
            color: root.fg
            font.family: root.fontFamily
            font.pixelSize: Style.font.body
            lineHeight: 1.25
            wrapMode: Text.WordWrap
          }
        }

        PanelSeparator { foreground: root.fg }

        // ---- Navigation.
        Item {
          width: parent.width
          height: navRow.height

          Text {
            anchors.left: parent.left
            anchors.verticalCenter: parent.verticalCenter
            textFormat: Text.PlainText
            text: I18n.format(root.t.ui.step, root.step + 1, Rosary.STEPS.length)
            color: Qt.darker(root.fg, 1.4)
            font.family: root.fontFamily
            font.pixelSize: Style.font.caption
          }

          Row {
            id: navRow
            anchors.right: parent.right
            spacing: Style.spacing.sm

            Button {
              text: root.t.ui.restart
              foreground: root.fg
              fontFamily: root.fontFamily
              bordered: true
              onClicked: root.restart()
            }
            Button {
              text: "‹ " + root.t.ui.previous
              foreground: root.fg
              fontFamily: root.fontFamily
              bordered: true
              enabled: root.step > 0 || root.finished
              opacity: enabled ? 1 : 0.4
              onClicked: root.previous()
            }
            Button {
              text: root.t.ui.next + " ›"
              foreground: root.fg
              fontFamily: root.fontFamily
              bordered: true
              enabled: !root.finished
              opacity: enabled ? 1 : 0.4
              onClicked: root.next()
            }
          }
        }

        Text {
          width: parent.width
          horizontalAlignment: Text.AlignHCenter
          textFormat: Text.PlainText
          text: root.t.ui.keys
          color: Qt.darker(root.fg, 1.6)
          font.family: root.fontFamily
          font.pixelSize: Style.font.caption
        }
      }
    }
  }
}
