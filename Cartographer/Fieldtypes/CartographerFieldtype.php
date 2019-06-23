<?php

namespace Statamic\Addons\Cartographer\Fieldtypes;

use Statamic\Extend\Fieldtype;

class CartographerFieldtype extends Fieldtype
{
	public $category = ['special'];

	public $default_center = [ "lat" => 52.6318051, "lng" => 1.296734 ];

	public function blank()
	{

		$data = [
			'markers' => [],
			'zoom_level' => 4,
		];

		return $data;
	}

	public function preProcess($data)
	{
		$mode = $this->getFieldConfig('mode', 'google');

		$config_center = $this->getFieldConfig('default_center');
		$default_center = empty($config_center) ? $this->default_center : ['lat' => (float)$config_center['lat'], 'lng' => (float)$config_center['lng']];
		$data['center'] = array_get($data, 'center', $default_center);

		if ($mode === 'mapbox') {
			$data = $this->processMapboxFieldDefaults($data);
		} elseif ($mode === 'google') {
			$data = $this->processGoogleMapsFieldDefaults($data);
		}
		return $data;
	}

	public function process($data)
	{
		unset($data['search_enabled'], $data['api_key'], $data['access_token']);
		return $data;
	}

	public function processGoogleMapsFieldDefaults($data = []) {
		$data['map_type_id'] = array_get($data, 'map_type_id', 'roadmap');
		$data['map_controls'] = array_get($data, 'map_controls', ['mapTypeControl', 'zoomControl']);
		$data['api_key'] = $this->getConfig('google_maps_api_key', '');
		$data['search_enabled'] = $this->getConfigBool('google_maps_geocoding_enabled', false);
		return $data;
	}

	public function processMapboxFieldDefaults($data = []) {
		$data['access_token'] = $this->getConfig('mapbox_access_token', '');
		$data['map_controls'] = array_get($data, 'map_controls', []);
		$data['map_styles'] = array_get($data, 'map_styles', 'mapbox://styles/mapbox/streets-v11');
		$data['search_enabled'] = true; // Always on!
		return $data;
	}
}
