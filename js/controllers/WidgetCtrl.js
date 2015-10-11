angular.module("imorestApp")
    .controller("WidgetCtrl", function ($scope, $http) {
        $scope.app = "ImorestApp";
     //   $scope.awesomeRealEstates = [];

        $scope.lower_price_bound = 0;
        $scope.upper_price_bound = 250000;
        $scope.lower_area_bound = 0;
        $scope.upper_area_bound = 5000;
        $scope.isCollapsed = true;

        $scope.selectedRE = [];

        $scope.example1model = []; $scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];





        //var objSemAcentos ="";
        $http.get('http://phpdev2.dei.isep.ipp.pt/~nsilva/imorest/imoveis.php?').success(function (data) {


            $scope.predicate = 'search_type';
            $scope.clearFilter = function () {
                console.log("xxx");
                $scope.query = [];
            };

          //  $scope.totalRealEstates = data.length;

            $scope.awesomeRealEstates = data;

           // console.log('$scope.awesomeRealEstates[i].tipo_de_anuncio = ' + $scope.awesomeRealEstates[0].tipo_de_anúncio);
            var JsonComAcentos = JSON.stringify(data);
            console.log('$scope.awesomeRealEstates JsonComAcentos= ' + JsonComAcentos);
            var JsonSemAcentos = cleanUpSpecialChars(JsonComAcentos);
            console.log('$scope.awesomeRealEstates JsonSemAcentos= ' + JsonSemAcentos);

            var objSemAcentos = JSON.parse(JsonSemAcentos);
            var objComAcentos = JSON.parse(JsonComAcentos);

             $scope.awesomeRealEstates = objSemAcentos;


            /*   var i;
             for (i = 0; i < $scope.awesomeRealEstates.length; i++) {

             $scope.awesomeRealEstates[i].tipo_de_anuncio = $scope.awesomeRealEstates[i].tipo_de_anúncio;
             $scope.awesomeRealEstates[i].mediador = $scope.awesomeRealEstates[i].mediador;
             console.log('awesomeRealEstates[ ' + i + '].tipo_de_anuncio = ' + $scope.awesomeRealEstates[i].tipo_de_anuncio);
             }*/

            //$scope.awesomeRealEstates[0].tipo_de_anúncio = cleanUpSpecialChars($scope.awesomeRealEstates[0].tipo_de_anúncio);

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


            // Materialize.toast(message, displayLength, className, completeCallback);
            Materialize.toast('Loading results.. ', 2000); // 2000 is the duration of the toast

            /*   $('select').material_select();
             $('select').material_select('destroy');*/
        });


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