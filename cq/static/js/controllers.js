'use strict';

// URL ENCODE JSON PAYLOAD //
        var formEncode = function (obj) {

            var formString = '', key;
            for (key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    return;
                }
                if (formString.length !== 0) {
                    formString += '&';
                }
                formString += key + '=' + encodeURIComponent(obj[key]);
            }

            return formString.replace(/%20/g, '+');
        };

//angular.module('myApp.controllers', ['angular-loading-bar', 'ngDragDrop'])
angular.module('myApp.controllers', ['ngDragDrop'])

    .controller('listClusterCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.dataReady = false;
// GET ALL HEAD TITLES AVAILABLE IN CLUSTERS ON PAGE LOAD //

        $scope.searchCluster = function (searchText) {
            var url = (searchText) ? '/mergely/clusters?q=' + searchText : '/mergely/clusters'

            $http.get(url, { cache: true }).
                success(function (data, status, headers, config) {
                    console.log(data);
                    $scope.clusters = data.clusters;
                    $scope.dataReady = true;
                }).
                error(function (data, status, headers, config) {
                    console.log('Error Getting Data!');
                });
        }
        $scope.searchCluster()
//      $scope.predicate = '-size';


    }])


    .controller('topicDetailCtrl', ['$rootScope', '$scope', '$http', '$routeParams', function ($rootScope, $scope, $http, $routeParams) {

        $scope.dataReady = false;
        $scope.id = $routeParams.id;

        var getRows = function(note){
             return Math.min(Math.max(4, (note.match(/\n/g)||[]).length), 10)+1;
        }
        // GET ALL  TITLES AVAILABLE IN TOPIC ON PAGE LOAD //

        $http.get('/mergely/topics/' + $scope.id, { cache: false }).
            success(function (data, status, headers, config) {
                $scope.topicDetails = data.result;
                $scope.note=($scope.topicDetails.note)?$scope.topicDetails.note : ""
                $scope.noteRows = getRows($scope.note)
                $scope.disableEditNote = true
                $scope.dataReady = true;

            }).
            error(function (data, status, headers, config) {
                console.log('Error Getting Data!');
            });
        $scope.updateTopic = function (topicId, data, successFunction) {

            $http({
                method: 'POST',
                url: '/mergely/topics/' + topicId,
                data: formEncode(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data, status, headers, config) {
                    if (successFunction) {
                        console.log("calling return function....")
                        successFunction(data)
                    }
                    $scope.disableEditNote = true

                })
                .error(function (data, status, headers, config) {
                    console.log('Error Updating note');
                });

        }
        $scope.makeHead = function (topicId, headArticleID) {
            console.log(topicId)
            console.log(headArticleID)
            if (headArticleID){
                var data = {"head_article_id":headArticleID};
                $scope.updateTopic(topicId, data, $scope.makeHeadSuccess)
            }
        }

        $scope.makeHeadSuccess = function (returnData) {
            $scope.topicDetails = returnData.result
        }

        $scope.editNote = function () {
            $scope.disableEditNote = false
        }

        $scope.updateNote = function (topicDetails) {
            var data = {note: $scope.note};
            topicDetails.note = $scope.note
            $scope.noteRows = getRows($scope.note)
            $scope.updateTopic(topicDetails.topic_id, data)

        }

        $scope.removeArticleFromTopic = function (index1, article) {
            console.log("In remove Article from topic")
            var index = -1
            for (var i = 0; i < $scope.topicDetails.articles.length; i++) {
                if ($scope.topicDetails.articles[i].article_id === article.article_id) {
                    index = i
                    break;
//                    $scope.topicDetails.articles[i].topic_id = "fake_topic_id"
                }
            }
            if (index > -1) {
                console.log(index, index1)
                $scope.topicDetails.articles.splice(index, 1);
            }
        }

        $scope.predicate = '-size';

    }])


    .controller('clusterDetailCtrl', ['$rootScope', '$scope', '$http', '$routeParams', function ($rootScope, $scope, $http, $routeParams) {

        $scope.dataReady = false;
        $scope.errorMessage = null;
        $scope.id = $routeParams.id;

        $rootScope.breadcrumbRef = '#/clusters/' + $scope.id;

        console.log('breadcrumb: ' + $rootScope.breadcrumb);

        $scope.containsTopic = function (title) {
            return !Boolean(title.topic_id)
        }


//  GET ARTICLES FOR SELECTED CLUSTER //

        $http.get('/mergely/clusters/' + $scope.id, { cache: false
        }).
            success(function (data, status, headers, config) {
                console.log(data);

                if (data.result.cluster) {
                    $scope.clusterDetails = data.result;
                    console.log($scope.clusterDetails.cluster.length)
                    $scope.dataReady = true;
                }
                else
                    $scope.errorMessage = "Sorry, cluster not available."

            }).
            error(function (data, status, headers, config) {
                console.log('Error Getting Data!');
            });


        $scope.removeArticleFromCluster = function (index, title) {
            for (var i = 0; i < $scope.clusterDetails.cluster.length; i++) {

                if ($scope.clusterDetails.cluster[i].article_id === title.article_id) {
                    $scope.clusterDetails.cluster[i].topic_id = "fake_topic_id"
                }
            }
        }


//Get Articles for Selected Topic

        $scope.getArticlesForTopic = function (topicID) {

            $http.get('/mergely/topics/' + topicID, { cache: true }).
                success(function (data, status, headers, config) {
                    console.log(data);

                    if (data) {
                        $scope.articleList = data.articles;
                        $scope.dataReady = true;
                    }
                    else
                        $scope.errorMessage = "Sorry, topic data not available."

                }).
                error(function (data, status, headers, config) {
                    console.log('Error Getting Data!');
                });
        }

    }])


    .controller('topicCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

        $scope.predicate = 'topic_name';


        // GET ALL CURRENT TOPICS ON PAGE LOAD //
        $http.get('/mergely/topics', { cache: false }).
            success(function (data, status, headers, config) {
                console.log(data.clusters);

                if (data) {
                    console.log("Topics are: ")
                    console.log(data)
                    $scope.topics = data.topics;
                    $scope.dataReady = true;
                }
                else {
                    $scope.errorMessage = "Sorry, topics not available."
                }
            }).
            error(function (data, status, headers, config) {
                console.log('Error Getting Data!');
            });

//CREATE A TOPIC USING NAME SUBMITTED BY USER //

        $scope.createTopic = function (topicName) {

            if (topicName) {

                var newTopic = {topic_name: topicName};

                console.log(newTopic);
                $http({
                    method: 'PUT',
                    url: '/mergely/topics',
                    data: formEncode(newTopic),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).
                    success(function (data, status, headers, config) {
                        console.log(data.clusters);

                        $scope.topicName = '';
                        $scope.topics.push(data);
                    }).
                    error(function (data, status, headers, config) {
                        console.log('Error Putting Topic!');
                    });
            }
        }

        //CREATE A TOPIC USING NAME SUBMITTED BY USER //

        $scope.addToTopic = function (articleID, topic) {
            console.log("Adding  " + articleID + " to " + topic.topic_id)

            if (articleID) {

                var articleToAdd = {add_article_id: articleID};

                //post article to topic
                $http({
                    method: 'POST',
                    url: '/mergely/topics/' + topic.topic_id,
                    data: formEncode(articleToAdd),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).
                    success(function (data, status, headers, config) {

                        for (var i = 0; i < $scope.topics.length; i++) {

                            if ($scope.topics[i].topic_id === data.result.topic_id) {
                                $scope.topics[i] = data.result
                            }

                        }
                    }).
                    error(function (data, status, headers, config) {
                        console.log('Error Putting Topic!');
                    });
            }


        }

    }])


//  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
//    cfpLoadingBarProvider.includeSpinner = false;
//  }])

