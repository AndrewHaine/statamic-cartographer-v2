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
        });

        var controlsMap = {
            fullscreenControl: new mapboxgl.FullscreenControl(),
            navigationControl: new mapboxgl.NavigationControl(),
            scaleControl: new mapboxgl.ScaleControl()
        }

        data.controls.forEach(control => {
            if(controlsMap[control]) {
                map.addControl(controlsMap[control]);
            }
        });

        data.markers.forEach(marker => {
            const markerOptions = {
                color: marker.color
            };


            if(marker.icon) {
                const markerEl = document.createElement('div');
                markerEl.classList.add('cartographer-mapbox-marker');
                markerEl.style.backgroundImage = `url('${marker.icon}')`;
                markerOptions['element'] = markerEl;
            }

            var markerObject = new mapboxgl.Marker(markerOptions);
            markerObject.setLngLat([marker.position.lng, marker.position.lat]).addTo(map);
        });
    }

    var cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('href', 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css');

    const markerStyle = document.createElement('style');
    markerStyle.innerText = ".cartographer-mapbox-marker{background-size:contain;background-position:50% 50%;background-repeat: no-repeat;width: 45px;height: 45px;cursor: pointer;}"

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js";
    script.onload = initCartographerMapbox;
    for(var i = 0; i < 3; i++) {
        document.getElementsByTagName('head')[0].appendChild([cssLink, script, markerStyle][i]);
    }
};


initMapbox();
