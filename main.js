/**
 * сортирует HTML таблицу
 * 
 * @param {HTMLTableElement} table Таблица, которую сортируем
 * @param {number} column индекс таблицы
 * @param {boolean} ascending обозначает от большего к меньшему
 */
function sort_table_by_column(table, column, ascending = true){
   
    const tBody = table.tBodies[0];
    const direction_modifier =  ascending ? 1 : -1; 
    const rows = Array.from(tBody.querySelectorAll("tr"));
    console.log(`штуки: ${rows}`)
    // сортируем каждую строку
    
    const sorted_rows = rows.sort((a, b) => {

        a_column_text = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        b_column_text = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        

        
        p_a_column_text = parseInt(a_column_text, 10);
        p_b_column_text = parseInt(b_column_text, 10);

        if (isNaN(p_a_column_text) || isNaN(p_a_column_text)){

        } else{
            a_column_text = p_a_column_text;
            b_column_text = p_b_column_text;
        };
        

        return a_column_text > b_column_text ? (1 * direction_modifier) : (-1 * direction_modifier);
    });
        
    // удаляем всё из таблицы
    while (tBody.firstChild){
        tBody.removeChild(tBody.firstChild);
    }
    // Добавляем отсортированную таблицу 
    tBody.append(...sorted_rows);
  
    // запоминаем От большего к меньшему или от меньшего к большему
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-ascending", "th-sort-decending"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-ascending", ascending);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-decending", !ascending);

}






fetch('https://jsonplaceholder.typicode.com/users').then(res => {
   
   if (res.ok) {
    return res.json();
   } else{
    return console.log(res.status)
   }
})
.then(data =>{
    // собрали все key - значения из json
    for (const [key, value] of Object.entries(data[0])){
            const head_markup = `<th>${key}</th>`;
            document.querySelector('#table-head').insertAdjacentHTML('beforeend', head_markup);
        };

    var i = 0;
    // вбиваем value значения
    data.forEach(user => {

        document.querySelector('#table-body').insertAdjacentHTML('beforeend', `<tr id = "user-${i}"></tr>`);
        
        
        for (const [key, value] of Object.entries(user)){
            var str = ''
            // проверям на то, чтобы объект был строкой либо числом
            if (typeof value != "string" && typeof value != "number"){
                for (const [new_key, new_value] of Object.entries(value)){
                    //открываем объект дальше, исчется первая строковая запись
                    if (typeof new_value == "string" || typeof new_value == "number") {
                        str = `${str} ${new_value}`
                    }                         
                }; 
            } 
            else
            {
                str = value
            };
            // добавляем строку в столбец
            const body_markup = `<td>${str}</td>`;

            document.querySelector(`#user-${i}`).insertAdjacentHTML('beforeend', body_markup);
        };  
        i = i + 1;
    });      
}).then(() => {
    // document.querySelector('head').insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="main.css">`);

    document.querySelectorAll(".table-sortable th").forEach(header_cell => {
        header_cell.addEventListener("click", () => {
            const table_element = header_cell.parentElement.parentElement.parentElement; // поднимаемся из th -> thead -> table
            const header_index = Array.prototype.indexOf.call(header_cell.parentElement.children, header_cell); // берём индекс кликнутого элемента
            const current_is_ascending = header_cell.classList.contains("th-sort-ascending");
    
            sort_table_by_column(table_element, header_index, !current_is_ascending);
    
        });
    });
    // красим элементы
    document.querySelectorAll('td').forEach((s, i) => {

        if (parseInt(s.innerHTML, 10) >= 9 && parseInt(s.innerHTML, 10) != isNaN) {
          s.style.color = 'red';
        } else if (parseInt(s.innerHTML, 10) < 9 && parseInt(s.innerHTML, 10) !== isNaN) {
          s.style.color = 'green';
        };
      });
})
.catch(ex => console.log(ex));









