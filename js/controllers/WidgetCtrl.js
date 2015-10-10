angular.module("imorestApp")
    .controller("WidgetCtrl", function ($scope, $http) {
        $scope.app = "ImorestApp";
        $scope.awesomeRealEstates = [];

        $scope.lower_price_bound = 0;
        $scope.upper_price_bound = 250000;
        $scope.lower_area_bound = 0;
        $scope.upper_area_bound = 25000;
        $scope.isCollapsed = true;

        $scope.predicate = 'search_type';
        $scope.clearFilter = function () {
            console.log("xxx");
            $scope.query = [];
        };

        $http.get('http://phpdev2.dei.isep.ipp.pt/~nsilva/imorest/imoveis.php?').success(function (data) {


            console.log('awesomeRealEstates[0].mediador = ' + data[0].mediador);
            console.log('awesomeRealEstates[0].tipo_de_anúncio = ' + data[0].tipo_de_anúncio);
            console.log('awesomeRealEstates[1].mediador = ' + data[1].mediador);
            console.log('awesomeRealEstates[1].tipo_de_anúncio = ' + data[1].tipo_de_anúncio);

            $scope.totalRealEstates = data.length;


            $scope.awesomeRealEstates = [
                {tipo_de_anuncio:  data[0].tipo_de_anúncio}
            ];
            /*   var i;
             for (i = 0; i < $scope.awesomeRealEstates.length; i++) {

             $scope.awesomeRealEstates[i].tipo_de_anuncio = $scope.awesomeRealEstates[i].tipo_de_anúncio;
             $scope.awesomeRealEstates[i].mediador = $scope.awesomeRealEstates[i].mediador;
             console.log('awesomeRealEstates[ ' + i + '].tipo_de_anuncio = ' + $scope.awesomeRealEstates[i].tipo_de_anuncio);
             }*/

            //$scope.awesomeRealEstates[0].tipo_de_anúncio = cleanUpSpecialChars($scope.awesomeRealEstates[0].tipo_de_anúncio);

        });
        //console.log('getData = ' + getData());


        function cleanUpSpecialChars(str) {
            str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
            str = str.replace(/[àáâãäå]/g, "a");
            str = str.replace(/[ÈÉÊË]/g, "E");
            str = str.replace(/[ú]/g, "u");
            str = str.replace(/[ç]/g, "c");

            //.... all the rest
            return str.replace(/[^a-z0-9]/gi, ''); // final clean up
        }


    });


angular.module('imorestApp')
    .filter('unique', function () {

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    });