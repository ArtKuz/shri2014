require.config({
    paths: {
        jquery     : 'vendor/jquery-1.11.1.min',
        d3         : 'vendor/d3.min',
        app        : 'app'
    },
    shim: {
        'jquery.equalizer': ['jquery']
    }
});

require(['app/init']);