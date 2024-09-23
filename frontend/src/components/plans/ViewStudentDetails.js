import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewStudentDetails = () => {
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [showStudentData, setShowStudentData] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/fetch_student_details"
      );
      if (response.status === 200) {
        setStudentData(response.data.studentData);
        setShowStudentData(true);
      } else {
        console.error("Failed to fetch Student data");
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    } finally {
        setLoading(false);
    }
  };
  console.log(studentData);

  return (
    <div className="bus-details-table-container">
      {loading ? (
        
        <div className="skeleton-inner-container">
        {/* <div className="skeleton skeleton-header"></div> */}
        <div className="skeleton-wrap">
          
          <div className="skeleton-wrap-inside">
            {/* <div className="skeleton-wrap-inside-1">
            <div className="skeleton skeleton-sub-section"></div>
            <div className="skeleton skeleton-sub-section"></div>
          </div> */}
            <div className="skeleton skeleton-sub-section"></div>
          </div>
        </div>
      </div>
      ) : showStudentData ? (
        <>
       
     
        <div className="student-table-container">
            {/* <h3>Student Details</h3> */}
          <table>
            <thead>
              <tr>
                <th>Registration Number</th>
                <th>Name</th>
                <th>Stopping</th>
                <th>Department</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td>{student.reg_no}</td>
                  <td>{student.name}</td>
                  <td>{student.bus_stopping}</td>
                  <td>{student.department}</td>
                  <td>{student.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
        </>
      ) : null}
    </div>
  );
};

export default ViewStudentDetails;
