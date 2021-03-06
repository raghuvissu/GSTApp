(function (module) {
	gst.controllers = _.extend(module, {
        UserListController: function (scope, resourceFactory, location) {
            scope.users = [];

            scope.routeTo = function (id) {
                location.path('/viewuser/' + id);
            };

            /* -----Throws error on test-----
             if (!scope.searchCriteria.users) {
             scope.searchCriteria.users = null;
             scope.saveSC();
             }
             scope.filterText = scope.searchCriteria.users;

             scope.onFilter = function () {
             scope.searchCriteria.users = scope.filterText;
             scope.saveSC();
             };*/

            resourceFactory.userListResource.getAllUsers(function (data) {
                scope.users = data;
            });
        }
    });
	gst.ng.application.controller('UserListController', ['$scope', 'ResourceFactory', '$location', gst.controllers.UserListController]).run(function ($log) {
        $log.info("UserListController initialized");
    });
}(gst.controllers || {}));