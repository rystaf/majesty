import m from 'mithril';
import Layout from './components/Layout';
import Game from './state';

const localState =  false //JSON.parse(localStorage.getItem('state'));
const state = localState ? new Game(localState) : new Game({},
  [
    "stump",
    "tree",
    "stump",
    "tunnel",
    "forest",
    "rock",
    "tree",
    "tree",
    "flowers",
    "mountain",
    "tree",
    "forest",
    "rock",
    "tree",
    "flowers",
    "mountain",
    "rock",
    "tree",
    "stump",
    "tree",
    "flowers",
    "tunnel",
    "tree",
    "forest",
    "lake",
  ],
  12, // Dragon
  [0, 8, 22, -1, -1, -1 ,-1], // Peasants
  [0, 8, 22], // Cottages
  [1, 19], // Knights
  [10], // Archers
)

import WSConnection from './ws'
new WSConnection({
  port: 8083,
  onmessage: msg => {
    if (msg.data) {
      console.log("reload:",msg.data)
      window.location.reload()
    }
  }
})
m.mount(document.getElementById("app"), {
  view: () => m(Layout, { state })
});

const press = e => {
  switch(e.keyCode) {
    case 8: // backspace
      break;
    case 40: // down
      e.preventDefault()
      return state.Move("South")
      break;
    case 38: // up
      e.preventDefault()
      return state.Move("North")
      break;
    case 37: // left
      e.preventDefault()
      return state.Move("West")
      break;
    case 39: // right
      e.preventDefault()
      return state.Move("East")
      break;
    case 90: // Z (B)
      state.Burn()
      break;
    case 88: // X (A)
      return state.Use()
      break;
    default:
  }
}
document.onkeydown = function (e) {
  if (state.Dragon.OnFire || state.End()) return
  e = e || window.event;
  press(e)
  m.redraw();
  //console.log(state)
};
