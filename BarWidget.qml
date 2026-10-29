import QtQuick
import qs.Commons
import qs.Ui

// Bar entry point: a cross, followed by the decade and bead while a rosary is
// under way. Left click opens the panel, middle click starts over.
// Panel.qml owns the state; this widget only reads it back.
BarWidget {
  id: root
  moduleName: "io.github.creal73.rosary"

  readonly property string progress: panelLoader.item && setting("showProgress", true) && !vertical
    ? panelLoader.item.barLabel : ""

  // Shape contract for shell.summon/hide/toggle routing: the bar looks for
  // open/close/opened on the bar-widget root.
  readonly property bool opened: panelLoader.item ? panelLoader.item.opened === true : false
  readonly property bool popoutSwitchClosing: panelLoader.item ? panelLoader.item.popoutSwitchClosing === true : false

  function open() { if (panelLoader.item) panelLoader.item.open() }
  function close() { if (panelLoader.item) panelLoader.item.close() }
  function togglePanel() { if (panelLoader.item) panelLoader.item.toggle() }
  function closeForPopoutSwitch() { if (panelLoader.item) panelLoader.item.closeForPopoutSwitch() }

  function injectPanel() {
    var target = panelLoader.item
    if (!target) return
    target.bar = root.bar
    target.settings = root.settings
    target.anchorItem = button
    target.hostWidget = root
  }

  implicitWidth: button.implicitWidth
  implicitHeight: button.implicitHeight

  onBarChanged: injectPanel()
  onSettingsChanged: injectPanel()

  Loader {
    id: panelLoader
    active: true
    source: Qt.resolvedUrl("Panel.qml")
    visible: false
    onLoaded: {
      root.injectPanel()
      Qt.callLater(root.injectPanel)
    }
  }

  WidgetButton {
    id: button
    anchors.fill: parent
    bar: root.bar
    labelVisible: false
    hasVisualContent: true
    horizontalMargin: 8.75
    fixedWidth: root.vertical ? -1 : glyphs.implicitWidth + scaledHorizontalMargin * 2
    tooltipText: panelLoader.item && !root.opened ? panelLoader.item.tooltip : ""

    onPressed: function(b) {
      if (b === Qt.MiddleButton) { if (panelLoader.item) panelLoader.item.restart() }
      else root.togglePanel()
    }

    Row {
      id: glyphs
      anchors.centerIn: parent
      spacing: Style.space(6)

      Cross {
        anchors.verticalCenter: parent.verticalCenter
        size: Style.bar.iconFont
        color: button.foreground
      }

      Text {
        visible: root.progress !== ""
        anchors.verticalCenter: parent.verticalCenter
        textFormat: Text.PlainText
        text: root.progress
        color: button.foreground
        font.family: button.fontFamily
        font.pixelSize: button.fontSize
        renderType: Text.NativeRendering
      }
    }
  }
}
