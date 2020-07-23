const first_col_id = "todo";

add_button = document.getElementById("add-button");
task_inp = document.getElementById("task-inp");
add_button.addEventListener(
    "click",
    function () {
        task_name = task_inp.value;
        if (task_name != null && task_name != "") {
            task = build_task_element(task_name);
            add_task_to_column(task, first_col_id);
        }
    }
);

function add_task_to_column(task, col_id) {
    dest_column = calc_dest_col(col_id);
    dest_column.appendChild(task);
}

function calc_dest_col(col_id) {
    ext_col = document.getElementById(col_id);
    dest = ext_col.children[0];
    return dest;
}

function build_task_element(task_name) {
    task = document.createElement("div");
    task.classList.add("task");
    task.classList.add("low-opaque-container");
    task.classList.add("low-border-radius");

    label = document.createElement("label");
    label.innerHTML = task_name;
    task.appendChild(label);

    op_btns = document.createElement("div");
    op_btns.classList.add("operation-buttons");

    btns_class = "button medium-opaque-container high-border-radius";
    
    btn1 = document.createElement("button");
    btn1.className = btns_class;
    btn1.innerHTML = "Todo";
    btn1.addEventListener(
        "click", 
        function() { 
            move_task(task, "todo");
        }
    );
    
    btn2 = document.createElement("button");
    btn2.className = btns_class;
    btn2.innerHTML = "Doing";
    btn2.addEventListener(
        "click", 
        function() { 
            move_task(task, "doing");
        }
    );


    btn3 = document.createElement("button");
    btn3.className = btns_class;
    btn3.innerHTML = "Done";
    btn3.addEventListener(
        "click", 
        function() { 
            move_task(task, "done");
        }
    );
    
    btn4 = document.createElement("button");
    btn4.className = btns_class;
    btn4.innerHTML = "Remove";
    btn4.addEventListener(
        "click", 
        function() { 
            task.remove();
        }
    );

    op_btns.appendChild(btn1);
    op_btns.appendChild(btn2);
    op_btns.appendChild(btn3);
    op_btns.appendChild(btn4);

    task.appendChild(op_btns);

    return task
}

function move_task(task, dest_col) {
    task_name = task.children[0].innerHTML;
    new_task = build_task_element(task_name);
    task.remove();
    add_task_to_column(new_task, dest_column);
}