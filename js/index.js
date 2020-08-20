var isRun = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function hideShowMsg() {
  isRun = true;
  const listMsg = document.getElementsByClassName('chat-row');
  while (isRun) {
    await sleep(3000);
    await chatRowHideShow(listMsg, 'm-fadeOut', 'm-fadeIn', 200);
    await chatRowHideShow(listMsg, 'm-fadeIn', 'm-fadeOut', 1000);
  }
}

async function stopHideShowMsg() {
  isRun = false;
  const listRow = document.getElementsByClassName('chat-row');
  for(var i = listRow.length-1|0; i>=0; i=i-1|0) {
    await sleep(100);
    listRow[i].classList.remove('m-fadeIn');
    listRow[i].classList.remove('m-fadeOut');
    listRow[i].classList.add('m-fadeIn');
  }
}

async function chatRowHideShow(listRow, anim1, anim2, speed) {
  for(var i = 0, len=listRow.length|0; i<len; i=i+1|0) {
    if (!isRun) {
      return;
    }
    await sleep(speed);
    listRow[i].classList.add(anim1);
    listRow[i].classList.remove(anim2);
  }
}

async function sendMsg() {
  const inputMsg = document.getElementById('input-msg');
  const msg = inputMsg.value.trim();
  if (msg != '') {
    stopHideShowMsg();
    addMsg(msg, 'msg-sent');
    inputMsg.value = '';

    await sleep(1000);
    let botMsg = chatBot.output(msg);
    addMsg(botMsg, 'msg-recived');
  }
}

function addMsg(msg, msgType) {
  const tmpl = document.getElementById('chat-row-template');
  let content = tmpl.content.cloneNode(true);

  let row = content.querySelector('.chat-row');
  row.classList.add(msgType);

  let msgContent = content.querySelector('p');
  msgContent.textContent = msg;

  const chatBody = document.getElementById('chat-body');
  chatBody.appendChild(document.importNode(content, true));
}


$(document).ready(function() {
  hideShowMsg();
})
