import { List } from "./list";
import { NewButton } from "./new-button";

export const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 h-full w-[80px] flex p-4 flex-col gap-y-6 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-xl border-r border-white/20"></div>
      
      <div className="relative z-10 flex justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
          <div className="w-6 h-6 bg-white rounded-lg"></div>
        </div>      </div>
      
      <div className="relative z-10 flex-1 flex flex-col gap-y-4">
        <List />
        <NewButton />      </div>
      
      <div className="relative z-10 flex justify-center">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
      </div>
    </aside>
  );
};
