$(document).ready(function () {

    var searchInput = $('#search');
    var tableTrans = $('#transactions').find('tbody tr');
    var operation = $('#operation');

    searchInput.keyup(function () {
        if (operation.val() == "") {
            searchWords();
        } else {
            searchOperation()
        }

    });

    operation.change(function () {
        if (operation.val() == "<" || operation.val() == ">" || operation.val() == "=") {
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