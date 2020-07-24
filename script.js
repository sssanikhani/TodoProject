const first_col_id = "todo";

var add_button = document.getElementById("add-button");
var task_inp = document.getElementById("task-inp");
add_button.addEventListener(
    "click",
    function () {
        var task_name = task_inp.value;
        if (task_name != null && task_name != "") {
            var task = build_task_element(task_name);
            add_task_to_column(task, first_col_id);
        }
    }
);

function add_task_to_column(task, col_id) {
    var dest_column = calc_dest_col(col_id);
    dest_column.appendChild(task);
}

function calc_dest_col(col_id) {
    var ext_col = document.getElementById(col_id);
    var dest = ext_col.children[0];
    return dest;
}

function build_task_element(task_name) {
    var task = document.createElement("div");
    task.classList.add("task");
    task.classList.add("low-opaque-container");
    task.classList.add("low-border-radius");

    var label = document.createElement("label");
    label.innerHTML = task_name;
    task.appendChild(label);

    var op_btns = document.createElement("div");
    op_btns.classList.add("operation-buttons");

    var btns_class = "button medium-opaque-container high-border-radius";

    var btn1 = document.createElement("button");
    btn1.className = btns_class;
    btn1.innerHTML = "Todo";


    var btn2 = document.createElement("button");
    btn2.className = btns_class;
    btn2.innerHTML = "Doing";



    var btn3 = document.createElement("button");
    btn3.className = btns_class;
    btn3.innerHTML = "Done";


    var btn4 = document.createElement("button");
    btn4.className = btns_class;
    btn4.innerHTML = "Remove";

    
    op_btns.appendChild(btn1);
    op_btns.appendChild(btn2);
    op_btns.appendChild(btn3);
    op_btns.appendChild(btn4);

    task.appendChild(op_btns);

    btn1.addEventListener(
        "click",
        function () {
            move_task(task, "todo");
        }
    );
    btn2.addEventListener(
        "click",
        function () {
            move_task(task, "doing");
        }
    );
    btn3.addEventListener(
        "click",
        function () {
            move_task(task, "done");
        }
    );
    btn4.addEventListener(
        "click",
        function () {
            task.remove();
        }
    );

    return task
}

function move_task(task, dest_col) {
    var task_name = task.children[0].innerHTML;
    var new_task = build_task_element(task_name);
    task.remove();
    add_task_to_column(new_task, dest_col);
}