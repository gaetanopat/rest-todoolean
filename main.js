$(document).ready(function(){
  var url_base = 'http://157.230.17.132:3011/todos/'

  // visualizzo i compiti
  visualizzaCompiti(url_base);

  // quando clicco sul tasto 'Aggiungi alla lista'
  $('#link_new_todo').click(function(){
    aggiungiCompito(url_base);
  });

  // quando clicco sulla 'X'
  $('ul.list').on('click', 'i', function(){
    // prendo l'id dell'li
    var compito_da_eliminare = $(this).parent('li').attr('data-id');
    eliminaCompito(url_base, compito_da_eliminare);
  });

  // quando clicco su 'Modifica compito'
  $('#link_edit_todo').click(function(){
    // prendo il valore dell'input text
    var compito_modificato = $('#input_edit_todo').val();
    // prendo il value dell'opzione selezionata
    var compito_selezionato = $('select').val();
    // se l'utente ha scritto qualcosa
    if(compito_modificato.length > 0){
      modificaCompito(url_base, compito_modificato, compito_selezionato);
    };
  });
});

// funzione per visualizzare i compiti
function visualizzaCompiti(url){
  //codice da clonare
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
    success: function(data){
      console.log(data);
      var item_list;
      $('select').append('<option value="">Seleziona</option>');
      for (var i = 0; i < data.length; i++) {
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
    error: function(){
      alert('errore');
    }
  });
};

// funzione per aggiungere un compito
function aggiungiCompito(url){
  // prendo il testo dell'input text
  var input_compito = $('#input_new_todo').val();
  $.ajax({
    url: url,
    method: 'post',
    data: {
      text: input_compito
    },
    success: function(data){
      visualizzaCompiti(url);
    },
    error: function(){
      alert('errore');
    }
  });
  // azzero l'input text
  $('#input_new_todo').val('');
};

// funzione per eliminare un compito
function eliminaCompito(url, id_compito){
  $.ajax({
    url: url + id_compito,
    method: 'delete',
    success: function(data){
      visualizzaCompiti(url);
    },
    error: function(){
      alert('errore');
    }
  });
}

// funzione per modificare un compito
function modificaCompito(url, testo_da_inserire, id_compito){
  $.ajax({
    url: url + id_compito,
    method: 'put',
    data: {
      text: testo_da_inserire
    },
    success: function(data){
      visualizzaCompiti(url);
    },
    error: function(){
      alert('errore');
    }
  });
  // azzero l'input text
  $('#input_edit_todo').val('');
};
