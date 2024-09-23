import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadRegular from "./UploadRegular";
import CurrentRegular from "./CurrentRegular";

const RegularPlan = () => {
  const [showUploadRegular, setShowUploadRegular] = useState(false);

  const handleUpdateRegularPlan = () => {
    setShowUploadRegular(true);
  };

  const handleGoBack = () => {
    setShowUploadRegular(false);
  };

  return (
    <div>
      {/* <div className="do-wrap">
        {showUploadRegular && (
          <>
            <div class="wrap-content-create-emp container">
              <a onClick={handleGoBack}><img src="./uploads/regular-plan.png"/>Regular Plan</a>
              <a onClick={handleUpdateRegularPlan}><img src="./uploads/update-plan.png"/>Update Regular Plan</a>
            </div>
            <div>
              <UploadRegular />
            </div>
          </>
        )}
        {!showUploadRegular && (
          <>
            <div class="wrap-content-create-emp container">
              <a onClick={handleGoBack}><img src="./uploads/regular-plan.png"/>Regular Plan</a>
              <a onClick={handleUpdateRegularPlan}><img src="./uploads/update-plan.png"/>Update Regular Plan</a>
            </div>
            <div className="wrap-body-container container">
              <CurrentRegular />
            </div>
          </>
        )}
      </div> */}
    </div>
  );
};

export default RegularPlan;
