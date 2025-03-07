
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="text-2xl font-bold text-health-600">Loading Health Sync...</div>
      </div>
    </div>
  );
};

export default Index;
