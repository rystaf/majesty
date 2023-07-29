import m from 'mithril';
import Board from './Board';


class Arrow {
  view({ attrs: { direction, move }}) { return (
    <button class={`cardinal ${direction.toLowerCase()}`} onclick={move(direction)}/>
  )}
}

class Controls {
  view({ attrs: { state } }) { return (
    <div class={"flex justify-around items-stretch hidden"}>
      <div class="flex flex-col justify-center">
        <div class="flex justify-between">
          <Arrow direction="NW" dragon={state.Dragon}/>
          <Arrow direction="North" move={actions.move}/>
          <Arrow direction="NE" move={actions.move}/>
        </div>
        <div class="flex items-center justify-between">
          <Arrow direction="West" move={actions.move}/>
          <div class="flex-1 m-2 flex items-center justify-center"><div class="p-1 border-2 border-gray-200 bg-slate-600 h-14 w-14 text-center bg-no-repeat rounded-full">
            <button class="h-full w-full bg-contain burrow" onclick={actions.burrow} />
          </div></div>
          <Arrow direction="East" move={actions.move}/>
        </div>
        <div class="flex justify-between">
          <Arrow direction="SW" move={actions.move}/>
          <Arrow direction="South" move={actions.move}/>
          <Arrow direction="SE" move={actions.move}/>
        </div>
      </div>
      <div class="">
        <div class="flex justify-center">
          <div class="btn-action p-2 bg-orange-400">
            <input name="input" type="submit" class="font-0 h-full w-full bg-contain peasant onfire bg-no-repeat bg-center" value="Burninate Peasant"/>
          </div>
        </div>
        <div class="flex">
          <div class="btn-action bg-gray-700 p-0.5">
            <button class="h-full w-full bg-contain hide bg-no-repeat bg-center" onclick={actions.hide}/>
          </div>
          <div class="flex-1 btn-action py-1 bg-orange-400">
            <input name="input" type="submit" class="font-0 h-full w-full bg-contain bg-center bg-no-repeat burntile" value="Burninate Tile"/>
          </div>
          <div class="btn-action p-2 bg-red-600">
            <input class="font-0 h-full w-full bg-contain chomp" name="input" type="submit" value="Chomp"/>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="btn-action p-2 bg-orange-400">
            <input name="input" type="submit" class="font-0 h-full w-full bg-contain thecottage onfire bg-no-repeat bg-center" value="Burninate Cottage"/>
          </div>
        </div>
      </div>
    </div>
  )}
}

class Status {
  view({ attrs: { state}}) { 
    const peasantCount = state.Peasants.filter(p => p.Position >= 0).length
    const cottageCount = state.Cottages.filter(c => !c.OnFire).length
    const tileCount = state.Tiles.filter(t => !t.OnFire).length
    return (
    <div>
      <div class="md:flex">
        <div class="flex-1 flex font-mono text-xl flex items-center justify-center text-white">
          <div class="flex items-center">
            <div class="tree h-8 w-8 border-2 rounded border-gray-600 bg-[length:200%_200%]"></div>
            <div class="ml-2">
              <span class={"text-2xl mx-1 font-bold "+(tileCount||"invisible")}>{tileCount}</span>
              <span class="text-xs hidden">/{state.Tiles.length}</span>
            </div>
          </div>
          <div class="mx-2"></div>
          <div class="flex items-center">
            <div class="thecottage bg-lime-700 h-8 w-8 border-2 rounded border-gray-600 bg-center bg-contain bg-no-repeat"></div>
            <div class="ml-2">
              <span class={"text-2xl mx-1 font-bold " + (cottageCount || "invisible")}>{cottageCount}</span>
              <span class="text-xs hidden">/{state.Cottages.length}</span>
            </div>
          </div>
          <div class="mx-2"></div>
          <div class="flex items-center">
            <div class="peasant bg-lime-600 h-8 w-8 border-2 rounded border-gray-600 bg-center bg-contain bg-no-repeat"></div>
            <div class="ml-2">
              <span class={"text-2xl mx-1 font-bold " + (peasantCount || "invisible")}>{peasantCount}</span>
              <span class="text-xs hidden">/{state.Peasants.length}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-1 h-8 justify-center my-1">
          { state.Peasants.map(x => x.Position == -2 ? 99 : x.Position).sort((a,b)=>a-b).map(p => 
          <div class={["w-8 h-full mx-0.5 border-2 rounded border-gray-700",
            p == -1 ? "bg-red-500":"",
            p == 99 ? "border-0 bg-contain bg-gray-700 rounded-full bg-center bg-no-repeat skull":"",
          ].join(" ")}></div>)}
        </div>
        <div class="flex-1 flex justify-around">
          <div class="text-lg mx-2 flex items-center text-red-500 font-mono justify-center font-semibold text-center">LEVEL { state.Level }</div>
          <div class="text-lg mx-2 flex items-center text-red-500 font-mono justify-center font-semibold text-center">MOVES { state.Moves }</div>
          <div onclick={()=>state.Reset()} class="flex items-center justify-center"><div class="bg-orange-700 border-gray-600 hover:border-gray-300 cursor-pointer border-2 px-2 py-1 rounded text-xl font-bold">Reset</div></div>
        </div>
    </div>
  </div>
  )}
}

class Nice {
  view({ attrs: { state } }) {
    const end = state.End()
    return (
    <div class={"z-50 absolute h-full w-full flex justify-center items-center " + (end || " hidden")}>
      <div class={(end == 1 ? "nice" : "dead")+" relative h-72 w-96 bg-black border-4 border-slate-300 rounded-lg bg-no-repeat bg-contain flex justify-end items-center relative bottom-5"}>
        <div class={"absolute z-20 top-0 right-32 p-l-4 smoke w-16 h-28 bg-no-repeat bg-contain " + (end==2 && "invisible")}></div>
        <div class={"absolute z-20 top-8 right-10 p-l-4 over w-72 h-28 bg-no-repeat bg-contain bg-center " + (end==1 && "invisible")}></div>
        <div class="flex h-full flex-col text-center mr-4">
          <div class={"flex flex-col grow "+(end==2 && "invisible")}>
            <div class="grow"></div>
            <div class="mb-6">
              nice work!
            </div>
            <div class="text-2xl font-bold text-red-500 text-shadow">
              <div>LEVEL</div>
              <div>BEATEN!</div>
            </div>
          </div>
          <div class="grow flex flex-col justify-end">

            <div
              class="bg-[#C2C291] rounded-lg mb-2 hover:text-red-500 leading-tight text-shadow hover:font-bold cursor-pointer py-2"
              onclick={ e => {
                e.target.innerHTML = "COPIED"
                let tiles = [0,1,2,3,4].map(r => state.Tiles.map((x,i)=>({...x, Position: i})).slice(r*5, r*5+5).map(x => {
                  if (state.Dragon.Position == x.Position) { 
                    return "🟥"
                  }
                  let c = state.Cottages.find(c => c.Position == x.Position)
                  if (c) {
                    return c.OnFire ? "🟧":"🟨"
                  }
                  return x.OnFire ? "⬛️" : "🟩"
                }).join('')).join('\n')
                let text = `I made it to level ${state.Level} in ${state.Moves} moves!\n${tiles}\n${window.location.href}`
                if (navigator?.share) {
                  navigator.share({ text })
                } else if (navigator?.clipboard) {
                  navigator.clipboard.writeText(text);
                }
                setTimeout(()=>e.target.innerHTML = "SHARE", 1000)
              }}>
              SHARE
            </div>
            { end == 1
              ? <div
                  class="bg-[#C2C291] rounded-lg mb-2 py-2 hover:text-red-500 leading-tight text-shadow hover:font-bold cursor-pointer"
                  onclick={()=>end == 1 ? state.Next() : state.Reset() }>
                  NEXT
                </div>
              : <div
                  class="bg-[#C2C291] rounded-lg mb-2 hover:text-red-500 leading-tight text-shadow hover:font-bold cursor-pointer"
                  onclick={()=>end == 1 ? state.Next() : state.Reset() }>
                  <div>CHALLENGE<br/>AGAIN</div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )}
}

export default class Layout {
  oncreate(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  view({ attrs: { state } }) {
    return (
    <div class="h-screen h-screen-inner">
      {
        <div class="h-full flex flex-col max-w-5xl mx-auto relative">
          <Status state={state}/>
          <div class="h-full">
            <Nice state={state}/>
            <Board state={state}/>
          </div>
        </div>
      }
    </div>
  )}
}
