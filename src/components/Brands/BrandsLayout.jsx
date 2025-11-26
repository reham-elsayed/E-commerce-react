import { Outlet } from "react-router-dom";

const BrandsLayout  = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Brands</h1>
      <Outlet />  
    </div>
  );
};

export default BrandsLayout ;