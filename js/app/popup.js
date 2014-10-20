/**
 * ШРИ 2014. Екатеринбург. PopUp
 * 
 * @author Artem Kuzvesov <arktuz@gmail.com>
 * @version 0.01
 * @copyright Artem Kuzvesov 2014
 * 
 */
define(['jquery'], function($) {

    var $btnClose  = $('.popup-close'),
        $backPopUp = $('.popup-back'),
        $btnPopUp1 = $('.btn-popup1'),
        $btnPopUp2 = $('.btn-popup2'),
        $btnPopUp3 = $('.btn-popup3'),
        $btnPopUp4 = $('.btn-popup4');

    /**
     * Конструктор возвращаемого объекта
     * @constructor
     */
    Popup = function() {
        /** Обработка клика по кнопке "Вариант 1" */
        $btnPopUp1.click($.proxy(this.openPopUp, this));

        /** Обработка клика по кнопке "Вариант 2" */
        $btnPopUp2.click($.proxy(this.openPopUp, this));

        /** Обработка клика по кнопке "Вариант 3" */
        $btnPopUp3.click($.proxy(this.openPopUp, this));

        /** Обработка клика по кнопке "Вариант 4" */
        $btnPopUp4.click($.proxy(this.openPopUp, this));

        /** Обработка клика по кнопке закрыть PopUp */
        $btnClose.click($.proxy(this.closePopUp, this));

        /** Обработка клика при щелчке вне PopUp окна */
        $backPopUp.click($.proxy(this.closePopUp, this));
    }


    /**
     * @param className [строка] - класс объекта
     * @param view [число] - 1 - показать блок, иное - скрыть блок
     */
    function openClosePopup(className, view) {
        if (className.length) {
            var numPopUp = className.match(/\d+/)[0];
            if (numPopUp.length && $('.popup' + numPopUp).length) {
                if (view === 1) {
                    if (Number(numPopUp) === 2) {
                        $('.popup' + numPopUp).css('display', 'flex');
                        console.log(numPopUp)
                    } else {
                        $('.popup' + numPopUp).show();
                    }
                    $backPopUp.addClass('backPopUp' + numPopUp);
                } else {
                    $('.popup' + numPopUp).hide();
                    $backPopUp.removeClass('backPopUp' + numPopUp);
                }
            }
        }
    }

    /**
     * События, которые происходят при клике по кнопке проигрывания видео
     */
    Popup.prototype.openPopUp = function(event) {
        $backPopUp.show();
        openClosePopup(event.target.className, 1);
    }

    /**
     * События, которые происходят при закрытии PopUp окно
     */
    Popup.prototype.closePopUp = function(event) {
        $backPopUp.hide();
        openClosePopup(event.target.className, 0);
    }

    return Popup;
});