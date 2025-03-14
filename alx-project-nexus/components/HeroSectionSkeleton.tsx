// Hero Section Skeleton
const HeroSectionSkeleton = () => (
  <div className="relative w-full h-screen bg-gray-100 animate-pulse">
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 text-white bg-gradient-to-l from-black to-transparent">
      {/* Placeholder for the main title */}
      <div className="w-1/2 h-16 bg-gray-300 rounded-md mb-4"></div>
      {/* Placeholder for the description */}
      <div className="w-1/3 h-10 bg-gray-300 rounded-md mb-8"></div>
      <div className="flex gap-6">
        {/* Placeholder for the "Shop Now" button */}
        <div className="w-32 h-12 bg-gray-300 rounded-full"></div>
        {/* Placeholder for the "Explore Collection" button */}
        <div className="w-40 h-12 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
);