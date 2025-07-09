export default class WSConnection {
  constructor(config){
    if (window.location.hash != "#dev") return;
    this.t = 800
    this.port = config?.port || window.location.port
    this.onmessage = config?.onmessage
    this.start()
  }
  start() {
    var prot = location.protocol == 'https:' ? "wss://":"ws://"
    this.ws = new WebSocket([
      prot,
      document.location.hostname,
      ":",
      this.port,
      //document.location.pathname,
      //document.location.search,
      ].join(''))
    this.ws.onopen = function(){
      this.t = 800
    }
    this.ws.onmessage = this.onmessage
    this.ws.onclose = () => setTimeout(() => {
      this.start()
      if (this.t < (10 * 1000)) this.t += 200
    }, this.t);
  }
}
