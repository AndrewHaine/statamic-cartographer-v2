<?php

namespace AndrewHaine\StatamicCartographer\Fieldtypes;

use Statamic\Fields\Fieldtype;

class CartographerFieldtype extends Fieldtype
{
    protected $icon = 'pin';

    protected $default_center = [ "lat" => 52.6318051, "lng" => 1.296734 ];

    protected function configFieldItems(): array
    {
        return [
            'mode' => [
                'type' => 'select',
                'display' => 'Mode',
                'instructions' => 'Which type of map would you like to use?',
                'default' => 'google',
                'options' => [
                    'google' => 'Google Maps',
                    'mapbox' => 'Mapbox'
                ]
            ],
            'default_center' => [
                'type' => 'array',
                'width' => '50',
                'keys' => [
                    'lat' => 'Lat',
                    'lng' => 'Lng'
                ]
            ]
        ];
    }

    public function preload()
    {
        return [
            'mode' => collect($this->config())->get('mode', 'google'),
            'default_center' => collect($this->config())->get('default_center', $this->default_center),
            'google_api_key' => config('cartographer.google_maps_api_key')
        ];
    }


    public function preProcess($data)
    {
        return $data;
    }

    public function process($data)
    {
        return $data;
    }
}
