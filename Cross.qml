import QtQuick

// A Latin cross drawn with two bars rather than a glyph: U+271D is mapped to
// the color emoji font on most systems, and Qt ignores the text-presentation
// selector, so the cross would ignore the theme's colors.
Item {
  id: root

  property color color: "white"
  property real size: 14
  readonly property real thickness: Math.max(1.5, Math.round(size * 0.16))

  implicitWidth: Math.round(size * 0.7)
  implicitHeight: size

  Rectangle {
    x: (root.width - width) / 2
    width: root.thickness
    height: root.height
    color: root.color
  }

  Rectangle {
    y: Math.round(root.height * 0.28)
    width: root.width
    height: root.thickness
    color: root.color
  }
}
