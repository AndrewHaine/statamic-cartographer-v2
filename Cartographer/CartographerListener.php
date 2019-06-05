<?php

namespace Statamic\Addons\Cartographer;

use Statamic\Extend\Listener;

class CartographerListener extends Listener
{
    public $events = [
        'cp.add_to_head' => ['injectCartographerStyles', 'injectGMapsScript']
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
	 * Load in the google maps API script
	 * @return string
	 */
	public function injectGMapsScript()
	{
		$api_key = $this->getConfig('google_maps_api_key');
		$script = "https://maps.googleapis.com/maps/api/js?key={$api_key}";
		$tag = "<script src='{$script}'></script>";
		return $tag;
	}
}
