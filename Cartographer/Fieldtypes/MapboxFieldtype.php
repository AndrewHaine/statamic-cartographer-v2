<?php

namespace Statamic\Addons\Cartographer\Fieldtypes;

use Statamic\Extend\Fieldtype;

class MapboxFieldtype extends Fieldtype
{
	public $categories = ['special', 'maps'];

	public function getFieldtypeName()
	{
		return 'Mapbox';
	}

	public function blank()
	{
		return [
			'center' => [ "lat" => 52.6318051, "lng" => 1.296734 ],
			'markers' => [],
			'map_styles' => 'mapbox://styles/mapbox/streets-v11',
			'search_enabled' => true,
			'zoom_level' => 4,
		];
	}

	public function preProcess($data)
	{
		$data['access_token'] = $this->getConfig('mapbox_access_token', '');
		return $data;
	}

	public function process($data)
	{
		unset($data['access_token']);
		return $data;
	}
}
