$(document).ready(function () {

    var searchInput = $('#search');
    var operation = $('#operation');

    searchInput.bind('keyup', $('#transactions').find('table tbody tr'), function () {
        if (operation.val() == "") {
            searchWords();
        } else {
            searchOperation()
        }
    });


    operation.bind('change', $('#transactions').find('table tbody tr'), function () {
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

        $('#transactions').find('table tbody tr').each(function () {

            if ($(this).text().search(new RegExp(filter)) < 0) {
                $(this).fadeOut();
            } else {
                $(this).show();
            }
        });
    }

    function searchOperation() {
        if (operation.val() == "<") {
            $('#transactions').find('table tbody tr').each(function () {
                if (parseFloat($(this).find('#amount').text()) < parseFloat(searchInput.val())) {
                    $(this).show()
                } else {
                    $(this).fadeOut()
                }
            })
        } else if (operation.val() == ">") {
            console.log(">");
            $('#transactions').find('table tbody tr').each(function () {
                if (parseFloat($(this).find('#amount').text()) > parseFloat(searchInput.val())) {
                    $(this).show()
                } else {
                    $(this).fadeOut()
                }
            })
        } else if (operation.val() == "=") {
            console.log("=");
            $('#transactions').find('table tbody tr').each(function () {
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

    var userId;
    var table_transactions = $('#transactions').find('table tbody');
    $('#userID').on('change', (function () {
        userId = $(this).val();
        $.post('/financeJS/web/app_dev.php/transaction/ajax/user', {id: userId}, function (data) {
            table_transactions.empty();
            $.each(data, function (key, value) {
                var transaction_date = moment(value['transaction_date']['date'], "YYYY-MM-DD HH:mm Z").format('DD/MM/YYYY');
                table_transactions.append('\n<tr>\n' +
                '<td>' + value['id'] + '</td>\n' +
                '<td id="amount">' + value['amount'] + '</td>\n' +
                '<td>' + transaction_date + '</td>\n' +
                '<td>' + value['user'] + '</td>\n' +
                '</tr>\n')
            })

            searchWords();
            searchOperation();

        })
    }));

});