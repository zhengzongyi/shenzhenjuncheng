var isBusy = false;


function showLoadingAnimation () {

}

function hideLoadingAnimation() {

}

function runQuery(data, callback) {
  var hash = md5(data.number + '#' + data.user);
  $.ajax({
    type: 'GET',
    url: './data/' + hash + '.html',
    dataType: 'text',
    timeout: 10000,
    success: function(data, status, xhr){
      callback(null, data);
    },
    error: function(xhr, errorType, error) {
      console.log('failed to request content', xhr)
      callback('未查询到相关信息');
    }
  });
}

function showQueryResult(contentHTML) {
  $('#query-result-content').html(contentHTML);
  $('#query-form').hide();
  $('#query-result').show();
}

function resetContent() {
  $('#query-result-content').empty();
  $('#input-user').val('');
  $('#input-number').val('');

  $('#query-result').hide();
  $('#query-form').show();
}

$('#submit-button').on('click', function(e){
  e.preventDefault();

  if (isBusy) {
    return;
  }

  var formData = {
    user: $.trim($('#input-user').val()),
    number: $.trim($('#input-number').val()),
  };

  if (formData.number == '') {
    alert("请输入保函编号");
    return;
  }

  if (formData.user == '') {
    alert("请输入申请人");
    return;
  }

  isBusy = true;
  showLoadingAnimation();

  runQuery(formData, function(error, contentHTML){
    isBusy = false;
    hideLoadingAnimation();

    if (contentHTML) {
      showQueryResult(contentHTML);
      return;
    }

    alert(error || '系统异常，请稍后再试');
  })

});

// $('#reset-content-button').click(resetContent);

$('#link-query, #reset-content-button').click(function(event){
  event.preventDefault();
  resetContent();
});