<?php

namespace Statamic\Addons\Cartographer;

use Statamic\Extend\Fieldtype;

class CartographerFieldtype extends Fieldtype
{

	public $category = ['special'];

	public function blank()
	{
		return [
			'api_key' => $this->getConfig('google_maps_api_key', ''),
			'center' => [ "lat" => 52.6318051, "lng" => 1.296734 ],
			'markers' => [],
			'map_type_id' => 'roadmap',
			'search_enabled' => $this->getConfigBool('google_maps_geocoding_enabled', false),
			'zoom_level' => 10
		];
	}

	public function preProcess($data)
	{
		$data['search_enabled'] = $this->getConfigBool('google_maps_geocoding_enabled', false);
		$data['api_key'] = $this->getConfig('google_maps_api_key', '');
		return $data;
	}

	public function process($data)
	{
		unset($data['search_enabled'], $data['api_key']);
		return $data;
	}

}
