let id = 0;
function makeID() {
    return (++id).toString();
}

function selectByID(arr, id) {
    return arr.filter(function(item) {
        return item.id === id;
    }) [0];
}

