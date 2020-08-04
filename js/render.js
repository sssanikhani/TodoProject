const addColButtonHTML = `
    <section class="external-column ext-add-column" id="add-column-c">

        <button class="button medium-opaque-container low-border-radius add-column-button" id="add-column-button">
            <h1>+</h1>
        </button>

    </section>
`;

const extColClassNames = "external-column"
const columnClassNames = "column vlow-opaque-container low-border-radius";
const addTaskFormClassNames = "add-task-form add-form low-opaque-container low-border-radius";
const addTaskInpClassNames = "task-inp text-inp";
const addTaskButtonClassNames = "add-task-button button medium-opaque-container low-border-radius";

const taskClassNames = "task low-opaque-container low-border-radius";
const taskFooterClassNames = "movement-buttons";
const moveButtonClassNames = "button medium-opaque-container high-border-radius";


function createColHeaderElem(colName) {
    const headerElem = document.createElement('header');

    const h2Elem = document.createElement('h2');
    h2Elem.innerHTML = colName;

    headerElem.appendChild(h2Elem);
    return headerElem;
}

function createAddTaskInpElem() {
    const addTaskInpElem = document.createElement('input');
    addTaskInpElem.className = addTaskInpClassNames;
    addTaskInpElem.setAttribute('type', 'text');
    addTaskInpElem.setAttribute('placeholder', 'Enter Task Here');

    return addTaskInpElem;
}

function createAddTaskButtonElem() {
    buttonElem = document.createElement('input');
    buttonElem.className = addTaskButtonClassNames;
    buttonElem.setAttribute('type', 'submit');
    buttonElem.setAttribute('value', 'Add');

    return buttonElem;
}

function createAddTaskFormElem(colID) {
    const formElem = document.createElement('form');
    formElem.className = addTaskFormClassNames;

    const addTaskInpElem = createAddTaskInpElem();
    formElem.appendChild(addTaskInpElem);
    formElem.appendChild(createAddTaskButtonElem());

    // const taskContent = addTaskInpElem.value;
    // formElem.setAttribute('onsubmit', `
    //     preventDef();
    //     addTaskInpElem.value = '';
    //     addTaskHandler('${ colID }', '${ taskContent }');
    // `);

    formElem.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskContent = addTaskInpElem.value;
        addTaskInpElem.value = '';
        addTaskHandler(colID, taskContent);
    });

    return formElem;
}

function createMoveButtonElem(fromColID, toColID, taskID) {
    const to = selectByID(state.columns, toColID);
    const buttonElem = document.createElement('button');
    buttonElem.className = moveButtonClassNames;
    buttonElem.innerHTML = to.name;
    
    buttonElem.setAttribute('onclick' , `
        moveTaskAction('${ fromColID }' , '${ toColID }', '${ taskID }' );`
    );

    // buttonElem.addEventListener('click', function () {
    //     console.log("Hi");
    //     moveTaskAction(fromColID, toColID, taskID);
    // });

    return buttonElem;
}

function createMovementButtons(currentColID, taskID) {
    const currentCol = selectByID(state.columns, currentColID);
    const footerElem = document.createElement('footer');
    footerElem.className = taskFooterClassNames;

    state.columns
        .filter(function (col) { return col.id !== currentColID })
        .forEach(function (destCol) {
            var buttonElem = createMoveButtonElem(currentColID, destCol.id, taskID);
            footerElem.appendChild(buttonElem);
        });

    return footerElem;

}

function createTaskElem(colID, taskID) {
    col = selectByID(state.columns, colID);
    task = selectByID(col.tasks, taskID);

    const taskElem = document.createElement('div');
    taskElem.className = taskClassNames;
    const taskLabelElem = document.createElement('label');
    taskLabelElem.innerHTML = task.content;
    taskElem.appendChild(taskLabelElem);

    taskElem.appendChild(createMovementButtons(colID, taskID));

    return taskElem;
}

function createColumn(colID) {
    const col = selectByID(state.columns, colID);

    const extColElem = document.createElement('section');
    extColElem.className = extColClassNames;

    const colElem = document.createElement('div');
    colElem.className = columnClassNames;

    colElem.appendChild(createColHeaderElem(col.name));

    const formElem = createAddTaskFormElem(col.id);
    colElem.appendChild(formElem);

    col.tasks.forEach(function (task) {
        colElem.appendChild(createTaskElem(col.id, task.id));
    });

    extColElem.appendChild(colElem);
    return extColElem;
}


function render() {
    const columns = elems.columnsElem;
    columns.innerHTML = '';
    state.columns.forEach(function (column) {
        columns.appendChild(createColumn(column.id))
    });
    columns.innerHTML += addColButtonHTML;
    document.getElementById('add-column-button').addEventListener('click', addColumnHandler);
}