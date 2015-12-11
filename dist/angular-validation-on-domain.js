(function(window, angular, undefined) {
	'use strict';

	angular.module('validation.onDomain', []);

	angular.module('validation.onDomain').directive('onDomain', onDomain);

	function onDomain () {
		return {
			require: '?ngModel',
			restrict: 'A',
			link: function(scope, elm, atr, ctrl) {
				if (!ctrl) {
					if(console && console.warn){
						console.warn('onDomain validation requires ngModel to be on the element');
					}
					return;
				}

				var validDomain = atr.onDomain;

				scope.$watch(getMatchValue, function(){
					ctrl.$$parseAndValidate();
				});

				ctrl.$validators.match = function(){
					return (getMatchValue() === validDomain);
				};

				function getMatchValue() {
					var raw = ctrl.$viewValue,
						split = raw.split('//'),
						pless = !!split[1] ? split[1] : '',
						sleft = pless.split('/'),
						full = !!sleft[0] ? sleft[0] : '',
						domain = (full.indexOf('www.') !== -1) ? full.substr(4) : full;

					return domain;
				}
			}
		};
	}
})(window, window.angular);
