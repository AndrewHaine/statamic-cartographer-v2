const mix = require('laravel-mix');

mix.js('resources/js/src/cartographer-fieldtype.js', 'resources/js/dist/cartographer-fieldtype.js')
    .vue({ version: 2 });
