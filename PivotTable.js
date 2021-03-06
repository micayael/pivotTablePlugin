if (jQuery().pivotUI) {
    // Plugin para usar el pivottable.js
    (function ($) {
        $.fn.pivotTable = function (data, options, debug) {

            if(debug !== undefined && debug){
                var devConfig = {
                    onRefresh: function(config) {
                        var config_copy = JSON.parse(JSON.stringify(config));
                        //delete some values which are functions
                        delete config_copy["aggregators"];
                        delete config_copy["renderers"];
                        //delete some bulky default values
                        delete config_copy["rendererOptions"];
                        delete config_copy["localeStrings"];
                        console.log(JSON.stringify(config_copy, undefined, 2));
                    }
                };

                options = $.extend({}, devConfig, options);
            }

            var settings = $.extend({}, $.fn.pivotTable.defaults, options);
            this.each(function (index, element) {

                var el = $(element);

                // callback
                var execute = function(el, json){

                    el.pivotUI(json, {
                        dataClass: settings.dataClass,
                        rows: settings.rows,
                        cols: settings.cols,
                        exclusions: settings.exclusions,
                        inclusions: settings.inclusions,
                        rendererName: settings.rendererName,
                        aggregatorName: settings.aggregatorName,
                        vals: settings.vals,
                        rowOrder: settings.rowOrder,
                        colOrder: settings.colOrder,
                        renderers: settings.renderers,
                        sorters: settings.sorters,
                        derivers: settings.derivers,
                        derivedAttributes: settings.derivedAttributes,
                        rendererOptions: settings.rendererOptions,
                        hiddenAttributes: settings.hiddenAttributes,
                        onRefresh: settings.onRefresh
                    }, false, 'es');
                };

                if('jsonData' in data){

                    execute(el, data.jsonData);

                }else if('url' in data){

                    $.getJSON(data.url, function (json) {

                        execute(el, json);

                    });

                }

            });

            return this;
        };

        $.fn.pivotTable.defaults = {
            dataClass: $.pivotUtilities.SubtotalPivotData,
            rows: [],
            cols: [],
            exclusions: {},
            inclusions: {},
            rendererName: 'Tabla',
            aggregatorName: 'Cuenta',
            vals: [],
            rowOrder: 'key_a_to_z',
            colOrder: 'key_a_to_z',
            derivers: $.pivotUtilities.derivers,
            derivedAttributes: {},
            sorters: {},
            renderers: $.extend(
                $.pivotUtilities.locales.es.renderers,
                $.pivotUtilities.export_renderers,
                $.pivotUtilities.highchart_renderers,
                $.pivotUtilities.subtotal_renderers
            ),
            rendererOptions: {},
            hiddenAttributes: []
        };

        $.fn.pivotTable.sorters = {
            mesesOrdenados: function(){
                return $.pivotUtilities.sortAs(["Enero", "Febrero", "Marzo", "Abril", "Mayo",
                    "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"])
            },
            diasOrdenados: function(){
                return $.pivotUtilities.sortAs(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"])
            }
        };

        $.fn.pivotTable.derivers = {
            numberToMes: function(number) {

                switch (number){
                    case 1: return 'Enero';
                    case 2: return 'Febrero';
                    case 3: return 'Marzo';
                    case 4: return 'Abril';
                    case 5: return 'Mayo';
                    case 6: return 'Junio';
                    case 7: return 'Julio';
                    case 8: return 'Agosto';
                    case 9: return 'Setiembre';
                    case 10: return 'Octubre';
                    case 11: return 'Noviembre';
                    case 12: return 'Diciembre';
                    default: return 'Error';
                }

            }
        };

    }(jQuery));

}