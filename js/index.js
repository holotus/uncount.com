/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.csstransitions=function(){return C("transition")};for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);


angular.module('UncountApp', [])

.value('animateInClass', "animate-in")
.value('animateInOffset', 80)

.controller('TutorialController', ['$log', '$scope', function($log, $scope) {
  $scope.currentTab = 0;
  $scope.isCardOpened = false;


  $scope.$watch('currentTab', function(newValue, oldValue) {
    // reset Card status whenever tab change.
    $scope.isCardOpened = false;
  });


  $scope.tabClicked = function(event, newTab) {
    event.preventDefault();
    $scope.currentTab = newTab;
  };
  $scope.cardTabClicked = function(event) {
    event.preventDefault();
    $scope.isCardOpened = !$scope.isCardOpened;
  };
  $scope.nextPageClicked = function(event) {
    event.preventDefault();
      $scope.currentTab = 2;
      
      $("html, body").animate({ scrollTop: $("#hero-spot").height() }, "slow", function () { 
    });
  };


  // $scope.remaining = function() {
  //   var count = 0;
    
  //   angular.forEach($scope.todos, function(todo) {
  //     count += todo.done ? 0 : 1;
  //   });
    
  //   return count;
  // };

  // $scope.archive = function() {
  //   var oldTodos = $scope.todos;
  //   $scope.todos = [];
    
  //   angular.forEach(oldTodos, function(todo) {
  //     if (!todo.done) $scope.todos.push(todo);
  //   });
  // };

}])

.directive('step', ['$log', '$timeout', '$window', 'animateInOffset', 'animateInClass', function($log, $timeout, $window, animateInOffset, animateInClass){
  return function(scope, element, attrs) {

    var browserSupportsCSSTransition = Modernizr.csstransitions;
    if(browserSupportsCSSTransition)
    {

      var scrollFunction = function() {

        var bottomScrollPosition, windowHeight, windowScrollPosition;
        windowHeight = $(window).height();
        windowScrollPosition = $(window).scrollTop();
        bottomScrollPosition = windowHeight + windowScrollPosition;

        // $log.log($(element).offset().top);

        if ($(element).offset().top + animateInOffset < bottomScrollPosition) {
          $(element).removeClass(animateInClass);
        }

      };

      scope.$watch('currentTab', function(newValue, oldValue) {
        // setup css class.
        element.addClass(animateInClass);

        // Try delaying (move to the end of the queue) the execution of that with $timeout, so the DOM can be manipulated before you get the element's height.
        $timeout(function () {
          scrollFunction();
        });
      });


      // respond to window scroll.
      angular.element($window).bind("scroll", scrollFunction);
 
    }

  };
}])



;