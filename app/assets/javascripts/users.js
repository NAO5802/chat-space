$(function(){

  function appendData(data){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${data.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.id}" data-user-name="${data.name}">追加</div>
                </div>
              `;
    $('#user-search-result').append(html);
  }

  function appendErrMsgToHTML(){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>
              `;
    $('#user-search-result').append(html);
  }

  function addDeleteUser(name, id){
    var html = `
                <div class="chat-group-user clearfix" id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>
              `;
    $('.js-add-user').append(html);
  }

  function addMenmber(userId){
    var html = `
                <input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />
              `;
    $(`#${userId}`).append(html);
  }



  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(datas){
      $('#user-search-result').empty();

      if(datas.length !== 0){
          datas.forEach(function(data){
            appendData(data);
          });  
      } else if ( input == 0 ){
        return false;
      }else{
        appendErrMsgToHTML();
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on('click', '.chat-group-user__btn--add',function(){
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");

    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMenmber(userId);
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});