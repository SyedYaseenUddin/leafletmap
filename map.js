class LeafletMap {
  
  constructor(elementId) {
    this.map = null;
    this.elementId = elementId;
    const element = document.querySelector(`#${this.elementId}`);
    if (!element) {
      throw 'Element does not exist.'
    }

    this.drawMap();

  }

  drawMap() {
    this.map = L.map(this.elementId).setView([0, 37.9], 6);
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        }).addTo(this.map);
  }
}