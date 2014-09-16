angular.module('starter.services', [])

    .factory('Camera', ['$q', function ($q) {

        // Upload files to server
        function uploadFile(mediaFile) {
            var q = $q.defer();

            var ft = new FileTransfer(),
                path = mediaFile.fullPath,
                name = mediaFile.name;

            ft.upload(path,
                'http://localhost:30000/api/File/UploadVideo/',
                function (result) {
                    console.log('Upload success: ' + result.responseCode);
                    console.log(result.bytesSent + ' bytes sent');
                    q.resolve(result);
                },
                function (error) {
                    console.log('Error uploading file ' + path + ': ' + error.code);
                    q.reject(error);
                },
                { fileName: name });

            return q.promise;
        }

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            },
            getVideo: function (options) {
                var q = $q.defer();

                navigator.device.capture.captureVideo(function (mediaFiles) {
                    // Do any magic you need
                    var i, len;
                    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                        uploadFile(mediaFiles[i]);
                    }
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])
    .factory('Notification', ['$q', function ($q) {

        return {
            show: function (message) {
                var q = $q.defer();

                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "myApp", // title
                    'OK'        // buttonName
                );

                return q.promise;
            }
        }
    }])

/**
 * A simple example service that returns some data.
 */
    .factory('Friends', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var friends = [
            { id: 0, name: 'Scruff McGruff' },
            { id: 1, name: 'G.I. Joe' },
            { id: 2, name: 'Miss Frizzle' },
            { id: 3, name: 'Ash Ketchum' }
        ];

        return {
            all: function () {
                return friends;
            },
            get: function (friendId) {
                // Simple index lookup
                return friends[friendId];
            }
        }
    });