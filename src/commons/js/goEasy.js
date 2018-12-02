

export function send (content) {
  var goEasy = new GoEasy({appkey: 'BC-1ddb4df96e40422ca48d7495338fe0a9'});
    goEasy.publish({
      channel:'1_2_ch',
      message:content
    });
}


export function receive () {
  var goEasy = new GoEasy({appkey: 'BC-1ddb4df96e40422ca48d7495338fe0a9'});
  goEasy.subscribe({
    channel:'1_2_ch',
    onMessage: function(message){
      return message.content;


    }
  });
}

