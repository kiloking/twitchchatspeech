//選擇帳號按確定 開始偵測
//過濾調BOT帳號不念
//連結懶得念
//可調整音量 音調 速度
//說話的方法

const twitchid = document.querySelector('#twitchid')
const switchID = document.querySelector('#switchID')
const status = document.querySelector('.status')
let customChannel = ''
let listeningForCount = true
const users = {}
const synth = window.speechSynthesis;

switchID.addEventListener('click',function(){
  console.log('1')
  startChat(twitchid.value)
})

//開始擷取
const startChat = (channel) => {
  // if(client) {
  //   client.disconnect()
  // }
  const client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [channel]
  });
  client.connect()
    .then(()=>{
      console.log('success')
      status.innerHTML = 'success'
    })
    .catch(()=>{
      console.log('error')
      status.innerHTML = 'error'
    })

  client.on('message', (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    if(self) return true;
    const { username }  = tags
  
    if(username === 'Nightbot' ) return
    if(listeningForCount && message){
      console.log(message)
      checkMessage(message)

    }
  });
  
}


const createSpeak = (msg) => {
  let u = new SpeechSynthesisUtterance();
  u.text = msg;
  let voices = synth.getVoices();
  for(let index = 0; index < voices.length; index++) {
    if(voices[index].name == "Google 國語（臺灣）"){       
      u.voice = voices[index];
      break;
    }else{
      u.lang = 'zh-TW';
    }
  }
  synth.speak(u);
};
const checkMessage = (msg) => {
  if(is_url(msg)){
    createSpeak('連結懶得念')
  }else{
    createSpeak(msg)
  }
}


const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

const is_url = (str) =>{
  if (regexp.test(str)){
    return true;
  } else {
    return false;
  }
}
