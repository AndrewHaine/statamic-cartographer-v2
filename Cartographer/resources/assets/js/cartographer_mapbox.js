function initMapbox() {

    function initCartographerMapbox() {
        var cartographer_mapbox_maps = document.querySelectorAll('[data-cartographer-mapbox-map]')
        for (var i = 0; i < cartographer_mapbox_maps.length; i++) {
            var mapData = JSON.parse(cartographer_mapbox_maps[i].innerText);
            cartographer_mapbox_maps[i].innerText = '';
            renderCartographerMapboxMap(mapData);
        }
    }

    function renderCartographerMapboxMap(data) {
        var accessToken = document.querySelector('meta[type="cartographer_mapbox_access_token"]');
        mapboxgl.accessToken = accessToken.getAttribute('content');
        var map = new mapboxgl.Map({
            container: data.id,
            style: data.styles,
            center: [data.center.lng, data.center.lat],
            zoom: data.zoom
        })

        for (var i = 0; i < data.markers.length; i++) {
            var marker = data.markers[i];
            var markerObject = new mapboxgl.Marker({
                color: marker.color
            });
            markerObject.setLngLat([marker.position.lng, marker.position.lat]).addTo(map);
        }
    }

    var cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('href', 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css');

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js";
    script.onload = initCartographerMapbox;
    for(var i = 0; i < 2; i++) {
        document.getElementsByTagName('head')[0].appendChild([cssLink, script][i]);
    }
};


initMapbox();
