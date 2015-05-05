import QtQuick 2.0

Rectangle {
    id: rectangle2
    width: 380
    height: 850
    color: "#000000"

    property string queryText
    property bool queryBarEnabled: true
    Item {
        id: queryBar
        x: 96
        y: 8
        width: parent.width - 40
        height: 42
        anchors.horizontalCenterOffset: 0
        anchors.horizontalCenter: parent.horizontalCenter
        visible: true
        Rectangle {
            id: rectangle1
            color: "#09bcdf"
            anchors.fill: parent
        }
        Text {
            x: 32
            y: 13
            color: "#ffffff"
            text: queryBarEnabled ? queryText : ""
            font.pointSize: 10
        }
        Image {
            id: image2
            width: 16
            height: queryBarEnabled ? 16 : 0
            anchors.verticalCenterOffset: 0
            anchors.left: parent.left
            anchors.leftMargin: 10
            anchors.verticalCenter: parent.verticalCenter
            source: "search_icon_white_sm.png"
        }
    }


    ListView {
        id: locationResultListView
        height: 800
        anchors.top: queryBarEnabled ? queryBar.bottom : parent.top
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        anchors.rightMargin: 0
        anchors.leftMargin: 0
        anchors.topMargin: queryBarEnabled ? 7 : 0
        anchors.bottomMargin: 0
        model: locationSearchResult
        clip: true
        delegate: LocationsResultDelegate {
            width: parent.width
            height: 50
        }
    }
    ScrollBar {
        flk: locationResultListView
    }
}
