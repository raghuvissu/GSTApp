(function (module) {
	gst.directives = _.extend(module, {
        ApiValidationDirective: function ($compile) {
            return {
                restrict: 'E',
                require: '?ngmodel',
                link: function (scope, elm, attr, ctrl) {
                    var template = '<div class="error" ng-repeat="errorArray in errorDetails" ng-show="errorStatus || errorDetails">' +
                        '<label>' +
                        '{{' + 'errorArray.args.params[0].value'    +' | translate}}' + ' field is required' +
                        '</label>' +
                        '<label ng-show="errorStatus">{{errorStatus}}</label>' +
                        '<label ng-hide="errorStatus" ng-repeat="error in errorArray">' +
                        '{{error.code | translate:error.args}}' +
                        '</label></div>';
                    elm.html('').append($compile(template)(scope));
                }
            };
        }
    });
}(gst.directives || {}));

gst.ng.application.directive("apiValidate", ['$compile', gst.directives.ApiValidationDirective]).run(function ($log) {
    $log.info("ApiValidationDirective initialized");
});