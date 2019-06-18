<div id="{{ $id }}" class="{{ $classes }}" style="width:{{ $width }};height:{{ $height }};font-size:0" data-cartographer-gmap>
	<?php
		$data = [
			"center" => $center,
			"id" => $id,
			"controls" => $controls,
			"custom_styles" => $custom_styles,
			"map_type_id" => $map_type_id,
			"markers" => $markers,
			"zoom" => $zoom
		];

		echo json_encode($data);
	?>
</div>

<script>
if (!window.statamic_cartographer_gmaps_scripted) {
var metaTag=document.createElement("meta");metaTag.setAttribute("type","cartographer_gmaps_api_key"),metaTag.content="{{ $api_key }}",document.getElementsByTagName("head")[0].appendChild(metaTag);var scriptTag=document.createElement("script");scriptTag.src="{{ $gmaps_script }}",document.getElementsByTagName("head")[0].appendChild(scriptTag),window.statamic_cartographer_gmaps_scripted=!0;
};
</script>
