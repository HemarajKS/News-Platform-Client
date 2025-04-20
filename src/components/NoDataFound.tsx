import React from "react";

interface NoDataFoundProps {
  message?: string;
  suggestion?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  message = "No data found!",
  suggestion = "Try changing the filters to find what you're looking for.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
      <p className="text-gray-500 mt-2">{suggestion}</p>
    </div>
  );
};

export default NoDataFound;
