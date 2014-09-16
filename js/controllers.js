angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
    })

    .controller('testCtrl', function ($scope, Camera, Notification) {
        $scope.title = "my test";

        $scope.action = function () {
            Notification.show("test message");
            /*if (navigator.notification) { // Override default HTML alert with native dialog
             window.alert = function (message) {
             navigator.notification.alert(
             message,    // message
             null,       // callback
             "Workshop", // title
             'OK'        // buttonName
             );
             };
             }*/
        };

        $scope.getPhoto = function () {
            console.log('Getting camera');
            Camera.getPicture().then(function (imageURI) {
                console.log(imageURI);
                $scope.lastPhoto = imageURI;
            }, function (err) {
                console.err(err);
            }, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false
            });
            /*
             navigator.camera.getPicture(function(imageURI) {
             console.log(imageURI);
             }, function(err) {
             }, {
             quality: 50,
             destinationType: Camera.DestinationType.DATA_URL
             });
             */
        };

        $scope.record = function () {
            console.log('Getting camera: video');
            Camera.getVideo().then(function (imageURI) {
                console.log(imageURI);
                //$scope.lastPhoto = imageURI;
            }, function (err) {
                console.err(err);
            }, {
                limit: 1
            });

        };

        // capture callback
        var captureSuccess = function (mediaFiles) {
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                console.log("Success");
                alert("Success");
            }
        };

        // capture error callback
        var captureError = function (error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };


    })
;
