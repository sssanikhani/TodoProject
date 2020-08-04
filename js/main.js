elems.addColForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addColumnHandler();
});


function addColumnHandler() {
    const colName = elems.colInp.value;
    elems.colInp.value = '';
    if (!colName) return
    addColumnAction(colName);
}

function addColumnAction(colName) {
    state.columns.push(
        {
            id: makeID(),
            name: colName,
            tasks: []
        }
    );
    render();
}

function preventDef(e) {
    e.preventDefault();
}

function addTaskHandler(colID, taskContent) {
    if (!taskContent) return;
    addTaskAction(colID, taskContent);
}

function addTaskAction(colID, taskContent) {
    const column = selectByID(state.columns, colID);
    column.tasks.push(
        {
            id: makeID(),
            content: taskContent
        }
    );
    render();
}

function moveTaskAction(fromID, toID, taskID) {
    const from = selectByID(state.columns, fromID);
    const to = selectByID(state.columns, toID);
    const task = selectByID(from.tasks, taskID);
    from.tasks = from.tasks.filter(function(task) { return task.id !== taskID});
    to.tasks.push(task);
    render();
}

render();