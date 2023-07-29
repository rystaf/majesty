export default class Burnable {
  constructor(init={}) {
    Object.assign(this, init, {
      OnFire: false,
    })
  }
  Burn(){
    this.OnFire = true
  }
  Repair(){
    this.OnFire = false
  }
}
