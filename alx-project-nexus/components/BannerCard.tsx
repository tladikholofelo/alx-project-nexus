interface BannerCardProps {
  product: any;  // Your product type
  title: string;
  description: string;
  buttonText1: string;
  buttonLink1: string;
  size?: 'large' | 'small';  // Add size prop for the card size
  onQuickView: () => void;
}

// BannerCard Component (simplified)
const BannerCard = ({
  product,
  title,
  description,
  size = "medium", // Make it large by default
}: {
  product: any;
  title: string;
  description: string;
  size?: string;
}) => {
  const cardSizeClass = size === "large" ? "h-72" : "h-48"; // Adjust the height for the size (example)
  
  return (
    <div className={`relative bg-gray-200 rounded-lg overflow-hidden ${cardSizeClass}`}>
      {/* Card Image */}
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image || "/default-banner.jpg"})` }}>
        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 text-white bg-gradient-to-l from-black to-transparent">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-lg mt-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
