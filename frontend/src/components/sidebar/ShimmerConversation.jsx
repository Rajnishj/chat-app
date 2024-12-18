
const ShimmerConversation = () => {
  return Array(6)
    .fill(0)
    .map((n, i) => (
      <div key={i} className="flex gap-4 items-center hover:bg-sky-500/80 rounded p-3 cursor-pointer">
        {/* Avatar Shimmer */}
        <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>

        {/* Text Section Shimmer */}
        <div className="flex-1 space-y-2">
          <div className="w-3/5 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-4/5 h-3 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Timestamp Shimmer */}
        <div className="w-10 h-3 bg-gray-300 rounded animate-pulse"></div>
      </div>
    ));
};

export default ShimmerConversation;
