import { log } from "util";


console.log('first stable ');

let getData = (function() {
  let data = [];

  // One line
  let dataLine = 
  {
    wording:"LILAS ROSE NOIRMOUTIER E",
    origin: "LILAS ROSE NOIRMOUTIER E",
    stemmed: "",
    category: 10,
    gloabl_predict: 10,
    user_predict: 10,
    bank: "BNP Paribas",
    value: -256.5,
    user: "c71e4c418afb4e06ad1a375bff320470",
    id_client2: "001fd177eb8b4a6bbb451933dcf60e60",
    transac_date: "2017-11-04",
    index:"92348",
    ismonthly: false,
  };
// Iteration to simulate N line
for(let i= 0; i < 50; i++) {
  data.push(dataLine);
  //console.log(dataLine);
}

// Pagination
  return function () {
    var page  = parseInt(window.location.hash.replace('#', ''), 10) || 1,
      limit = 10,
      row   = (page - 1) * limit,
      count = page * limit,
      part  = [];

    for (;row < count;row++) {
      part.push(data[row]);
    }
    return part;
  }
})();


let colHeaders = [
  'wording',
  'original_wording',
  'stemmed_wording',
  'catégorie fournie',
  'prediction globale',
  'prediction utilisateur',
  'Banque',
  'value',
  'Utilisateur',
  'id_client2',
  'date_transac',
  'inner_index',
  'ismonthly'
];

const container = document.getElementById('first-table');
const searchFiled = document.getElementById('search_field');
const pagination = document.getElementsByClassName('pagination');
const hotSetting = {
  data: getData(),
  rowHeaders: true,
  colHeaders,
  currentRowClassName: 'currentRow',
  currentColClassName: 'currentCol',
  minSpareRows: 1,
  contextMenu: true,
  filters: true,
  dropdownMenu: true,
  search: true,
};

let hot = new Handsontable(container, hotSetting);

function onlyExactMatch(queryStr, value) {
  console.log('exact match');
  return queryStr.toString() === value.toString();
}

// Add event to serch input
Handsontable.dom.addEvent(searchFiled, 'keyup', function (event) {
  var queryResult = hot.search.query(this.value);
  console.log(queryResult);
  hot.render();
});

$(window).on('hashchange', (event) => {
  console.log('sisi')
  hot.loadData(getData());
});




