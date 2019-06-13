function initGmaps () {

    function initCartographerGoogleMaps() {
        var cartographer_google_maps = document.querySelectorAll('[data-cartographer-gmap]')
        for (var i = 0; i < cartographer_google_maps.length; i++) {
            var mapData = JSON.parse(cartographer_google_maps[i].innerText);
            renderCartographerGoogleMap(mapData);
        }
    }

    function renderCartographerGoogleMap(data) {
        var map = new google.maps.Map(document.getElementById(data.id), {
            center: data.center,
            mapTypeId: data.map_type_id,
            icon: data.icon,
            styles: data.custom_styles || [],
            zoom: data.zoom
        });

        for (var i = 0; i < data.markers.length; i++) {
            var marker = data.markers[i];
            new google.maps.Marker({
                id: marker.id,
                map: map,
                icon: marker.icon,
                label: marker.label,
                position: new google.maps.LatLng(marker.position)
            })
        }
    }

    var script = document.createElement('script'),
        apiKey = document.querySelector('meta[type="cartographer_gmaps_api_key"]');
    script.type = 'text/javascript';
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey.getAttribute('content');
    script.onload = initCartographerGoogleMaps;
    document.getElementsByTagName('head')[0].appendChild(script);
};


initGmaps();
