$(document).ready(function(){
  var url_base = 'http://157.230.17.132:3011/todos/';

  visualizzaCompiti(url_base);
  inserisciNuovoCompito(url_base);
  modificaCompito(url_base);
  eliminaCompito(url_base);
});

// per visualizzare i compiti
function visualizzaCompiti(url){
  // codice da clonare
  var list_item = $('#template_list').html();
  // funzione compilatrice
  var template_list_item_function = Handlebars.compile(list_item);

  // codice da clonare
  var list_item_select = $('#template_select').html();
  // funzione compilatrice
  var template_list_item_select_function = Handlebars.compile(list_item_select);

  // svuoto l'ul
  $('ul.list').empty();
  // svuoto la select
  $('select').empty();

  $.ajax({
    url: url,
    method: 'get',
    success: function (data, stato) {
      console.log(data);
      var item_list;
      $('select').append('<option value="">Seleziona</option>');

      for (var i = 0; i < data.length; i++){
        item_list = {
          id: data[i].id,
          compito: data[i].text
        }
        var html = template_list_item_function(item_list);
        $('ul.list').append(html);
        var html2 = template_list_item_select_function(item_list);
        $('select').append(html2);
      }
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
    }
  });
}

// per inserire un nuovo compito
function inserisciNuovoCompito(url){
  // quando clicco su Aggiungi alla lista
  $('#link_new_todo').click(function(){
    // prendo il testo della input text
    var input_todo = $('#input_new_todo').val();
    console.log(input_todo);
    // azzero l'input text
    $('#input_new_todo').val('');
    $.ajax({
      url: url,
      method: 'post',
      data: {
        text: input_todo
      },
      success: function (data) {
        visualizzaCompiti(url);
      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
    });
  });
};

// per modificare un compito
function modificaCompito(url){
  // quando cambio opzione
  $('select').change(function(){
    var opzione_selezionata = $(this).children("option:selected").val();
    console.log(opzione_selezionata);
    // quando clicco su Modifica compito
    $('#link_edit_todo').click(function(){
      // prendo il valore di quello che scrive l'utente nell'input text
      var compito_sostitutivo = $('#input_edit_todo').val();
      console.log(compito_sostitutivo);
      // azzero l'input text
      $('#input_edit_todo').val('');
      $.ajax({
        url: url + opzione_selezionata,
        method: 'put',
        data: {
          text: compito_sostitutivo
        },
        success: function (data) {
          console.log(data);
          visualizzaCompiti(url);
        },
        error: function (richiesta, stato, errori) {
          alert("E' avvenuto un errore. " + errore);
        }
      });
    });
  });
};

// per eliminare un compito
function eliminaCompito(url){
  // quando clicco su un'icona
  $('ul').on('click', 'i', function(){
    // prendo l'id dell'item da cancellare
    var item_to_delete = $(this).parent('li').attr('data-id');
    $.ajax({
      url: url + item_to_delete,
      method: 'delete',
      success: function (data) {
        visualizzaCompiti(url);
      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
    });
  });
};
