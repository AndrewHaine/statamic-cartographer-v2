<?php

namespace Statamic\Addons\Cartographer;

use Statamic\Extend\Listener;

class CartographerListener extends Listener
{
    public $events = [
        'cp.add_to_head' => [
			'injectCartographerStyles',
			'injectGMapsScript',
			'injectMapboxGLJSFiles'
		]
	];

    /**
     * Return a <link> tag containing the addon stylesheet
     * @return string
     */
    public function injectCartographerStyles()
    {
        $stylesheet = $this->css->url('cartographer.css');
        $tag = "<link rel='stylesheet' type='text/css' href='{$stylesheet}'>";
        return $tag;
	}

	/**
	 * Load in the Google Maps API script
	 * @return string|false
	 */
	public function injectGMapsScript()
	{
		$api_key = $this->getConfig('google_maps_api_key');
		$script = "https://maps.googleapis.com/maps/api/js?key={$api_key}";
		$tag = "<script src='{$script}'></script>";
		return $tag;
	}

	/**
	 * Load the required files for Mapbox GL JS
	 *
	 * @return string|false
	 */
	public function injectMapboxGLJSFiles()
	{
		$access_token = $this->getConfig('mapbox_access_token');
		$scriptTag = "<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js'></script>";
		$cssLink = "<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css' rel='stylesheet' />";
		return implode('', [$scriptTag, $cssLink]);
	}
}
