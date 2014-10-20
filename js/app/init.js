require(['jquery',
         'app/popup',
         'app/chaos',
         'jquery.equalizer'], function($, Popup, Сhaos) {
    $(document).ready(function () {
        new Popup();
        $('.eq-element').setEqualizer(1000, 2);
        new Сhaos();
    });
});
