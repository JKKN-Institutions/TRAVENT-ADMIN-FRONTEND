import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadAlter from "./UploadAlter";
import CurrentAlter from "./CurrentAlter";

const AlterPlan = () => {
  const [showAlterRegular, setShowUploadAlter] = useState(false);
  const [showCurrentPlan, setShowCurrentPlan] = useState(false);

  const handleUpdateAlterPlan = () => {
    setShowUploadAlter(true);
  };
  const handleCurrentPlan = () => {
    setShowCurrentPlan(true);
  };
  const handleGoBack = () => {
    setShowUploadAlter(false);
  };

  return (
    <div>
      {/* <div className="do-wrap">
        {!showAlterRegular && (
         
          <>
            <div class="wrap-content-create-emp container">
              <a onClick={handleGoBack}><img src="./uploads/alter-plan.png"/>Alternative Plan</a>
              <a onClick={handleUpdateAlterPlan}><img src="./uploads/update-plan.png"/>Update Alternative Plan</a>
            </div>
            <div className="wrap-body-container container">
              <CurrentAlter />
            </div>
          </>
        )}
        {showAlterRegular && (
          <>
            <div class="wrap-content-create-emp container">
              <a onClick={handleGoBack}><img src="./uploads/alter-plan.png"/>Alternative Plan</a>
              <a onClick={handleUpdateAlterPlan}><img src="./uploads/update-plan.png"/>Update Alternative Plan</a>
            </div>
            <div>
              <UploadAlter />
            </div>
          </>
        )}
       
      </div> */}
    </div>
  );
};

export default AlterPlan;
