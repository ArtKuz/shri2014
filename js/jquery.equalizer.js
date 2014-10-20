/**
 * ШРИ 2014. Екатеринбург. Equalizer jQuery Plugin
 *
 * @author Artem Kuzvesov <arktuz@gmail.com>
 * @version 0.01
 * @copyright Artem Kuzvesov 2014
 *
 */
(function($) {
    /**
     * @param timeout {number} - таймаут между измениями
     * @param colWidth {number} - ширина 1 столбика
     * @returns {*}
     */
	$.fn.setEqualizer = function (timeout, colWidth) {
		return this.each(function () {
            /**
             * @type {*|HTMLElement} выбранный элемент
             */
			var selector       = $(this),
                selectorHeight = selector.height(),
                middleLine     = true;

			if (!colWidth || colWidth < 0) {
				colWidth = 1;
			}

			if (!timeout || timeout < 0) {
				timeout = 1000;
			}

            selector.addClass('equalizer-box').css({
                lineHeight       : selector.height() + 'px'
            });

            /**
             *
             * @type {number} - количество столбиков
             */
			var colQuantity = Math.ceil(selector.width() / colWidth);

			for (var i = 0; i < colQuantity; i++) {
				var span = $('<span class="equalizer-column"/>').appendTo(this).css({
                    width                         : colWidth,
                    '-webkit-transition-duration' : timeout+"ms",
                    '-moz-transition-duration'    : timeout+"ms",
                    '-o-transition-duration'      : timeout+"ms",
                    'transition-duration'         : timeout+"ms"
                });
			}

            /**
             * Эквалайзер, меням высоту колонок
             */
            function equalize() {
                selector.find('.equalizer-column').each(function(){
                    if (middleLine) {
                        $(this).css('height', Math.round(selectorHeight / 2));
                    } else {
                        $(this).css('height', randomHeight(selectorHeight));
                    }
                });
                middleLine ? middleLine = false : middleLine=true;
                setTimeout(equalize, timeout);
            }
            equalize();
        });
	};

    /**
     * @param height {number} - максимальная высота блока
     * @returns {number} - рандомное значение от высоты блока
     */
    function randomHeight(height) {
        return Math.round(height * Math.random());
    }

})(jQuery);