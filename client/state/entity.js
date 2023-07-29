import {HEART,VOID} from './constants'
import Burnable from './burnable'

class Entity extends Burnable {
  constructor(init={}) {
    super(init)
    Object.assign(this, init, {
      Position: 0,
      AP: 0,
    })
  }
  Move(dest, AP=0){
    let options
    if (dest == undefined) {
      options = Object.entries(this.GetNeighbors()).filter(x => !isNaN(x[1])).map(x => x[0])

      let r = Math.random()
      dest = options
        .filter(x => x != this.LastMove)
        .find((x,i,s)=>Math.floor(s.length*r)==i)
    }
    if (dest == undefined) {
      console.log("move", this, {options})
      return
    }
    let v = ["North", "South"]
    let h = ["East", "West"]
    this.LastMove = v.includes(dest) ? v[1-v.indexOf(dest)] : h[1-h.indexOf(dest)]
    this.Position = isNaN(dest)
      ? this.Position > -1 ? this.GetNeighbors()[dest] : this.Position
      : dest
    this.AP -= this.AP ? 1 : 0
    this.AP += AP
    return this.Position
  }
  Burn(AP=4){
    console.log("burn", this)
    this.OnFire = true
    this.AP = AP
    this.CanDiagonal = false
    return this.AP
  }
  Chomp(){
    console.log("chomp")
    this.Position = HEART
    this.OnFire = false
    this.AP = 0
    return true
  }
  Void(){
    this.OnFire = false
    this.Position = VOID
    this.AP = 0
    return false
  }
  GetNeighbors() {
    let wrap = this.CanWrap
    let i = this.Position
    let n = {
      North: (i + 20) % 25,
      East: (Math.floor(i / 5) * 5) + (i+1)%5,
      West: (Math.floor(i / 5) * 5) + (i+4)%5,
      South: (i + 5) % 25,
    }
    if (this.CanDiagonal) {
      Object.assign(n, {
        NE: Math.floor(n.North/5)*5 + (n.North+1)%5,
        NW: Math.floor(n.North/5)*5 + (n.North+4)%5,
        SE: Math.floor(n.South/5)*5 + (i+1)%5,
        SW: Math.floor(n.South/5)*5 + (i+4)%5,
      })
    }
    return {
      North: (wrap || n.North < i) ? n.North : undefined,
      East: (wrap || n.East > i) ? n.East : undefined,
      South: (wrap || n.South > i) ? n.South : undefined,
      West: (wrap || n.West < i) ? n.West : undefined,
      NE: (wrap || (n.NE < i && n.NE%5 > i%5)) ? n.NE : undefined,
      NW: (wrap || (n.NW < i && n.NW%5 < i%5)) ? n.NW : undefined,
      SE: (wrap || (n.SE > i && n.SE%5 > i%5)) ? n.SE : undefined,
      SW: (wrap || (n.SW > i && n.SW%5 < i%5)) ? n.SW : undefined,
    }
  }
}

export class Peasant extends Entity {
  constructor(init){
    super(init)
    Object.assign(this,{
      CanDiagonal: true,
    },init)
  }
  Move(dest,AP){
    if (this.AP == 0 && !AP && this.OnFire) return this.Void()
    return super.Move(dest,AP)
  }
}
export class Knight extends Entity {
  constructor(init){
    super(init)
    Object.assign(this,init,{
      Hammer: false
    })
  }
}
export class Archer extends Entity {
  constructor(init){
    super(init)
    Object.assign(this,init,{
      Vertical: false
    })
  }
  Move(dest,AP){
    let options = Object.entries(this.GetNeighbors()).filter(x => !isNaN(x[1])).map(x => x[0])

    let r = Math.random()
    dest = options
      .filter(x => x != this.LastMove)
      .find((x,i,s)=>Math.floor(s.length*r)==i)
    this.Vertical = ["North", "South"].includes(dest)
    return super.Move(dest,AP)
  }
}
export class Dragon extends Entity {
  constructor(init){
    super(init)
    Object.assign(this,{
      Hidden: false
    }, init)
  }
  Hide(){
    this.Hidden = true
  }
}

export class Cottage extends Entity {
  constructor(init){
    super(init)
    Object.assign(this,init,{
      CanDiagonal: true
    })
  }
}

export class Tile extends Entity {
  constructor(init){
    super(init)
    Object.assign(this,{
      Arrows: []
    },init)
  }
}

