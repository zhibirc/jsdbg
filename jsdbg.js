(function (root, undefined) {
    /** Available names for module name. */
    var fit_names = ['DBG', 'DEBUG', 'DEBUGGER'],
        dbg_control = fit_names.forEach(function (elem) {
          if (root[elem] === undefined) {
            return root[elem] = {}, root[elem];
          }
        });
   
   /** Verify each method in the native console and add all methods to the custom one. */
   if (typeof console !== 'undefined' ) {
	  $.DBG = {};
	  for (var prop in console) {
		  if (Object.prototype.hasOwnProperty.call(console, prop)) {
			  Object.defineProperty($.DBG, prop, {
				  enumerable: false,
                  configurable: false,
                  writable: false,
				  value: console[prop] 
			  });
		  }
	  }
  }
  return dbg_control;
}(window));