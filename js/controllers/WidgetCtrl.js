angular.module("imorestApp")
    .controller("WidgetCtrl", function ($scope, $http) {
        $scope.app = "ImorestApp";




        getData();

        $http.get('http://phpdev2.dei.isep.ipp.pt/~nsilva/imorest/imoveis.php?').success(function (data) {
            $scope.awesomeRealEstates = [{
                tipo_de_anuncio: String,
                mediador: String
            }];


            $scope.awesomeRealEstates[0].mediador = data[0].mediador;
            $scope.awesomeRealEstates[0].tipo_de_anuncio =  data[0].tipo_de_anúncio;
            var texto = "";
            //texto += '' + data[0].tipo_de_anúncio +'';
            console.log('textp =' + texto);
            console.log('awesomeRealEstates[0].mediador = ' + $scope.awesomeRealEstates[0].mediador);
            console.log('awesomeRealEstates[0].tipo_de_anúncio = ' + $scope.awesomeRealEstates[0].tipo_de_anuncio);
            $scope.totalRealEstates = $scope.awesomeRealEstates.length;


            //region removeAccents
            function cleanUpSpecialChars(str)
            {
               /* str = str.replace(/[������]/g,"A");
                str = str.replace(/[������]/g,"a");
                str = str.replace(/[����]/g,"E");*/
                str = str.replace(/[é]/g,"e");
                str = str.replace(/[ú]/g,"u");

                //.... all the rest
                return str.replace(/[^a-z0-9]/gi,''); // final clean up
            }
            //endregion

        });
        //console.log('getData = ' + getData());


        function getData()  {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://phpdev2.dei.isep.ipp.pt/~nsilva/imorest/imoveis.php?"; // all items in the PHP server. The filtering will be made by angularJS
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    console.log('myArr =' + myArr);

                    console.log('im in');

                }
                console.log('im out of if ');

                xmlhttp.open("GET", url, true);
                xmlhttp.send();

            }
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