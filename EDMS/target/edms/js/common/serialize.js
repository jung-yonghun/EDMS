/**
 * @param $
 */
(function($){
	$.fn.serializeObject = function(){
		var o = Object.create(null);
		var elementMapper = function(element){
			element.name = $.camelCase(element.name);
			return element;
		};
		var appendToResult = function(i, element){
			var node = o[element.name];

			if('undefined' != typeof node && node !== null){
				o[element.name] = node.push ? node.push(element.value) : [ node, element.value ];
			}else{
				o[element.name] = element.value;
			}
		};

		$.each($.map(this.serializeArray(), elementMapper), appendToResult);
		return o;
	};

	$.fn.serializeAll = function(){
        var rselectTextarea = /^(?:select|textarea)/i;
        var rinput 			= /^(?:color|date|datetime|datetime-local|email|file|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
        var rCRLF 			= /\r?\n/g;

        var arr = this.map(function(){
            return this.elements ? jQuery.makeArray( this.elements ) : this;
        })
        .filter(function(){
            return this.name && !this.disabled &&
                ( this.checked || rselectTextarea.test( this.nodeName ) ||
                    rinput.test( this.type ) );
        })
        .map(function( i, elem ){
            var val = jQuery( this ).val();

            return val == null ?
                null :
                jQuery.isArray( val ) ?
                    jQuery.map( val, function( val, i ){
                        return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                    }) :
                    { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
        }).get();

        return arr;
    }
})(jQuery);