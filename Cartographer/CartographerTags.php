<?php

namespace Statamic\Addons\Cartographer;

use Statamic\API\Collection;
use Statamic\API\Entry;
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
		return $this->renderMapForMode($this->get_data());
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
			'mapbox_access_token' => $data['mapbox_access_token'],
			'markers' => $data['markers'],
			'options' => [
				'controls' => $data['controls'],
				'map_type_id' => $data['map_type_id'],
				'styles' => $data['custom_styles'],
				'zoom' => $data['zoom'],
			]
		]);
		return $parsedData;
	}

	/**
	 * Collection tag - combine the marker data from the entries in a collection
	 *
	 * @return string
	 */
	public function collection()
	{
		if ($collection_params = $this->getList(['from', 'folder', 'use'])) {

			$field = $this->getParam('field');
			if(!$field) {
				return false;
			}

			if(!Collection::whereHandle($collection_params[0])) {
				$this->parseNoResults();
			};

			$markers = collect($this->getCollection($collection_params[0]))->flatMap(function($entry) use ($field) {
				$map = $entry->get($field);
				return $map ? $map['markers'] : null;
			})->values();

			$addon_meta = $this->getAddonMeta();

			$api_key = $addon_meta['api_key'];
			$mapbox_access_token = $addon_meta['mapbox_access_token'];
			$gmaps_script = $addon_meta['gmaps_script'];
			$mapbox_script = $addon_meta['mapbox_script'];

			$data = [];

			$data['markers'] = $markers;
			$data['api_key'] = $api_key;
			$data['mapbox_access_token'] = $mapbox_access_token;
			$data['gmaps_script'] = $gmaps_script;
			$data['mapbox_script'] = $mapbox_script;
			$data['autocenter'] = true;
			$data['mode'] = $this->getParam('mode');
			$data['id'] = uniqid('cartographer_field_');
			$data['classes'] = $this->getParam('classes', '');
			$data['controls'] = ['zoomControl'];
			$data['custom_styles'] = null;
			$data['height'] = $this->getParam('height', '500px');
			$data['width'] = $this->getParam('width', 'auto');
			$data['zoom'] = $this->getParamInt('zoom', 14);

			if($data['mode'] === 'mapbox') {
				$data['custom_styles'] = 'mapbox://styles/mapbox/streets-v11';
			} else {
				$data['custom_styles'] = null;
				$data['map_type_id'] = $this->getParam('map_type_id', 'roadmap');
			}

			return $this->renderMapForMode($data);

		}

		return $this->parseNoResults();
	}

	protected function getCollection($collectionHandle)
	{
		return Entry::whereCollection($collectionHandle);
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
	 * Return a populated template for a map mode
	 *
	 * @param array $data
	 *
	 * @return string
	 */
	protected function renderMapForMode($data = [])
	{
		if(!$data) return;
		switch($data['mode']) {
			case 'mapbox':
				return $this->view('cartographer_mapbox_map', $data);
			case 'google':
			default:
				return $this->view('cartographer_google_map', $data);
		}
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
		$addon_meta = $this->getAddonMeta();

		$api_key = $addon_meta['api_key'];
		$mapbox_access_token = $addon_meta['mapbox_access_token'];
		$gmaps_script = $addon_meta['gmaps_script'];
		$mapbox_script = $addon_meta['mapbox_script'];

		if($map_only) {
			return $map_data->merge(['api_key' => $api_key])->all();
		}

		$center = $map_data->get('center', []);
		$mode = $map_data->get('mode', 'google');
		if($mode === 'google') {
			$custom_styles = json_decode($map_data->get('map_styles', ""));
		} else {
			$custom_styles = $map_data->get('map_styles', "");
		}
		$markers = $map_data->get('markers', []);
		$controls = $map_data->get('map_controls', ['zoomControl']);
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
			'controls',
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

	/**
	 * Return the addon config data
	 *
	 * @return array
	 */
	private function getAddonMeta()
	{
		$api_key = $this->getConfig('google_maps_api_key', '');
		$mapbox_access_token = $this->getConfig('mapbox_access_token', '');
		$gmaps_script = $this->js->url('cartographer_google_maps');
		$mapbox_script = $this->js->url('cartographer_mapbox');

		return compact(
			'api_key',
			'mapbox_access_token',
			'gmaps_script',
			'mapbox_script'
		);
	}
}
