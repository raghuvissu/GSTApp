(function (module) {
	gst.controllers = _.extend(module, {
        AssignLoanOfficerController: function (scope, resourceFactory, routeParams, location, dateFilter) {

            scope.loanOfficers = [];
            scope.formData = {};
            scope.loanId = routeParams.id;
            var fields = "id,loanOfficerId,loanOfficerOptions";

            resourceFactory.loanResource.get({loanId: scope.loanId, template: true, fields: fields, staffInSelectedOfficeOnly:true}, function (data) {
                if (data.loanOfficerOptions) {
                    scope.loanOfficers = data.loanOfficerOptions;
                    scope.formData.toLoanOfficerId = data.loanOfficerOptions[0].id;
                }
                scope.data = data;
            });

            scope.cancel = function () {
                location.path('/viewloanaccount/' + scope.loanId);
            };

            scope.submit = function () {
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                this.formData.fromLoanOfficerId = scope.data.loanOfficerId || "";
                this.formData.assignmentDate = dateFilter(this.formData.assignmentDate, scope.df);
                resourceFactory.loanResource.save({command: 'assignloanofficer', loanId: scope.loanId}, this.formData, function (data) {
                    location.path('/viewloanaccount/' + data.loanId);
                });
            };

        }
    });
	gst.ng.application.controller('AssignLoanOfficerController', ['$scope', 'ResourceFactory', '$routeParams', '$location', 'dateFilter', gst.controllers.AssignLoanOfficerController]).run(function ($log) {
        $log.info("AssignLoanOfficerController initialized");
    });
}(gst.controllers || {}));
