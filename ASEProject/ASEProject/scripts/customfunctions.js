function AddUserModal($scope, $http, userDomain) {
    $('#div_adduser').show();
    BootstrapDialog.show({
        message: $('#div_adduser'),
        title: 'Add New User',
        buttons: [{
            label: 'Add User',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/users?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg&u=true&q={"email" :"' + $('#adduser_email').val() + '","domain" :"' + userDomain + '"}',
                    data: JSON.stringify({
                        "$set": {
                            "firstname": $('#adduser_fname').val(),
                            "lastname": $('#adduser_lname').val(),
                            "email": $('#adduser_email').val(),
                            "password": 'password',
                            "usertype": $('#adduser_utype').val(),
                            "repositories": $('#adduser_repos').val(),
                            "status": $('#adduser_status').val()
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json"
                }).success(function (data) {

                    $('#lbl_newuser_msg')[0].innerText = "New User Created Successfully."

                }).error(function (data) {
                    $('#lbl_newuser_msg')[0].innerText = "Error Occured. Please try again later."
                });


            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                $('#div_adduser').hide();
                ListUsers($scope, $http);
            }
        }]
    });
}
function UpdateUserModal(id, $scope, $http) {
    $('#div_edituser').show();
    BootstrapDialog.show({
        message: $('#div_edituser'),
        title: 'Edit User',
        buttons: [{
            label: 'Update User',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/users/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
                    data: JSON.stringify({
                        "$set": {
                            "firstname": $('#edituser_fname').val(),
                            "lastname": $('#edituser_lname').val(),
                            "email": $('#edituser_email').val(),
                            "usertype": $('#edituser_utype').val(),
                            "repositories": $('#edituser_repos').val(),
                            "status": $('#edituser_status').val()
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json"
                }).success(function (data) {

                    $('#lbl_edituser_msg')[0].innerText = "User Updated Successfully."

                }).error(function (data) {
                    $('#lbl_edituser_msg')[0].innerText = "Error Occured. Please try again later."
                });
            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                $('#div_edituser').hide();
                ListUsers($scope, $http);
            }
        }]
    });
}
function DeleteUserModal(id, $scope, $http) {
    BootstrapDialog.show({
        message: 'Are you sure to delete this User??',
        title: 'Delete User',
        buttons: [{
            label: 'Delete User',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/users/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
                    type: "DELETE",
                    contentType: "application/json"
                }).success(function (data) {

                    dialogRef.setMessage("User Deleted Successfully.");

                }).error(function (data) {
                    dialogRef.setMessage("Error Occured. Please try again later.");
                });
            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                ListUsers($scope, $http);
            }
        }]
    });
}
function ListUsers($scope,$http){
    var theWebAddress = 'https://api.mongolab.com/api/1/databases/iamdb/collections/users?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $scope.users = result;
        })
        .error(function (data, status) { console.log(data) });
}
function ListUser($scope, $http, user, domain) {
    var theWebAddress ='https://api.mongolab.com/api/1/databases/iamdb/collections/users?q={"email":"'+ user +'","domain": "'+ domain +'"}&apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $scope.user = result[0];
            $scope.userUniqueID = result[0]._id.$oid;
            $('#updateuser_fname').val(result[0].firstname);
            $('#updateuser_lname').val(result[0].lastname);
            $('#updateuser_email').val(result[0].email);
            $('#updateuser_password').val(result[0].password);
            $('#updateuser_status').val(result[0].status);
        })
        .error(function (data, status) { console.log(data) });
}
function UpdateUserProfile($scope, $http, user, domain) {
    $('#div_updateuser').show();
    BootstrapDialog.show({
        message: $('#div_updateuser'),
        title: 'Update User Profile',
        buttons: [{
            label: 'Update User',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/users/' + $scope.userUniqueID + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
                    data: JSON.stringify({
                        "$set": {
                            "firstname": $('#updateuser_fname').val(),
                            "lastname": $('#updateuser_lname').val(),
                            "email": $('#updateuser_email').val(),
                            "password": $('#updateuser_password').val(),
                            "status": $('#updateuser_status').val()
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json"
                }).success(function (data) {
                    localStorage['userID'] = $('#updateuser_email').val();
                    $('#lbl_updateuser_msg')[0].innerText = "User Profile Updated Successfully."

                }).error(function (data) {
                    $('#lbl_updateuser_msg')[0].innerText = "Error Occured. Please try again later."
                });
            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                $('#div_updateuser').hide();
                ListUser($scope, $http, localStorage['userID'], domain);
            }
        }]
    });
}
function AddGroupModal($scope, $http, userDomain) {
    $('#div_addgroup').show();
    BootstrapDialog.show({
        message: $('#div_addgroup'),
        title: 'Add New Group',
        buttons: [{
            label: 'Add Group',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/groups?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg&u=true&q={"name" :"' + $('#addgroup_name').val() + '","domain" :"' + userDomain + '"}',
                    data: JSON.stringify({
                        "$set": {
                            "name": $('#addgroup_name').val(),
                            "users": $('#addgroup_users').val(),
                            "repositories": $('#addgroup_repos').val(),
                            "status": $('#addgroup_status').val()
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json"
                }).success(function (data) {

                    $('#lbl_newgroup_msg')[0].innerText = "New Group Created Successfully."

                }).error(function (data) {
                    $('#lbl_newgroup_msg')[0].innerText = "Error Occured. Please try again later."
                });


            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                $('#div_addgroup').hide();
                ListGroups($scope, $http);
            }
        }]
    });
}
function UpdateGroupModal(id, $scope, $http) {
    $('#div_editgroup').show();
    BootstrapDialog.show({
        message: $('#div_editgroup'),
        title: 'Edit Group',
        buttons: [{
            label: 'Update Group',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/groups/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
                    data: JSON.stringify({
                        "$set": {
                            "name": $('#editgroup_name').val(),
                            "users": $('#editgroup_users').val(),
                            "repositories": $('#editgroup_repos').val(),
                            "status": $('#editgroup_status').val()
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json"
                }).success(function (data) {

                    $('#lbl_editgroup_msg')[0].innerText = "Group Updated Successfully."

                }).error(function (data) {
                    $('#lbl_editgroup_msg')[0].innerText = "Error Occured. Please try again later."
                });
            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                $('#div_editgroup').hide();
                ListGroups($scope, $http);
            }
        }]
    });
}
function DeleteGroupModal(id, $scope, $http) {
    BootstrapDialog.show({
        message: 'Are you sure to delete this Group??',
        title: 'Delete Group',
        buttons: [{
            label: 'Delete Group',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/groups/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
                    type: "DELETE",
                    contentType: "application/json"
                }).success(function (data) {

                    dialogRef.setMessage("Group Deleted Successfully.");

                }).error(function (data) {
                    dialogRef.setMessage("Error Occured. Please try again later.");
                });
            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                ListGroups($scope, $http);
            }
        }]
    });
}
function ListGroups($scope, $http) {
    var theWebAddress = 'https://api.mongolab.com/api/1/databases/iamdb/collections/groups?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $scope.groups = result;
        })
        .error(function (data, status) { console.log(data) });
}

function AddTaskModal($scope, $http, userDomain) {
    $('#div_addtask').show();
    BootstrapDialog.show({
        message: $('#div_addtask'),
        title: 'Add New Task',
        buttons: [{
            label: 'Add Task',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/tasks?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg&u=true&q={"name" :"' + $('#addtask_name').val() + '","domain" :"' + userDomain + '"}',
                    data: JSON.stringify({
                        "$set": {
                            "createdby": $('#addtask_createdby').val(),
                            "modifiedby": $('#addtask_modifiedby').val(),
                            "description": $('#addtask_desc').val(),
                            "createdon": new Date(),
                            "modifiedon": new Date(),
                            "status": $('#addtask_status').val()
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json"
                }).success(function (data) {

                    $('#lbl_newtask_msg')[0].innerText = "New Task Created Successfully."

                }).error(function (data) {
                    $('#lbl_newtask_msg')[0].innerText = "Error Occured. Please try again later."
                });


            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                $('#div_addtask').hide();
                ListTasks($scope, $http);
            }
        }]
    });
}
function UpdateTaskModal(id, $scope, $http) {
    $('#div_edittask').show();
    BootstrapDialog.show({
        message: $('#div_edittask'),
        title: 'Edit Task',
        buttons: [{
            label: 'Update Task',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/tasks/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
                    data: JSON.stringify({
                        "$set": {
                            "name": $('#edittask_name').val(),
                            "createdby": $('#edittask_createdby').val(),
                            "modifiedby": $('#edittask_modifiedby').val(),
                            "description": $('#edittask_desc').val(),
                            "modifiedon": new Date(),
                            "status": $('#edittask_status').val()
                        }
                    }),
                    type: "PUT",
                    contentType: "application/json"
                }).success(function (data) {

                    $('#lbl_edittask_msg')[0].innerText = "Task Updated Successfully."

                }).error(function (data) {
                    $('#lbl_edittask_msg')[0].innerText = "Error Occured. Please try again later."
                });
            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                $('#div_edittask').hide();
                ListTasks($scope, $http);
            }
        }]
    });
}
function DeleteTaskModal(id, $scope, $http) {
    BootstrapDialog.show({
        message: 'Are you sure to delete this Task??',
        title: 'Delete Task',
        buttons: [{
            label: 'Delete Task',
            cssClass: 'btn-primary',
            action: function (dialogRef) {
                $.ajax({
                    url: 'https://api.mongolab.com/api/1/databases/iamdb/collections/tasks/' + id + '?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg',
                    type: "DELETE",
                    contentType: "application/json"
                }).success(function (data) {

                    dialogRef.setMessage("Task Deleted Successfully.");

                }).error(function (data) {
                    dialogRef.setMessage("Error Occured. Please try again later.");
                });
            }
        }, {
            label: 'Close',
            action: function (dialogRef) {
                dialogRef.close();
                ListTasks($scope, $http);
            }
        }]
    });
}
function ListTasks($scope, $http) {
    var theWebAddress = 'https://api.mongolab.com/api/1/databases/iamdb/collections/tasks?apiKey=EpThFIOyjKh-WbVlIWEvG0Iq8Pkvoohg';
    $http.get(theWebAddress)
        .success(function (result) {
            $scope.tasks = result;
        })
        .error(function (data, status) { console.log(data) });
}

