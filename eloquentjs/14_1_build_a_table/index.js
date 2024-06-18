const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

const mountainsTableElement = generateObjectTable(MOUNTAINS);
document.getElementById("mountains").appendChild(mountainsTableElement);

function generateObjectTable(inputArray) {
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');

    for (const propertyName of Object.getOwnPropertyNames(inputArray[0])) {
        const cell = document.createElement('th')
        cell.innerHTML = propertyName;
        headerRow.appendChild(cell);
    }

    table.appendChild(headerRow);

    for (const entry of inputArray) {
        const row = document.createElement('tr');

        for (const [key, value] of Object.entries(entry)) {
            const cell = document.createElement('td');
            cell.innerHTML = value;
            if (!isNaN(value)) {
                cell.style.textAlign = 'right';
            }
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}
