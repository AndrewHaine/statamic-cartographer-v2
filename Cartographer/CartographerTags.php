<?php

namespace Statamic\Addons\Cartographer;

use Statamic\Extend\Tags;

class CartographerTags extends Tags
{
	/**
	 * Top level tag - render a google map
	 *
	 * @return string
	 */
	public function index()
	{
		$data = $this->get_data();
		return $this->view('cartographer_google_map', $data);
	}

	/**
	 * Return a dump of all the data in the field
	 *
	 * @return string
	 */
	public function dump()
	{
		return json_encode($this->get_data(true));
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
		$map_data = $ctx[$fieldName];

		$api_key = $this->getConfig('google_maps_api_key', '');

		if($map_only) {
			return collect($map_data)->merge(['api_key' => $api_key])->all();
		}

		$center = $map_data['center'];
		$markers = $map_data['markers'];
		$map_type_id = $map_data['map_type_id'];

		// Get data from params
		$classes = $this->getParam('classes', '');
		$id = uniqid('cartographer_field_');
		$height = $this->getParam('height', '500px');
		$width = $this->getParam('width', 'auto');
		$zoom = $this->getParamInt('zoom', 10);

		return compact(
			'api_key',
			'center',
			'classes',
			'id',
			'height',
			'markers',
			'map_type_id',
			'width',
			'zoom'
		);
	}
}
