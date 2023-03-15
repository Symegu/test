var token = "f7bc370d1bf9ba5bcbe89fde525b7c66045e946f";

function join(arr /*, separator */) {
  var separator = arguments.length > 1 ? arguments[1] : ", ";
  return arr.filter(function(n){return n}).join(separator);
}

function typeDescription(type) {
  var TYPES = {
    'INDIVIDUAL': 'Индивидуальный предприниматель',
    'LEGAL': 'Организация'
  }
  return TYPES[type];
}

function showSuggestion(suggestion) {
  console.log(suggestion);
  var data = suggestion.data;
  if (!data)
    return;
  
  $("#type").text(
    typeDescription(data.type) + " (" + data.type + ")"
  );

  if (data.name) {
    $("#name_short").val(data.name.short_with_opf || "");
    $("#name_full").val(data.name.full_with_opf || "");
  }
    
  $("#inn_kpp").val(join([data.inn, data.kpp], " / "));
  
  if (data.address) {
    var address = "";
    if (data.address.data.qc == "0") {
      address = join([data.address.data.postal_code, data.address.value]);
    } else {
      address = data.address.data.source;
    }
    $("#address").val(address);
  }
}

$("#party").suggestions({
  token: token,
  type: "PARTY",
  count: 5,
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: showSuggestion
});