json.body       @message.body
json.image      @message.image_url
json.date       @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name  @message.user.name
