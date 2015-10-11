angular.module("imorestApp")
    .controller("WidgetCtrl", function ($scope, $http) {

        $scope.title = "ImorestApp";

        // retrieve results from php server. filtering will be made with angular filters
        $http.get('http://phpdev2.dei.isep.ipp.pt/~nsilva/imorest/imoveis.php?').success(function (data) {

            $scope.lower_price_bound = 0;
            $scope.upper_price_bound = 250000;
            $scope.lower_area_bound = 0;
            $scope.upper_area_bound = 5000;
            $scope.isCollapsed = true;

            $scope.predicate = 'search_type';
            $scope.clearFilter = function () {
                console.log("cleaned");
                $scope.query = [];
            };

            $scope.awesomeRealEstates = data;

            var JsonComAcentos = JSON.stringify(data);
            var JsonSemAcentos = cleanUpSpecialChars(JsonComAcentos);

            var objSemAcentos = JSON.parse(JsonSemAcentos);
            $scope.awesomeRealEstates = objSemAcentos;

        });

        function cleanUpSpecialChars(str) {

            str = str.replace(/[ú]/g, "u");
            str = str.replace(/[ç]/g, "c");
            str = str.replace(/[ó]/g, "o");
            str = str.replace(/[áã]/g, "a");
            return str; // final clean up
        }

        // price slider filter
        $scope.priceRange = function (item) {
            return (parseInt(item['preco']) >= $scope.lower_price_bound && parseInt(item['preco']) <= $scope.upper_price_bound);
        };
        // area slider filter
        $scope.areaRange = function (item) {
            return (parseInt(item['area']) >= $scope.lower_area_bound && parseInt(item['area']) <= $scope.upper_area_bound);
        };

// jquery plugin init
        $(function () {
            // your jquery goes here
            var options = [
                {selector: '.class', offset: 200, callback: 'globalFunction()'},
                {selector: '.other-class', offset: 200, callback: 'globalFunction()'}
            ];
            Materialize.scrollFire(options);


        });

        Materialize.toast('Loading results.. ', 2000); // 2000 is the duration of the toast

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