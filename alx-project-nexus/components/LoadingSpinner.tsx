type LoadingSpinnerProps = {
  size?: string;
  color?: string;
};

const LoadingSpinner = ({ size = "h-16 w-16", color = "border-blue-500", message = "Loading..." }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={`animate-spin rounded-full ${size} border-t-4 ${color} border-solid`}></div>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
