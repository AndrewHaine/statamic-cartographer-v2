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
        var mapData = {
            container: data.id,
            style: data.styles,
            zoom: data.zoom
        };

        if(!data.autocenter) {
            mapData['center'] = [data.center.lng, data.center.lat];
        }

        var map = new mapboxgl.Map(mapData);

        var controlsMap = {
            fullscreenControl: new mapboxgl.FullscreenControl(),
            navigationControl: new mapboxgl.NavigationControl(),
            scaleControl: new mapboxgl.ScaleControl()
        }

        data.controls.forEach(control => {
            if (controlsMap[control]) {
                map.addControl(controlsMap[control]);
            }
        });

        var markerBounds = new mapboxgl.LngLatBounds();

        data.markers.forEach(marker => {
            var markerObject = new mapboxgl.Marker({
                color: marker.color
            });
            markerObject.setLngLat([marker.position.lng, marker.position.lat]).addTo(map);
            markerBounds.extend([marker.position.lng, marker.position.lat]);
        });

        if(data.autocenter) {
            map.fitBounds(markerBounds, { padding: 20 });
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
