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

var app = angular.module("myApp", []);

app.controller("restCtrl", function ($scope, $filter) {


    $scope.text ="Children of the sun, see your time has just begun, searching for your ways, through adventures every" +
        " day. Every day and night, with the condor in flight, with all your friends in tow, you search for the Cities " +
        "of Gold. Ah-ah-ah-ah-ah... wishing for The Cities of Gold. Ah-ah-ah-ah-ah... some day we will find The Cities " +
        "of Gold. Do-do-do-do ah-ah-ah, do-do-do-do, Cities of Gold. Do-do-do-do, Cities of Gold. Ah-ah-ah-ah-ah... " +
        "some day we will find The Cities of Gold. " +
        "\n\nThis is my boss, Jonathan Hart, a self-made millionaire, he's quite a guy. This is Mrs H., she's gorgeous, " +
        "she's one lady who knows how to take care of herself. By the way, my name is Max. I take care of both of them, " +
        "which ain't easy, cause when they met it was MURDER! It's true I hire my body out for pay, hey hey. Ive gotten " +
        "burned over Cheryl Tiegs, blown up for Raquel Welch. But when I end up in the hay its only hay, hey hey. " +
        "I might jump an open drawbridge, or Tarzan from a vine. Cause I'm the unknown stuntman that makes Eastwood " +
        "look so fine.";

        $scope.analyzeText = function (text) {
            console.log(text)
            var data = {text: text};

            //post article to topic
            $http({
                method: 'POST',
                url: '/api/analyze/',
                data: formEncode(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                success(function (data, status, headers, config) {
                    // Display output in a modal

                }).
                error(function (data, status, headers, config) {
                    console.log('Error analyzing text!');
                });
            }




});