$(document).ready(function () {

    var searchInput = $('#search');
    var tableTrans = $('#transactions').find('tbody tr');
    var operation = $('#operation');
    var userId = $('#userID');

    searchInput.bind('keyup', tableTrans, function () {
        if (operation.val() == "") {
            searchWords();
        } else {
            searchOperation()
        }
    });


    operation.bind('change', tableTrans, function () {
        if (operation.val() == "<" || operation.val() == ">" || operation.val() == "=") {
            searchInput.val('');
            searchInput.attr('placeholder', 'Search amount...')
            searchOperation();
        } else {
            searchInput.val('');
            searchInput.attr('placeholder', 'Search')
            searchWords();
        }

    });

    function searchWords() {

        var filter = searchInput.val();

        tableTrans.each(function () {

            if ($(this).text().search(new RegExp(filter)) < 0) {
                $(this).fadeOut();
            } else {
                $(this).show();
            }
        });
    }

    function searchOperation() {
        if (operation.val() == "<") {
            tableTrans.each(function () {
                if (parseFloat($(this).find('#amount').text()) < parseFloat(searchInput.val())) {
                    $(this).show()
                } else {
                    $(this).fadeOut()
                }
            })
        } else if (operation.val() == ">") {
            console.log(">");
            tableTrans.each(function () {
                if (parseFloat($(this).find('#amount').text()) > parseFloat(searchInput.val())) {
                    console.log($(this).find('#amount').text());
                    $(this).show()
                } else {
                    $(this).fadeOut()
                }
            })
        } else if (operation.val() == "=") {
            console.log("=");
            tableTrans.each(function () {
                if (parseFloat($(this).find('#amount').text()) == parseFloat(searchInput.val())) {
                    $(this).show()
                } else {
                    $(this).fadeOut()
                }
            })
        } else {
            searchWords();
        }
    }

});