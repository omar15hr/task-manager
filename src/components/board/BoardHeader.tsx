// import { Dots, Filter } from "../Icons";

export function BoardHeader() {
  return (
    <div className="flex flex-row justify-between items-center p-4 shadow-md bg-white/20 text-white w-full">
      <h1 className="text-2xl font-bold">Tablero</h1>
      {/* <div className="flex gap-5 items-center">
        <button className="flex gap-1 items-center cursor-pointer hover:bg-white/30 p-2 rounded-md">
          <Filter />
          <span>Filtros</span>
        </button>
        <button>
          <Dots size={30} className="hover:bg-white/30" />
        </button>
      </div> */}
    </div>
  );
}