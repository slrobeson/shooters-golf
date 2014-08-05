angular.module("golfAdmin")
    .filter("shirtSizeAsText", function () {
        return function (value) {
            switch (value) {
                case 1:
                    return 'S';
                case 2:
                    return 'M';
                case 3:
                    return 'L';
                case 4:
                    return 'XL';
                case 5:
                    return '2XL';
                default:
                    return '3XL'
            }
        }
    })
    .filter("levelAsText", function () {
        return function (value) {
            switch (value) {
                case 1:
                    return 'Hole - $100';
                case 2:
                    return 'T-Shirt - $100';
                default:
                    return 'Hole In One - $150';
            }
        }
    });