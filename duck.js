var duck = function( selector ) {
  return new duck.core( selector );
};

duck.ready = function ( fn ) {
  if ( document.readyState != 'loading' ){
    fn();
  } else if ( document.addEventListener ) {
    document.addEventListener( 'DOMContentLoaded', fn );
  } else {
    document.attachEvent( 'onreadystatechange', function() {
      if ( document.readyState != 'loading' && document.readyState != 'complete' ) fn();
    } );
  }
};

duck.core = function( selector ) {
  this.el = typeof(selector) === "object" ? selector : document.querySelectorAll( selector );
};

duck.core.prototype = {
  version : 'demo-version-2015-04-17',
  find : function( selector ) {
    this.el = this.el.querySelectorAll( selector );
    return this;
  },
  each : function ( fn ) {
    if ( ! this.el.length ) fn( this.el );
    else for ( var i = 0; i < this.el.length; i ++ ) fn( this.el[i], i );
  },
  on : function ( eventName, handler ) {
    this.each( function( o ) {
      if ( o.addEventListener )
        o.addEventListener( eventName, handler );
      else
        o.attachEvent( 'on' + eventName, function() { handler.call( o ); } );
    } ); 
  },
  off : function ( eventName, handler ) {
    this.each( function( o ) {
      if ( o.removeEventListener )
        o.removeEventListener( eventName, handler );
      else
        o.detachEvent( 'on' + eventName, handler );
    } );
  },
  attr : function( property, value ) {
    if ( value ) this.each( function( o ) {
      o.setAttribute( property, value );
    } );
    else this.el[0].getAttribute( property );
    return this;
  },
  val : function( value ) {
    if ( value ) this.each( function( o ) {
      o.value = value;
    } );
    else this.el[0].value;
    return this;
  },
  html : function ( html ) {
    if ( html ) this.each( function( o ) {
      o.innerHTML = html;
    } );
    else this.el[0].innerHTML;
    return this;
  }
};

duck.extend = function( object ) {
  for ( var key in object ) duck.core.prototype[key] = object[key];
};
