<div id="{{ $id }}" class="{{ $classes }}" style="width:{{ $width }};height:{{ $height }};font-size:0" data-cartographer-mapbox-map>
	<?php
		$data = [
			"center" => $center,
			"id" => $id,
			"styles" => $custom_styles,
			"markers" => $markers,
			"zoom" => $zoom
		];

		echo json_encode($data);
	?>
</div>

<script>
if (!window.statamic_cartographer_mapbox_scripted) {
var metaTag=document.createElement("meta");metaTag.setAttribute("type","cartographer_mapbox_access_token"),metaTag.content="{{ $mapbox_access_token }}",document.getElementsByTagName("head")[0].appendChild(metaTag);var scriptTag=document.createElement("script");scriptTag.src="{{ $mapbox_script }}",document.getElementsByTagName("head")[0].appendChild(scriptTag),window.statamic_cartographer_mapbox_scripted=!0;
};
</script>
