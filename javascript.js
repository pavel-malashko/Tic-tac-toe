$(document).ready(function () {
    var sign = "X";
    var cl_zn = $(".cell"); //перебираем ячейки
    cl_zn.on("click", function sel() { //при клике на клетку вызывается функция знака
        $(this).text(sign);
        if (sign === "X") { // меняем знак поочредно
            sign = "O"
            $('.result').text("Walks O"); // выводит кто ходит
            $(this).off("click", sel);  //блокируем выбранную уже ячейку
        }
        else {
            sign = "X"
            $('.result').text("Walks X");
            $(this).off("click", sel);
        }
        var winner = win(); //записываем в перемнную функцию выигрышных комбинаций
        if (winner === true) { //если функция будет истиной , то возвратится функция endGame
            endGame();
        }
        else {
            var draw = endDraw();
            if (draw) { // если победителя нет, то ничья вызванная функцией EndDraw
                $('.result').text('Draw!');
            }
        }
    });

    function win(sel) {
        var win_player = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; //комбинации при победе
        for (var i = 0; i < win_player.length; i++) { //перебираем в цикле комбинации и записываем в перемнную
            var wc = win_player[i];
            if (cl_zn[wc[0]].innerHTML === cl_zn[wc[1]].innerHTML && cl_zn[wc[1]].innerHTML === cl_zn[wc[2]].innerHTML && cl_zn[wc[0]].innerHTML !== "") //условие при победе
            {
                $('.result').text('you won!');
                return true; //возвращаем истину, если есть победитель
            }
        }
    };

    function endGame(sel) {
        for (var i = 0; i < cl_zn.length; i++) { //запрещаем клик по ячейкам
            $(cl_zn).off("click", sel);
        }
    };

    function endDraw(sel) { //перебираем ячейки, если ячейка пустая, то вовращает false, если заняты ячейки то вовращает true
        for (var i = 0; i < cl_zn.length; i++) {
            if (cl_zn[i].innerHTML === "") {
                return false;
            }
        }
        return true;
    };
    $("input").on("click", function reset_click() { //начать игру заново(кнопка)
        location.reload();
    });
})