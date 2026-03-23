import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MinistryHub from "./MinistryHub";

const Index = () => {
  const [shouldRedirect, setShouldRedirect] = useState(() => window.innerWidth < 1066);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1066) {
        setShouldRedirect(true);
      } else {
        setShouldRedirect(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/landing" replace />;
  }

  return <MinistryHub />;
};

export default Index;
