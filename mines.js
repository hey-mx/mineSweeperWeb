(function() {
    mineSweeper = function (rows, cols, numOfMines) {
        var __rows = rows;
        var __cols = cols;
        var __numOfMines = numOfMines;
        var __mines = [];
        var maxMines = 0;

        this.isMineOnCoord = isMineOnCoord;

        this.searchMineAround = function(y, x) {
            var mines = 0;
            for (var currentY = (y - 1); currentY <= (y + 1); ++currentY) {
                if (currentY > 0 && currentY <= __rows) {
                    for (var currentX = (x - 1); currentX <= (x + 1); ++currentX) {
                        if (currentX > 0 && currentX <= __cols 
                                && isMineOnCoord(currentY, currentX)) {
                            ++mines;
                        }
                    }
                }
            }
            return mines;
        }

        this.getRows = function() {
            return __rows;
        }
        this.getCols = function() {
            return __cols;
        }
        this.getNumOfMines = function() {
            return __numOfMines;
        }
        this.draw = function() {
            if (validateParams()) {
                putMines();
                console.log(__mines);
                console.log(__mines.length);
            }
        }

        function isMineOnCoord(y, x) {
            for(var current in __mines) {
                if (__mines[current].isOnCoord(y, x)) {
                    return true;
                }
            }
            return false;
        }

        function validateParams() {
            var isValid = true;
            if (__rows <= 1) {
                alert('Debe especificar mas de una fila');
                isValid = false;
            }
            if (__cols <= 1) {
                alert('Debe especificar mas de una columna');
                isValid = false;
            }
            if (isValid) {
                maxMines = (__rows * __cols) - 1;
                if ( __numOfMines <= 0 || __numOfMines > maxMines) {
                    alert('El numero de minas debe ser menor o igual a ' + maxMines);
                    isValid = false;
                }
            }
            return isValid;
        }

        function putMines() {
            var current = 0;
            __mines = [];
            while(current < __numOfMines) {
                var y = Math.floor(Math.random() * __rows) + 1;
                var x = Math.floor(Math.random() * __cols) + 1;
                if (!isMineOnCoord(y, x)) {
                    __mines.push(new Point(y, x));
                    ++current;
                }
            }
        }
        return this;
    }

    Point = function(y, x) {
        this.y = y;
        this.x = x;

        this.isOnCoord = function(y, x) {
            return this.y == y && this.x == x;
        }
    }
}());