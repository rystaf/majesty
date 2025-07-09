window.tileClick = e => {
  if (e.target.tagName == "INPUT") return
  input = e.currentTarget.querySelector("input")
  input?.click()
}

//import WSConnection from './ws.js'
//new WSConnection({
//  port: 8083,
//  onmessage: msg => {
//    if (msg.data) {
//      console.log("reload:",msg.data)
//      window.location.reload()
//    }
//  }
//})
//new WSConnection({
//  //onmessage: msg => document.getElementsByTagName("form")[0].submit()
//})

window.oncontextmenu = function ()
{
  undo = document.querySelector("input[value=Undo]")
  if (false && undo && !undo.disabled) {
    undo.click()
    return false;     // cancel default menu
  }
}

function insertResponse(res){
  document.querySelector("main").outerHTML = res
}

window.formSubmit = (e) => {
  e.preventDefault();
  request(e.target.action, e.submitter.name+"="+e.submitter.value, insertResponse)
  return false;
}

function request(theUrl, params, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  var method = "GET"
  if (params) method = "POST"
  xmlHttp.open(method, theUrl, true);
  if (method = "POST")
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlHttp.send(params);
}
function clickable(el) {
  var input = el.currentTarget.querySelector("input")
  if (input) input.click()
};
document.onkeydown = function (e) {
  e = e || window.event;
  switch(e.keyCode) {
    case 8: // backspace
      document.querySelector("input[value=Undo]").click()
      break;
    case 40: // down
      document.querySelector("input[value=South]").click()
      break;
    case 38: // up
      document.querySelector("input[value=North]").click()
      break;
    case 37: // left
      document.querySelector("input[value=West]").click()
      break;
    case 39: // right
      document.querySelector("input[value=East]").click()
      break;
    case 66: // B
      document.querySelector("input[value=Burrow]").click()
      break;
    case 67: // C
      document.querySelector("input[value='Burninate Cottage']").click()
      break;
    case 72: // H
      document.querySelector("input[value=Hide]").click()
      break;
    case 84: // T
      document.querySelector("input[value='Burninate Tile']").click()
      break;
    default:
  }
};
