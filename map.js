class LeafletMap {
  constructor(elementId) {
    this.HEAT_LAYER_CLASS = 'leaflet-heatmap-layer';
    this.map = null;
    this.heatLayer = null;
    this.markers = null;
    this.markerCluster = null;
    this.elementId = elementId;
    const element = document.querySelector(`#${this.elementId}`);
    if (!element) {
      throw 'Element does not exist.';
    }

    this.latlanData = [
      {
        lat: 0.5,
        lon: 37.5,
        intensity: 0.5,
        popup: 'Point 1 - Some information here',
      },
      { lat: 0.6, lon: 37.6, intensity: 0.8, popup: 'Point 2 - More details' },
      {
        lat: 0.7,
        lon: 37.7,
        intensity: 1.0,
        popup: 'Point 3 - Additional info',
      },
    ];
    this.drawMap();
    this.updateMapLayers();
    this.onMapZoom();
  }

  onMapZoom() {
    this.map.on('zoomend', () => {
      this.updateMapLayers();
    });
  }

  drawMap() {
    this.map = L.map(this.elementId).setView([0, 37.9], 6);
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution:
        '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
    }).addTo(this.map);
  }

  drawHeatLayer() {
    this.heatLayer = L.heatLayer(
      this.latlanData.map(function (point) {
        return [point.lat, point.lon, point.intensity];
      }),
      {
        radius: 25,
        blur: 15,
        maxZoom: 10,
      }
    ).addTo(this.map);
  }

  removeHeatLayer() {
    if (this.heatLayer) {
      // setTimeout(() => {
      //   this.map.removeLayer(this.heatLayer);
      // }, 1000)
      this.map.eachLayer((layer) => {
        if (layer._canvas) {
          debugger;
        }
      });
      // this.heatLayer = null;
    }
  }

  drawMarker() {
    this.markers = this.latlanData.map((point) => {
      const marker = L.marker([point.lat, point.lon]);
      marker.bindPopup(point.popup);
      return marker;
    });

    this.markerCluster = L.markerClusterGroup();
    this.markerCluster.addLayers(this.markers);
    this.map.addLayer(this.markerCluster);
  }

  removeMarkers() {
    if (this.markers && this.markerCluster) {
      this.markerCluster.removeLayer(this.markers);
      this.map.removeLayer(this.markerCluster);
      // this.markers = null;
      // this.markerCluster = null;
    }
  }

  updateMapLayers() {
    const zoomLevel = this.map.getZoom();
    if (zoomLevel > 9) {
      this.drawMarker();
      this.removeHeatLayer();
    } else {
      this.drawHeatLayer();
      this.removeMarkers();
    }
  }
}
