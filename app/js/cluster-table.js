import { data as aiData , number as nbLine} from '../../app/data/data';
import Handsontable from '../../node_modules/handsontable-pro/dist/handsontable.full.min.js';

let itemPerPage = nbLine / 10;
let getData = (function() {
  let data = aiData;
  // Pagination
  return function() {
    var page  = parseInt(window.location.hash.replace('#', ''), 10) || 1,
      limit = itemPerPage,
      row = (page - 1) * limit,
      count = page * limit,
      part = [];
    for (; row < count; row++) {
      part.push(data[row]);
    }
    return part;
  };
})();
let colHeaders = [
  'checkbox',
  'select',
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

// Cell types
let columns = [
  {
    data:'check',
    type: 'checkbox'
  },
  {
    type: 'dropdown',
    source: ['A', 'B', 'C', 'D']
  },
  {
    data: 'wording',
    type: 'text',
    editor: false,
    readOnly: true,

  },
  {
    data: 'origin',
    type: 'text',
    editor: false,
    readOnly: true,
  },
  {
    data: 'stemmed',
    type: 'text',
    editor: false,
    readOnly: true,
  },
  {
    data: 'category',
    type: 'numeric',
    editor: false,
    readOnly: true,
  },
  {
    data: 'global_predict',
    type: 'numeric',
    editor: false,
    readOnly: true,
  },
  {
    data: 'user_predict',
    type: 'numeric',
    editor: false,
    readOnly: true,
  },
  {
    data: 'bank',
    type: 'text',
    editor: false,
    readOnly: true,
  },
  {
    data: 'value',
    type: 'numeric',
    editor: false,
    readOnly: true,
    numericFormat: {
      pattern: '0.0'
    }
  },
  {
    data: 'user',
    type: 'text',
    editor: false,
    readOnly: true,
  },
  {
    data: 'id_client2',
    type: 'text',
    editor: false,
    readOnly: true,

  },
  {
    data: 'transac_date',
    type: 'date',
    editor: false,
    readOnly: true,
    dateFormat: 'YYYY-MM-DD'
  },
  {
    data: 'index',
    type: 'text',
    editor: false,
    readOnly: true,
  },
  {
    data:'ismonthly',
    type: 'checkbox',
    //editor: false,
    //readOnly: true,
  }
];

let old;
setTimeout(() => {
  const hotSetting = {
    data: getData(),
    // data: Handsontable.helper.createSpreadsheetData(10000, 10),
    colHeaders,
    columns,
    rowHeaders: true,
    colWidths: 150,
    rowHeights: 23,
    height: 525,
    contextMenu: true,
    manualRowMove: true,
    sortIndicator: true,
    columnSorting: true,
    manualColumnMove: true,
    manualRowResize: true,
    manualColumnResize: true,
    contextMenu: true,
    filters: true,
    dropdownMenu: true,
    search: true,
    // get data row before user changes
    beforeChange: function(src, changes) {
      old = this.getDataAtRow(src[0][0]);
    },
    // get data row after user changes
    afterChange: function(src, changes) {
      console.log('source', src);
      console.log('changes', changes);
      if (changes == 'edit'){
        let data = this.getDataAtRow(src[0][0]); // Get current row data
        console.log('new data: ' + data);
        console.log('old  data: ' + old)

      }
      if (changes == 'edit' && src[0][3] === true) { // src[0][3] => new value of the current checkbox
        let data = this.getDataAtRow(src[0][0]); // Get current row data
        console.log(' new checkbox data: ' + data);
        console.log('old checkbox data: ' + old)
      }
    }
  };
  const container = document.getElementById('cluster-table');
  const searchFiled = document.getElementById('search_field');
  const pagination = document.getElementsByClassName('pagination');
  let hot = new Handsontable(container, hotSetting); // render table with settings

  function onlyExactMatch(queryStr, value) {
    console.log('exact match');
    return queryStr.toString() === value.toString();
  }

  // Add event to search input
  Handsontable.dom.addEvent(searchFiled, 'keyup', function (event) {
    console.log('it works');
    var queryResult = hot.search.query(this.value);
    console.log(queryResult);
    hot.render();
  });

  // event on pagination to load following data
  $(window).on('hashchange', (event) => {
    hot.loadData(getData());
  });
},500);
