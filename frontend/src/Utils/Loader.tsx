// Loader.tsx

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50 ">
      <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col items-center gap-4 animate-fade-in w-full h-full justify-center">
        <div className="w-16 h-16 border-[6px] border-t-transparent border-blue-500 rounded-full animate-spin" />
        <p className="text-white font-semibold text-lg tracking-wide">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
