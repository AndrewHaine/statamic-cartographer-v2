<?php

namespace Statamic\Addons\Cartographer;

use Statamic\Extend\Tags;
use Illuminate\Support\Facades\Log;

class CartographerTags extends Tags
{
	/**
	 * Top level tag - render a google map
	 *
	 * @return string
	 */
	public function index()
	{
		if(!$data = $this->get_data()) return;
		switch($data['mode']) {
			case 'mapbox':
				return $this->view('cartographer_mapbox_map', $data);
			case 'google':
			default:
				return $this->view('cartographer_google_map', $data);
		}
	}

	/**
	 * Return the components of the map as "parts"
	 *
	 * @return string
	 */
	public function parts()
	{
		if(!$data = $this->get_data()) return;
		$parsedData = $this->parse([
			'api_key' => $data['api_key'],
			'center' => $data['center'],
			'id' => $data['id'],
			'markers' => $data['markers'],
			'metadata' => [
				'map_type_id' => $data['map_type_id'],
				'styles' => $data['custom_styles'],
				'zoom' => $data['zoom'],
			]
		]);
		return $parsedData;
	}

	/**
	 * Return a dump of all the data in the field
	 *
	 * @return string
	 */
	public function dump()
	{
		if(!$data = $this->get_data(true)) return;
		return json_encode($data);
	}

	/**
	 * Compile all required data
	 *
	 * @return array
	 */
	private function get_data($map_only = false)
	{
		$fieldName = $this->getParam('field');
		$ctx = $this->context;

		if(!array_key_exists($fieldName, $ctx)) {
			Log::error("[Cartographer] Attempted to get field \"{$fieldName}\" which doesn't exist in the current context");
			return false;
		}

		$map_data = collect($ctx[$fieldName]);

		$api_key = $this->getConfig('google_maps_api_key', '');
		$mapbox_access_token = $this->getConfig('mapbox_access_token', '');
		$gmaps_script = $this->js->url('cartographer_google_maps');
		$mapbox_script = $this->js->url('cartographer_mapbox');

		if($map_only) {
			return $map_data->merge(['api_key' => $api_key])->all();
		}

		$center = $map_data->get('center');
		$mode = $map_data->get('mode', 'google');
		if($mode === 'google') {
			$custom_styles = json_decode($map_data->get('map_styles', ""));
		} else {
			$custom_styles = $map_data->get('map_styles', "");
		}
		$markers = $map_data->get('markers', []);
		$map_type_id = $map_data->get('map_type_id');
		$zoom_level = $map_data->get('zoom_level');

		// Get data from params
		$classes = $this->getParam('classes', '');
		$id = uniqid('cartographer_field_');
		$height = $this->getParam('height', '500px');
		$width = $this->getParam('width', 'auto');
		$zoom = $this->getParamInt('zoom', $zoom_level);

		return compact(
			'api_key',
			'center',
			'classes',
			'custom_styles',
			'id',
			'gmaps_script',
			'height',
			'markers',
			'map_type_id',
			'mapbox_access_token',
			'mapbox_script',
			'mode',
			'width',
			'zoom'
		);
	}
}
