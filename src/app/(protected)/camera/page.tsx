import React from "react";
import BarcodeScanner from "./_components/barcode-sc";

const CameraPage = () => {
  return (
    <div className="w-screen h-full p-5">
      <BarcodeScanner />
    </div>
  );
};

export default CameraPage;
