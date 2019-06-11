<div id="{{ $id }}" class="{{ $classes }}" style="width:{{ $width }};height:{{ $height }}"></div>
<script>

	if(typeof window.statamic_cartographer_gmaps === 'undefined') {
		window.statamic_cartographer_gmaps = [];
	}

	window.statamic_cartographer_gmaps.push({
		center: <?php echo json_encode($center); ?>,
		id: "{{ $id }}",
		map_type_id: "{{ $map_type_id }}",
		markers: <?php echo json_encode($markers); ?>,
		@if ($custom_styles)
		styles: JSON.parse(<?php echo json_encode($custom_styles); ?>),
		@endif
		zoom: "{{ $zoom }}"
	});

	function attachGmapsScriptTag() {
		if ( window.statamic_cartographer_gmaps_scripted ) return;
		var scriptTag = document.createElement('script');
		var mapSrc = "https://maps.googleapis.com/maps/api/js?key={{ $api_key }}&callback=initCartographerGoogleMaps";
		scriptTag.src = mapSrc;
		document.getElementsByTagName('head')[0].appendChild(scriptTag);
		window.statamic_cartographer_gmaps_scripted = true;
	}

	function initCartographerGoogleMaps() {
		for(var i = 0; i < window.statamic_cartographer_gmaps.length; i++) {
			renderCartographerGoogleMap(window.statamic_cartographer_gmaps[i]);
		}
	}

	function renderCartographerGoogleMap(data) {
		var map = new google.maps.Map(document.getElementById(data.id), {
			center: data.center,
			mapTypeId: data.map_type_id,
			styles: data.styles || [],
			zoom: parseInt(data.zoom)
		});

		for(var i = 0; i < data.markers.length; i++) {
			var marker = data.markers[i];
			new google.maps.Marker({
				id: marker.id,
				map: map,
				position: new google.maps.LatLng(marker.position)
			})
		}
	}

	attachGmapsScriptTag();
</script>
