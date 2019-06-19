# Cartographer Documentation

## Installation

Once you have a license for the addon, download the addon files from the Marketplace. The 'Cartographer' directory should be placed in you site/addons folder.

You will then need to input your API keys for either Google Maps or Mapbox (or both!). These will need to be copied into the relevant boxes within the addon settings in the control panel.

_Plese note:_ For google maps geocoding to work you will need to enable the Geocoding API on your cloud project, in addition API keys with referrer restrictions are not allowed to make requests to the geocoding API. No extra configuration is required for Mapbox Geocoding!

## Usage

Add the Cartographer fieldtype to any of your fieldsets as you would any other field, you may toggle between using Google Maps or Mapbox in the 'Extras' tab when editing the field. The data is standardised on the backend so you may switch between the two at your own leisure.

### A brief overview

|             | Google Maps                                                                 | Mapbox                                                                  | Both                                                                    |
| ----------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Set center  | Drag circular icon                                                          | Drag yellow marker                                                      | Drag map and hit 'set center'                                           |
| Markers     | -                                                                           | -                                                                       | Hit 'add marker' and move into position                                 |
| Styles      | Use SnazzyMaps (or another service) and paste the array into the styles box | Choose from the predefined styles or create your own and paste the link |
| Controls    | -                                                                           | -                                                                       | Check the boxes for the controls you wish to display (under 'Advanced') |
| Geolocation | -                                                                           | -                                                                       | Search for a location and hit `Enter`                                   |

## Tags

For the most part you will only require the main `{{ cartographer field="my_map" }}` tag. This will output a full embedded map - detecting which map library to use. This tag has a number of options that can be passed:

| Parameter | Type    | Description                                              |
| --------- | ------- | -------------------------------------------------------- |
| `field`   | String  | The name of the fieldtype field where the data is stored |
| `classes` | String  | CSS classes to add to the map element                    |
| `width`   | String  | CSS width attribute                                      |
| `height`  | String  | CSS height attribute                                     |
| `zoom`    | Integer | Override the zoom level set in the CP                    |

### Parts

If you would like to control the output of the geodata you can use the `parts` tag which will give you access to each attribute in the map. Example usage of the parts tag is below.

#### Example

```
{{ cartographer:parts field="my_field" }}

    {{ center }}
        {{ lat }}
        {{ lng }}
    {{ /center }}

    {{ markers }}
        {{ id }}
        {{ icon or color }}
        {{ label }}

        {{ position }}
            {{ lat }}
            {{ lng }}
        {{ /position }}
    {{ /markers }}

    {{ options }}
        {{ controls | join:, }}
        {{ styles }}
        {{ zoom }}
    {{ /options }}

{{ /cartographer:parts }}
```

### Parts

| Name                  | Type                         | Description                                                                                                                                                                            |
| --------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`             | String                       | Google maps API key                                                                                                                                                                    |
| `center`              | Array                        | Location for the map center, contains `lat` and `lng` values                                                                                                                           |
| `id`                  | String                       | A generated unique id for the map                                                                                                                                                      |
| `mapbox_access_token` | String                       | Mapbox access token                                                                                                                                                                    |
| `markers`             | Array containing marker data | Each marker in the map, contains the attributes for `label`, `icon` and `colour` (depending on the library used), the `position` attribute will contain the `lat`, `lng` position data |
| options               | Array                        | Metadata for the map, including: `controls`, `map_type_id`, `styles` and `zoom`                                                                                                        |

### Dump

Alternatively use `{{ cartographer:dump }}` to dump the data in a string.
