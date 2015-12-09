var myApplication = angular.module('myApplication', ['ngRoute']);
var userID;
var userDomain;

myApplication.config(function ($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/views/profile.html',
        controller: 'profileController'
    })
    .when('/:user/:domain', {
        templateUrl: '/views/profile.html',
        controller: 'profileController'
    })
     .when('/users', {
         templateUrl: '/views/users.html',
         controller: 'usersController'
     })
    .when('/groups', {
        templateUrl: '/views/groups.html',
        controller: 'groupsController'
    })
    .when('/tasks', {
        templateUrl: '/views/tasks.html',
        controller: 'tasksController'
    })
    .when('/repositories', {
        templateUrl: '/views/repositories.html',
        controller: 'repositoriesController'
    })
    .when('/domains', {
        templateUrl: '/views/domains.html',
        controller: 'domainsController'
    })
});
myApplication.controller('profileController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $("a.list-group-item").removeClass('active');
    $("#a_profile").addClass('active');
    $scope.user = '';
    $scope.userUniqueID = '';
    
    if ($routeParams.user != undefined && $routeParams.user != '') {
        localStorage['userID'] = $routeParams.user;
        userID = $routeParams.user;
    }
    else {
        userID = localStorage['userID'];
    }
    if ($routeParams.domain != undefined && $routeParams.domain != '') {
        localStorage['userDomain'] = $routeParams.domain;
        userDomain = $routeParams.domain;
    }
    else {
        userDomain = localStorage['userDomain'];
    }

    ListUser($scope, $http, userID, userDomain);

    $scope.updateuser = function () {

        UpdateUserProfile($scope, $http, userID, userDomain);
    };
}]);
myApplication.controller('usersController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $("a.list-group-item").removeClass('active');
    $("#a_users").addClass('active');

    if (userDomain == undefined || userDomain == '') { userDomain = localStorage['userDomain'];};
    var theWebAddress = '';
    $scope.users = '';
    $('#lbl_newuser_msg').innerText = '';
    $('#lbl_edituser_msg').innerText = '';

    var theWebAddress = 'https://api.mongolab.com/api/1/databases/iamdb/collections/repository?q={"type":"file"}&apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $.each(result, function (i, val) {
                $('#adduser_repos').append($('<option>', {
                    value: val._id.$oid,
                    text: val.name
                }));
                $('#edituser_repos').append($('<option>', {
                    value: val._id.$oid,
                    text: val.name
                }));
            });
        })
        .error(function (data, status) { console.log(data) });
    
    ListUsers($scope, $http);

    $scope.adduser = function () {

        $("#adduser_repos").select2({
            closeOnSelect: false
        });
        AddUserModal($scope, $http, userDomain);
    };
    $scope.edituser = function (id) {
       
        $.ajax({
            url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/users/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
            type: "GET",
            contentType: "application/json"
        }).success(function (data) {            
            $('#edituser_fname').val(data.firstname);
            $('#edituser_lname').val(data.lastname);
            $('#edituser_email').val(data.email);
            $('#edituser_utype').val(data.usertype);

            $('#edituser_repos option').each(function(){
                if ($.inArray($(this).val(), data.repositories) != -1) {
                    $(this).prop('selected', true);
                };
            });
            $('#edituser_status').val(data.status);
            $("#edituser_repos").select2({
                closeOnSelect: false
            });
            UpdateUserModal(id, $scope, $http);
        }).error(function (data) {
            $('#lbl_edituser_msg')[0].innerText = "Error Occured. Please try again later."
        });        
    };
    $scope.deleteuser = function (id) {
        DeleteUserModal(id, $scope, $http);
    };

}]);
myApplication.controller('groupsController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $("a.list-group-item").removeClass('active');
    $("#a_groups").addClass('active');

    if (userDomain == undefined || userDomain == '') { userDomain = localStorage['userDomain']; };
    var theWebAddress = '';
    $scope.groups = '';
    $('#lbl_newgroup_msg').innerText = '';
    $('#lbl_editgroup_msg').innerText = '';

    theWebAddress = 'https://api.mongolab.com/api/1/databases/iamdb/collections/repository?q={"type":"file"}&apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $.each(result, function (i, val) {
                $('#addgroup_repos').append($('<option>', {
                    value: val._id.$oid,
                    text: val.name
                }));
                $('#editgroup_repos').append($('<option>', {
                    value: val._id.$oid,
                    text: val.name
                }));
            });
        })
        .error(function (data, status) { console.log(data) });

    theWebAddress = 'https://api.mongolab.com/api/1/databases/iamdb/collections/users?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $.each(result, function (i, val) {
                $('#addgroup_users').append($('<option>', {
                    value: val._id.$oid,
                    text: val.email
                }));
                $('#editgroup_users').append($('<option>', {
                    value: val._id.$oid,
                    text: val.email
                }));
            });
        })
        .error(function (data, status) { console.log(data) });

    ListGroups($scope, $http);

    $scope.addgroup = function () {

        $("#addgroup_repos").select2({
            closeOnSelect: false
        });
        $("#addgroup_users").select2({
            closeOnSelect: false
        });
        AddGroupModal($scope, $http, userDomain);
    };
    $scope.editgroup = function (id) {

        $.ajax({
            url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/groups/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
            type: "GET",
            contentType: "application/json"
        }).success(function (data) {
            $('#editgroup_name').val(data.name);

            $('#editgroup_users option').each(function () {
                if ($.inArray($(this).val(), data.users) != -1) {
                    $(this).prop('selected', true);
                };
            });
            $('#editgroup_repos option').each(function () {
                if ($.inArray($(this).val(), data.repositories) != -1) {
                    $(this).prop('selected', true);
                };
            });
            $('#editgroup_status').val(data.status);

            $("#editgroup_repos").select2({
                closeOnSelect: false
            });
            $("#editgroup_users").select2({
                closeOnSelect: false
            });
            UpdateGroupModal(id, $scope, $http);
        }).error(function (data) {
            $('#lbl_editgroup_msg')[0].innerText = "Error Occured. Please try again later."
        });
    };
    $scope.deletegroup = function (id) {
        DeleteGroupModal(id, $scope, $http);
    };

}]);
myApplication.controller('tasksController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $("a.list-group-item").removeClass('active');
    $("#a_tasks").addClass('active');

    if (userDomain == undefined || userDomain == '') { userDomain = localStorage['userDomain']; };
    var theWebAddress = '';
    $scope.tasks = '';
    $('#lbl_newtask_msg').innerText = '';
    $('#lbl_edittask_msg').innerText = '';

    theWebAddress = 'https://api.mongolab.com/api/1/databases/iamdb/collections/users?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $.each(result, function (i, val) {
                $('#edittask_createdby').append($('<option>', {
                    value: val._id.$oid,
                    text: val.email
                }));
                $('#edittask_modifiedby').append($('<option>', {
                    value: val._id.$oid,
                    text: val.email
                }));
                $('#addtask_modifiedby').append($('<option>', {
                    value: val._id.$oid,
                    text: val.email
                }));
                $('#addtask_createdby').append($('<option>', {
                    value: val._id.$oid,
                    text: val.email
                }));
            });
        })
        .error(function (data, status) { console.log(data) });

    ListTasks($scope, $http);

    $scope.createtask = function () {

        $("#addtask_createdby").select2({
            closeOnSelect: false
        });
        $("#addtask_modifiedby").select2({
            closeOnSelect: false
        });
        AddTaskModal($scope, $http, userDomain);
    };
    $scope.edittask = function (id) {

        $.ajax({
            url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/tasks/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
            type: "GET",
            contentType: "application/json"
        }).success(function (data) {
            $('#edittask_name').val(data.name);
            $('#edittask_desc').val(data.description);

            $('#edittask_createdby option').each(function () {
                if ($.inArray($(this).val(), data.createdby) != -1) {
                    $(this).prop('selected', true);
                };
            });
            $('#edittask_modifiedby option').each(function () {
                if ($.inArray($(this).val(), data.modifiedby) != -1) {
                    $(this).prop('selected', true);
                };
            });
            $('#edittask_status').val(data.status);
            $("#edittask_modifiedby").select2({
                closeOnSelect: false
            });
            $("#edittask_createdby").select2({
                closeOnSelect: false
            });
            UpdateTaskModal(id, $scope, $http);
        }).error(function (data) {
            $('#lbl_edittask_msg')[0].innerText = "Error Occured. Please try again later."
        });
    };
    $scope.deletetask = function (id) {
        DeleteTaskModal(id, $scope, $http);
    };

}]);
myApplication.controller('repositoriesController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $("a.list-group-item").removeClass('active');
    $("#a_repo").addClass('active');

}]);
myApplication.controller('domainsController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $("a.list-group-item").removeClass('active');
    $("#a_domains").addClass('active');

}]);

