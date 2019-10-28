$(function(){
  function buildHTML(data){
    if ( data.image ) {
      var html = `<div class="message">
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
                      <img src="${data.image}">
                    </div>
                  </div>`
      return html;
    }else{
      var html = `<div class="message">
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
                  </div>
                </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

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
      $('.form__message').val('');
      $('#message_image').val('');
      $('.form__submit').prop("disabled", false);
    })
    .fail(function(){
      alert('メッセージが送信できませんでした');
    });
    return false;
  });
});