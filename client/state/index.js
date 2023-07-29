import m from 'mithril'
import {
  Dragon,
  Cottage,
  Peasant,
  Knight,
  Archer,
  Tile
} from './entity'
import { HEART,VOID,CARDINAL } from './constants'

function weighted_random(options) {
  var i;

  var weights = [options[0].weight];

  for (i = 1; i < options.length; i++)
    weights[i] = options[i].weight + weights[i - 1];

  var random = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++)
    if (weights[i] > random)
      break;

  return options[i].item;
}

function rN(n) {
  return math.Floor(math.Random()*n)
}

export default class Game {
  constructor(state={}, ...init) {
    this.Init(state, ...init)
  }
  Init(state={}, ...init){
    this.Moves = this.Moves || 0
    this.Level = state.Level || this.Level || 1
    let tiles,dragonPosition,peasants,cottages,knights,archers
    [tiles=[], dragonPosition, peasants=[], cottages=[], knights=[], archers=[]] = init
    Object.assign(this,{
      init: state.init || init,
      Tiles: [...tiles.map(Terrain => ({ Terrain })),...(state.Tiles ?? [])].map(t => new Tile(t)),
      Dragon: new Dragon({ Position: dragonPosition, ...(state?.Dragon ?? {})}),
      Peasants: [...peasants.map(Position => ({ Position })),...(state.Peasants ?? [])].map(p => new Peasant(p)),
      Cottages: [...cottages.map(Position => ({ Position })),...(state.Cottages ?? [])].map(c => new Cottage(c)),
      Knights: [...knights.map(Position => ({ Position })),...(state.Knights ?? [])].map(k => new Knight(k)),
      Archers: [...archers.map(Position => ({ Position })),...(state.Archers ?? [])].map(a => new Archer(a)),
    })
  }
  Reset(state={Level: 1}, ...init){
    this.Init({...state}, ...(init.length ? init : this.init))
    this.Moves = 0
  }
  Next(){
    let terrain = [...Array(25).keys()].map(x => weighted_random([
      ["stump", 60],
      ["tree", 60],
      ["plain", 60],
      ["forest",60],
      ["rock", 40],
      ["flowers", 60],
      ["mountain", 30],
      ["tunnel", 5],
      ["lake", 1],
    ].map(([item,weight]) => ({item,weight: (weight || 1)}))))
    var rn = [12];
    while(rn.length < 10){
        var r = Math.floor(Math.random() * 25);
        if(rn.indexOf(r) === -1) rn.push(r);
    }
    console.log("next")
    console.log(rn)
    this.Level += 1
    this.Tiles =  terrain.map(t => new Tile({ Terrain: t}))
    this.Dragon = new Dragon({ Position: rn[0] })
    this.Peasants =  [...rn.slice(1,4), -1, -1, -1 ,-1].map(p => new Peasant({ Position: p }))
    this.Cottages = rn.slice(4,7).map(x => new Cottage({ Position: x }))
    this.Knights = rn.slice(7,9).map(k => new Knight({ Position: k }))
    this.Archers = [new Archer({ Position: rn[9] })]
  }
  MoveEnemies(){
    this.Knights.forEach(k => Math.round(Math.random()) && k.Move())
    this.Archers.forEach(a => {
      a.AP = 0
      Math.round(Math.random()) && a.Move(undefined,!Math.round(Math.random()*2)*1)
    })
    this.Cottages.filter(c => c.OnFire && this.Knights.find(k => k.Position == c.Position)).forEach(c => c.Repair())
    this.Tiles.forEach((t,i) => {
      t.Arrows = this.Archers
        .filter(a => a.AP && a.Position != i
          && ((a.Vertical && a.Position % 5 == i % 5)
          || !a.Vertical && Math.floor(a.Position / 5) == Math.floor(i / 5)))
        .map(a => a.Vertical)
    })
  }
  SpawnPeasants(){
    let spawn = this.Cottages.filter(x => !x.OnFire).map(x => x.Position).filter(i => !this.Peasants.find(p => p.Position == i))
    if (Math.floor(Math.random()*10)!=5) {
      spawn = []
    }
    this.Peasants.forEach(p => {
      if (p.Position == HEART && spawn.length && this.Peasants.filter(p => p.Position > -1).length < 4) {
        console.log("spawn")
        p.Move(spawn.pop())
      }
    })
  }
  MovePeasant(p){
    if (p.Position < 0) return
    if (p.OnFire) {
      p.Move()
      if (p.Position < 0) return
      if (this.Tiles[p.Position].Terrain == 'lake') {
        p.OnFire = false
        p.AP = 0
        return
      }
      this.Tiles[p.Position].Burn()
    } else if (Math.random()*5 > 4) {
      p.CanDiagonal = true
      p.Move()
      if (Math.round(Math.random())) this.Tiles[p.Position].Repair()
    }
    if (p.Ap < 0) return
    this.Tiles
      .filter((t,i) => p.Position == i)
      .forEach(t => t.OnFire == p.OnFire)
  }
  CheckDamage(){
    let dmg = this.Knights.filter(k => k.Position == this.Dragon.Position).length
    dmg += this.Tiles[this.Dragon.Position].Arrows.length
    this.Peasants.forEach(p => {
      this.MovePeasant(p)
      if (p.Position == HEART && dmg) {
        console.log("SWORDED")
        dmg--
        p.Void()
      }
    })
    this.Peasants
      .filter(p => !p.OnFire && this.Peasants.find(x => x.OnFire && x.Position == p.Position))
      .forEach(p => {
        console.log("CHAIN")
        p.Burn()
      })

    if (dmg && this.Peasants.every(x => x.Position != HEART)){
      this.Dragon.Burn(20)
      this.Rage()
    }
  }
  Move(dest){
    this.Dragon.Hidden = false
    this.Moves += 1
    if (this.Dragon.OnFire) return
    if (Object.entries(this.Dragon.GetNeighbors()).find(d => d[0] == dest && d[1] == undefined)) return
    this.Dragon.Move(dest)
    this.MoveEnemies()
    this.SpawnPeasants()
    localStorage.setItem('state', JSON.stringify(this));
    return this.CheckDamage()
  }
  Rage(AP){
    console.log("rage", this)
    this.Dragon.Move()
    this.Burn()
    m.redraw()
    localStorage.setItem('state', JSON.stringify(this));
    if (this.Dragon.AP > 0)
      setTimeout(()=>this.Rage(), 300)
  }
  Use(){
    console.log("use")
    if (!this.Dragon.Hidden && this.Peasants.find(p => p.Position == this.Dragon.Position)?.Chomp()) {
      return false
    }
    if (this.Tiles[this.Dragon.Position].Terrain == "mountain") {
      this.Dragon.Hidden = true
      this.MoveEnemies()
      this.SpawnPeasants()
      this.Peasants.forEach(p => this.MovePeasant(p))
      return false
    }
    return this.Burrow()
  }
  TileClick(Position){
    if (this.Dragon.Position == Position) {
      if (!this.Dragon.Hidden) {
      //if (this.Tiles[Position].OnFire && this.Peasants.every(p => p.Position != Position)) return this.Use()
      this.Burn()
      return
      }
      this.Use()
    }
    if (Object.values(this.Dragon.GetNeighbors(false)).includes(Position)
      || [this.Dragon.Position, Position].map(x => this.Tiles[x].Terrain)
        .every(x => x == "tunnel")) this.Move(Position)
    if (Position != this.Dragon.Position && Position % 5 == this.Dragon.Position % 5) {
      if (Position > this.Dragon.Position) {
        this.Move("South")
      } else {
        this.Move("North")
      }
    }
    localStorage.setItem('state', JSON.stringify(this));
    this.CheckDamage()
  }
  End(){
    if ([...this.Cottages, ...this.Tiles].every(x => x.OnFire) && this.Peasants.every(x => x.Position < 0)) {
      return 1
    }
    else if (this.Dragon.OnFire && this.Dragon?.AP == 0 && this.Peasants.every(p => p.Position != HEART)) {
      return 2
    }
  }
  Burrow(){
    const entrance = this.Tiles.findIndex((t,i) => this.Dragon.Position == i && t.Terrain == "tunnel")
    if (entrance < 0) { return true }
    const exit = this.Tiles.findIndex((t,i) => t.Terrain == "tunnel" && i != entrance)
    if (exit < 0) { return true }
    this.Move(exit)
    return false
  }
  Burn(){
    if (this.Dragon.Hidden) {
      this.Dragon.Hidden = false
      return this.CheckDamage()
    }
    this.Peasants.filter(p => p.Position == this.Dragon.Position).forEach(p => this.Dragon.OnFire ? p.Move(VOID) : p.Burn())
    this.Knights.filter(k => k.Position == this.Dragon.Position && this.Dragon.OnFire).forEach(k => k.Void())
    let t = this.Tiles[this.Dragon.Position]
    if (t.Terrain != "lake" || 
      Object.values(this.Dragon.GetNeighbors(false)).every(x => isNaN(x) || this.Tiles[x].OnFire)) {
      t.Burn()
    }
    this.Cottages.find(c => {
      if (c.Position == this.Dragon.Position) {
        console.log(c.GetNeighbors(true))
      }
      return c.Position == this.Dragon.Position
      && (this.Dragon.OnFire || (
        this.Tiles[c.Position].OnFire
        && Object.values(c.GetNeighbors(false)).every(x => isNaN(x) || this.Tiles[x].OnFire)
      ))
    })?.Burn()
  }
}
