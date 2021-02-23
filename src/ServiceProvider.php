<?php

namespace AndrewHaine\StatamicCartographer;

use Statamic\Providers\AddonServiceProvider;
use AndrewHaine\StatamicCartographer\Fieldtypes\CartographerFieldtype;

class ServiceProvider extends AddonServiceProvider
{
    protected $fieldtypes = [
        CartographerFieldtype::class
    ];

    protected $scripts = [
        __DIR__ . '/../resources/js/dist/cartographer-fieldtype.js'
    ];

    protected $stylesheets = [
        __DIR__ . '/../resources/css/cartographer.css'
    ];

    public function boot()
    {
        parent::boot();

        // Publish config and merge
        $this->mergeConfigFrom(__DIR__ . '/../config/statamic/cartographer.php', 'statamic.cartographer');
        $this->publishes([
            __DIR__ . '/../config/statamic/cartographer.php' => config_path('statamic/cartographer.php'),
        ], 'config');

        // Register the google maps script in the CMS
        if(config('cartographer.google_maps_api_key') !== '') {
            $this->registerExternalScript("https://maps.googleapis.com/maps/api/js?key=" . config('statamic.cartographer.google_maps_api_key'));
        }
    }
}
