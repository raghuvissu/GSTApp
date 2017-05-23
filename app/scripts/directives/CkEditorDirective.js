(function (module) {
	gst.directives = _.extend(module, {
        CkEditorDirective: function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attr, ngModel) {

                    var ck = CKEDITOR.replace(elm[0]);

                    ck.on('insertElement', function () {
                        //$scope.$apply(function () {
                        //    ngModel.$setViewValue(ck.getData());
                        //});
                        setTimeout(function () {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(ck.getData());
                            });
                        }, 2000);
                    });

                    ngModel.$render = function (value) {
                        ck.setData(ngModel.$modelValue);
                    };
                }
            };
        }
    });
}(gst.directives || {}));

gst.ng.application.directive("ckEditor", [gst.directives.CkEditorDirective]).run(function ($log) {
    $log.info("CkEditorDirective initialized");
});