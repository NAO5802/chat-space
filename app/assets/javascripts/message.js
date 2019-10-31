$(function(){

  function buildHTML(data){
    var image_view = `<img src="${data.image}">`

    var html = `<div class="message" data-id="${data.id}">
                  <div class="chatField__info">
                    <div class="chatField__info--user">
                      ${data.user_name}
                    </div>
                    <div class="chatField__info--date">
                      ${data.date}
                    </div>
                  </div>
                  <div class="chatField__message">
                    ${data.body}
                    ${ (data.image != null) ? image_view : '' }
                  </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chatField').append(html);
      $('.chatField').animate({scrollTop: $('.chatField')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージが送信できませんでした');
    });
    return false;
  });

  var reloadMessages = function(){
    var last_message_id = $('.chatField__info:last').attr('data-id');
    var chatFieldUrl = window.location.href.match(/\/groups\/\d+\/messages/)

    if (chatFieldUrl){

    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json', 
      data: { id: last_message_id }
    })
    .done(function(datas){
        var insertHTML = '';
        datas.forEach(function(data){
          insertHTML += buildHTML(data);
          return insertHTML
        });
        

        if (last_message_id < datas.id) {
          $('.chatField').append(insertHTML);
          $('.chatField').animate({scrollTop: $('.chatField')[0].scrollHeight}, 'fast');
        }
        
      })
      .fail(function(){
        alert('ページの再読み込みができませんでした');
      });
    } 
  }
  setInterval(reloadMessages, 5000);
});
