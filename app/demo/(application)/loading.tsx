import React from "react";

const Loading = () => {
  return (
    <div className="loading flex h-screen w-full items-start justify-center text-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
};

export default Loading;
