/**
 * ШРИ 2014. Екатеринбург. D3. Броуновское движение
 * 
 * @author Artem Kuzvesov <arktuz@gmail.com>
 * @version 0.01
 * @copyright Artem Kuzvesov 2014
 * 
 */
define(['jquery',
        'd3'], function($, d3) {

    /**
     * Конструктор возвращаемого объекта
     * @constructor
     */
    Сhaos = function() {

        /**
         * randomizer генератор случайных целых чисел
         * @param  {number} min минимальное значение
         * @param  {number} max максимальное значени
         * @return {number}     случайное число между min и max
         */
        function randomizer(min, max) {
            return (Math.floor(Math.random() * (Number(max) - Number(min) + 1))) + Number(min);
        }

        var svg          = d3.select("svg"),
            svgWidth     = svg.style("width").replace(/px/, ''),
            svgHeight    = svg.style("height").replace(/px/, ''),
            coordCircles = d3.range(100).map(function() {
                return {
                    // случайное изначальное местоположение
                    x      : randomizer(15, svgWidth-15),
                    y      : randomizer(15, svgHeight-15),
                    radius : randomizer(5, 15),
                    // скорость
                    speedX : randomizer(1, 5),
                    speedY : randomizer(1, 5),
                    cursor : false
                };
            }),
            circles = addCircles(svg);

        /**
         * Расставляем кргуги по полю
         * @param svg - элемент D3 поле svg
         * @returns круги
         */
        function addCircles(svg) {
            var circles = svg.selectAll("circle")
                .data(coordCircles.slice(0))
                .enter().append("circle")
                .attr("r", function(d) { return d.radius; })
                .style('fill', '#f90');

            circles.each(function(){
                animateColorChange(d3.select(this), '#f90', '#f00');
            });

            return circles;
        }

        /**
         * Закрашиваем круг плавно из color1 в color2 и наоборот
         * @param circle - элемент круг
         * @param color1 - цвет 1
         * @param color2 - ывет 2
         */
        function animateColorChange(circle, color1, color2){
            circle.transition().duration(randomizer(1000, 5000)).style('fill', color2).each('end', function(){
                animateColorChange(d3.select(this), color2, color1);
            })
        }

        d3.timer(function() {
            /**
             * Рандомное движение кругов
             */
            circles.attr("cx", function(d) {
                d.x += d.speedX;
                // уперлись в рамку
                if (d.x > (svgWidth - d.radius) || d.x < d.radius) {
                    d.speedX = -1 * d.speedX; // меняем направление движения
                }
                return d.x;
            }).attr("cy", function(d) {
                d.y += d.speedY;
                // уперлись в рамку
                if (d.y > (svgHeight - d.radius) || d.y < d.radius) {
                    d.speedY = -1 * d.speedY; // меняем направление движения
                }
                return d.y;
            });
        });
    }

    return Сhaos;
});