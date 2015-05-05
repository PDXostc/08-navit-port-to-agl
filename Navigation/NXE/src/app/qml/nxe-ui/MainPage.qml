import QtQuick 2.0
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.2

Item {
    id: mainPageView
    width: 400
    height: 800

    property var locationInfoComponent: null
    property var locationInfoTopComponent: null
    property var locationInfoObject: null
    property var locationInfoTopObject: null
    function finishComponentCreation() {
        if (locationInfoComponent.status === Component.Ready) {
            locationInfoObject = locationInfoComponent.createObject(mainPageView);
            console.debug(locationInfoComponent, locationInfoObject)
            locationInfoObject.anchors.bottom = mainPageView.bottom
            locationInfoObject.anchors.left = mainPageView.left
            locationInfoObject.anchors.right = mainPageView.right
            locationInfoObject.locationComponent = navitProxy.currentlySelectedItem;
        }
    }
    function finishTopComponentCreation() {
        if (locationInfoTopComponent.status === Component.Ready) {
            locationInfoTopObject = locationInfoTopComponent.createObject(mainPageView);
            console.debug(locationInfoTopComponent, locationInfoTopObject)
            locationInfoTopObject.anchors.top = mainPageView.top
            locationInfoTopObject.anchors.left = mainPageView.left
            locationInfoTopObject.anchors.right = mainPageView.right
            locationInfoTopObject.locationComponent = navitProxy.currentlySelectedItem;
        }
    }

    NMenu {
        anchors.left: parent.left
        anchors.top: parent.top
        anchors.topMargin: navitProxy.topBarLocationVisible ? 110 : 70 // parent.width * 0.2 : 70
        onClicked: {
            if (item === "menu") {
                console.debug("menu clicked")
                rootStack.push(settingsView)
            } else if (item === "search") {
                rootStack.push(locationsView)
            } else if (item === "northOrientation") {
                console.debug("North orientation activated")
            } else if (item === "headOrientation") {
                console.debug("Head orientation activated")
            } else if (item === "currentLocation") {
                console.debug("Current location button clicked")
            }
        }
    }

    Connections {
        target: navitProxy
        onCurrentlySelectedItemChanged:{
            console.debug('currently selected changed')
            if(navitProxy.currentlySelectedItem === null) {
                locationInfoComponent.destroy();
                locationInfoTopComponent.destroy();
                locationInfoTopObject.destroy();
                locationInfoObject.destroy();
            }
            else {
                locationInfoComponent = Qt.createComponent("MapLocationInfo.qml");
                locationInfoTopComponent = Qt.createComponent("MapLocationInfoTop.qml");
                if (locationInfoComponent.status === Component.Ready) {
                    finishComponentCreation();
                } else {
                    locationInfoComponent.statusChanged.connect(finishComponentCreation);
                }
                if (locationInfoTopComponent.status === Component.Ready) {
                    finishTopComponentCreation();
                } else {
                    locationInfoTopComponent.statusChanged.connect(finishTopComponentCreation);
                }
            }
        }
    }

    Component {
        id: settingsView
        SettingsView {
            onBackToMapRequest: rootStack.pop()
        }
    }

    Component {
        id: locationsView
        LocationsView {
            onBackToMapRequest: rootStack.pop()
        }
    }
}
