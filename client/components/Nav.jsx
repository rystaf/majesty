import m from 'mithril';

export default class Nav {
  view({ children }) {
    return (
      <nav class="flex justify-center w-full items-center h-8 bg-slate-800">
        <div class="grow basis-0">
          <div class="w-4 h-4 mx-4 bg-yellow-400"></div>
        </div>
        <div class="grow basis-0 text-center font-bold text-yellow-400">
          <div>{ children }</div>
        </div>
        <div class="grow basis-0 flex justify-end">
          <div class="rounded-full w-4 h-4 mx-4 bg-yellow-400"></div>
        </div>
      </nav>
    );
  }
}
