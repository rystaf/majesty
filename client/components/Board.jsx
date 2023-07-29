import m from 'mithril';

class Tile {
  view({ attrs: { state, tile }}) { return (
    <div 
      class={[
        "flex-1 flex flex-col bg-orange-500 overflow-hidden relative border-2 rounded-lg",
        tile.Position == state.Dragon.Position
          ? state.Dragon.OnFire || !state.Dragon.Hidden && (state.Knights.find(k => k.Position == tile.Position) || tile.Arrows.length)
            ? "border-red-500"    // Damage
            : "border-green-500"  // Default
          : !tile.Arrows.length && state.Archers.find(a => a.Position == tile.Position && a.AP)
            ? "border-yellow-300" // Archer
            : "border-lime-950",  // Dragon
      ].join(" ")}
      onclick={e=>{
        console.log("click tile")
        state.TileClick(tile.Position)
      }}
    >
      <div class={[
        "absolute h-full w-full bg-stretch tile bg-center bg-contain z-0",
        tile.Terrain,
        tile.OnFire && "onfire",
      ].join(" ")}></div>
      { state.Dragon.Position == tile.Position && tile.Terrain == "mountain" && state.Dragon.Hidden &&
        <div class="absolute h-full w-full">
        <div class="absolute h-2/4 w-full p-2 right-3"
        ><div class="dragon h-full w-full bg-contain bg-center bg-no-repeat"></div></div>
        <div class={[tile.OnFire && "onfire","bg-stretch absolute h-full w-full bg-contain z-20 hide box-border"].join(" ")}></div>
        </div>
      }
      { tile.Arrows.map(vertical =>
        <div class={[
          "bg-yellow-300 absolute z-40",
          vertical 
            ? "w-[4px] h-full left-1/2"
            : "h-[4px] top-1/2 w-full"
          ].join(" ")}></div>
      )}
      <div class="z-20 h-full flex flex-col">
      <div class="flex-1 flex">
        <div class="flex-1 flex flex-col relative">
          { 
            state.Peasants.filter(p => p.Position == tile.Position).map(p => (
              <div class="flex-1" onclick={e=>{
                console.log("click peasant")
                if (p.Position == state.Dragon.Position) {
                  state.Dragon.Hidden = false
                  p.Chomp()
                  return false
                }
              }}><div class={["h-full z-10 peasant bg-contain bg-center bg-no-repeat bg-top", p.OnFire ? "onfire":""].join(" ")}></div></div>
            ))
          }
          {/* (state.Peasants.filter(p => p.Position == tile.Position).length > 0) ? <div class="text-center absolute top-9 w-full font-bold">{ state.Peasants.filter(p => p.Position == tile.Position).length}</div> : "" */}
        </div>
        <div class="flex-1 flex flex-col">
          <div class={["flex-1 w-full flex flex-col", tile.Dragon && state.Dragon.OnFire ? "onfire":""].join(" ")}>
            { state.Dragon.Position == tile.Position &&
              <div class={[
                "flex-1 dragon bg-contain bg-center bg-no-repeat",
                state.Dragon.Hidden ? "hidden":"",
                state.Dragon.OnFire
                  ? state.Dragon.AP
                    ? "onfire"
                    : "onfire rotate-90"
                  : "",
              ].join(" ")}
                onclick={ () => {
                  console.log("click dragon")
                  return state.Use()
                }}
                ></div>
            }
          </div>
          <div class="flex-1">
            { state.Cottages.filter(x => x.Position == tile.Position).map( c =>
              <div class={["h-full thecottage bg-contain bg-center bg-no-repeat", c.OnFire ? "onfire":""].join(" ")}></div>
            )}
          </div>
        </div>
        <div class="flex-1 flex flex-col justify-center">
          { state.Knights.filter(k => k.Position == tile.Position).map(k => (
            <div class="flex-1"><div class={["h-full w-full bg-center bg-contain bg-no-repeat knight", k.Hammer ?"hammer":""].join(" ")}></div></div>
          ))}
          { state.Archers.filter(a => a.Position == tile.Position).map(a => (
            <div class="flex-1"><div class={["h-full w-full bg-center bg-contain bg-no-repeat archer", a.Vertical? "vertical":""].join(" ")}></div></div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )}
}

export default class Board {
  view({ attrs: { state }}) {
    let columns = 5
    let rows = Math.ceil(state.Tiles.length/columns)
    return (
    <div class="h-full relative flex flex-col bg-lime-950">{
      [...Array(rows).keys()].map(row => state.Tiles.map((t,i) => ({...t, Position: i})).slice(row*columns,(row+1)*columns)).map(row =>
        <div class="flex flex-1">{row.map(tile => <Tile state={state} tile={tile} />)}
        </div>)}
    </div>
  )}
}

