// helper functions defined in helpers.js
var data = generateData(10);
var columns = getColumns(data);

describe("sensei-grid api", function () {

    var grid;
    var $el = $('<div class="sensei-grid-test">');

    // create dom element before each test
    beforeEach(function () {

        // suppress console.log statements from src files
        console.log = function () {};

        // create wrapper element
        $("body").append($el);

        // render grid
        grid = $el.grid(data, columns);
        grid.render();
    });

    // remove grid wrapper after each test
    afterEach(function () {
        $(".sensei-grid-test").remove();
        grid = null;
    });

    describe("getRowDataByIndex", function () {
        it("should return data by positive index", function () {
            expect(grid.getRowDataByIndex(0)).toEqual(data[0]);
            expect(grid.getRowDataByIndex(1)).toEqual(data[1]);
            expect(grid.getRowDataByIndex(9)).toEqual(data[9]);
        });
        it("should return data by negative index", function () {
            expect(grid.getRowDataByIndex(-1)).toEqual(data[9]);
        });
        it("should throw error when row is not found", function () {
            expect(function () { grid.getRowDataByIndex(100) }).toThrowError("Row does not exist");
            expect(function () { grid.getRowDataByIndex(-100) }).toThrowError("Row does not exist");
            expect(function () { grid.getRowDataByIndex("foo") }).toThrowError("Row does not exist");
        });
    });

    describe("getRowData", function () {
        it("should return row data", function () {
            var $row = $(".sensei-grid-test>table>tbody>tr");
            expect(grid.getRowData($row.eq(0))).toEqual(data[0]);
            expect(grid.getRowData($row.eq(1))).toEqual(data[1]);
            expect(grid.getRowData($row.eq(9))).toEqual(data[9]);
        });
    });

    describe("getRowCells", function () {
        it("should return row cells", function () {
            var $row = $(".sensei-grid-test>table>tbody>tr:first");
            expect(grid.getRowCells($row).length).toEqual(5);
            expect(grid.getRowCells($row).get()).toEqual($row.find(">td").get());
        });
    });

    describe("getCellDataByIndex", function () {
        it("should return cell data by index", function () {
            expect(grid.getCellDataByIndex(0,0)).toEqual(data[0]["id"]);
            expect(grid.getCellDataByIndex(5,4)).toEqual(data[5]["count"]);
        });
        it("should return cell data by negative index", function () {
            expect(grid.getCellDataByIndex(-1,0)).toEqual(data[9]["id"]);
            expect(grid.getCellDataByIndex(0,-1)).toEqual(data[0]["count"]);
        });
    });

    describe("getCellDataByKey", function () {
        it("should return cell data by key", function () {
            expect(grid.getCellDataByKey(0, "created_at")).toEqual(data[0]["created_at"]);
            expect(grid.getCellDataByKey(1, "title")).toEqual(data[1]["title"]);
            expect(grid.getCellDataByKey(9, "id")).toEqual(data[9]["id"]);
        });
        it("should throw error when cell or row is not found", function () {
            expect(function () { grid.getCellDataByKey(0,"key_from_outer_space") }).toThrowError("Cell does not exist");
            expect(function () { grid.getCellDataByKey(100,"title") }).toThrowError("Row does not exist");
        });
    });
});