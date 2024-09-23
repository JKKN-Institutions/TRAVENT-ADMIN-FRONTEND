import React, { useState } from 'react';
import AddInstitutionForm from './AddInstitutionForm';
import AddInstituteForm from './AddInstituteForm';
import AddDepartmentForm from './AddDepartmentForm';
import AddYearForm from './AddYearForm';
import AddSectionForm from './AddSectionForm';
import ReviewForm from './ReviewForm';
import AddAdminForm from './AddAdminForm';
import './ManageInstitutions.css'; // Adding CSS for positioning

const ManageInstitutions = () => {
  const [currentStep, setCurrentStep] = useState('addInstitution');
  const [institutionData, setInstitutionData] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const [currentInstituteIndex, setCurrentInstituteIndex] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [currentDepartmentIndex, setCurrentDepartmentIndex] = useState(0);
  const [years, setYears] = useState([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [sections, setSections] = useState([]);
  const [adminDetails, setAdminDetails] = useState({});

  const handleSaveInstitution = (data) => {
    setInstitutionData(data);
    setCurrentStep('addInstitute');
  };

  const handleSaveInstitute = (institute) => {
    setInstitutes([...institutes, { ...institute, departments: [] }]);
    setCurrentInstituteIndex(institutes.length);
    setCurrentStep('addDepartment');
  };

  const handleSaveDepartment = (department) => {
    const updatedInstitutes = [...institutes];
    updatedInstitutes[currentInstituteIndex].departments.push({ ...department, years: [] });
    setInstitutes(updatedInstitutes);
    setCurrentDepartmentIndex(updatedInstitutes[currentInstituteIndex].departments.length - 1);
    setCurrentStep('addYear');
  };

  const handleSaveYear = (yearCount) => {
    const newYears = Array.from({ length: yearCount }, (_, i) => ({
      year: i + 1,
      sections: [],
    }));

    const updatedInstitutes = [...institutes];
    updatedInstitutes[currentInstituteIndex].departments[currentDepartmentIndex].years = newYears;
    setInstitutes(updatedInstitutes);
    setYears(newYears);
    setCurrentYearIndex(0);
    setCurrentStep('addSection');
  };

  const handleSaveSection = (sectionList) => {
    const updatedInstitutes = [...institutes];
    const currentDepartment = updatedInstitutes[currentInstituteIndex].departments[currentDepartmentIndex];
    currentDepartment.years[currentYearIndex].sections = sectionList.join(',');

    setInstitutes(updatedInstitutes);

    if (currentYearIndex < years.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1);
    } else {
      setCurrentStep('departmentOrFinish');
    }
  };

  const handleDepartmentOrFinish = (choice) => {
    if (choice === 'addDepartment') {
      setCurrentStep('addDepartment');
    } else if (choice === 'addInstitute') {
      setCurrentStep('addInstitute');
    } else if (choice === 'finish') {
      setCurrentStep('addAdmin');
    }
  };

  const handleSaveAdminDetails = (details) => {
    setAdminDetails(details);
    setCurrentStep('review');
  };

  const handleDeleteDepartment = (departmentIndex) => {
    const updatedInstitutes = [...institutes];
    updatedInstitutes[currentInstituteIndex].departments.splice(departmentIndex, 1);
    setInstitutes(updatedInstitutes);

    if (currentDepartmentIndex >= departmentIndex) {
      setCurrentDepartmentIndex(Math.max(0, currentDepartmentIndex - 1));
    }
  };

  const submitAllData = async () => {
    const finalData = {
      ...institutionData,
      institutes,
      adminDetails,
    };

    try {
      const response = await fetch('http://localhost:3000/api/institutions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert('Institution data saved successfully!');
        setInstitutionData({});
        setInstitutes([]);
        setDepartments([]);
        setYears([]);
        setSections([]);
        setAdminDetails({});
        setCurrentStep('addInstitution');
      } else {
        const result = await response.json();
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('An error occurred while saving the data.');
      console.error(error);
    }
  };

  const renderInstitutionDetails = () => {
    if (Object.keys(institutionData).length > 0) {
      return (
        <div className="institution-details-container">
          <h3>Institution Details</h3>
          <p><strong>Name:</strong> {institutionData.institutionName}</p>
          <p><strong>State:</strong> {institutionData.state}</p>
        </div>
      );
    }
    return null;
  };

  const renderCurrentInstituteDetails = () => {
    if (institutes.length > 0) {
      const institute = institutes[currentInstituteIndex];
      return (
        <div className="current-institute-details-container">
          <h3>Current Institute Details</h3>
          <p><strong>Code:</strong> {institute.instituteCode}</p>
          <p><strong>Name:</strong> {institute.instituteName}</p>
          <p><strong>State:</strong> {institute.state}</p>
        </div>
      );
    }
    return null;
  };

  const renderAddedDepartments = () => {
    if (institutes.length > 0 && institutes[currentInstituteIndex].departments.length > 0) {
      const departments = institutes[currentInstituteIndex].departments;
      return (
        <div className="added-departments-container">
          <h3>Added Departments</h3>
          {departments.map((department, index) => (
            <div key={index} className="department-card">
              <div className="department-card-header">
                <h4>{department.departmentName}</h4>
                <button className="delete-button" onClick={() => handleDeleteDepartment(index)}>Delete</button>
              </div>
              <div className="department-card-body">
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Sections</th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.years.map((year, i) => (
                      <tr key={i}>
                        <td>{year.year}</td>
                        <td>{year.sections}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'addInstitution':
        return <AddInstitutionForm onSave={handleSaveInstitution} />;
      case 'addInstitute':
        return <AddInstituteForm onSave={handleSaveInstitute} />;
      case 'addDepartment':
        return <AddDepartmentForm onSave={handleSaveDepartment} />;
      case 'addYear':
        return <AddYearForm onSave={handleSaveYear} />;
      case 'addSection':
        return <AddSectionForm year={years[currentYearIndex].year} onSave={handleSaveSection} />;
      case 'departmentOrFinish':
        return (
          <div>
            <h3>Would you like to add another department or finish with this institute?</h3>
            <button onClick={() => handleDepartmentOrFinish('addDepartment')}>Add Department</button>
            <button onClick={() => handleDepartmentOrFinish('addInstitute')}>Add Another Institute</button>
            <button onClick={() => handleDepartmentOrFinish('finish')}>Finish and Review</button>
          </div>
        );
      case 'addAdmin':
        return <AddAdminForm onSave={handleSaveAdminDetails} />;
      case 'review':
        return <ReviewForm data={{ institutionData, institutes, adminDetails }} onSubmit={submitAllData} />;
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="manage-institutions-container">
      {renderInstitutionDetails()}
      {renderCurrentInstituteDetails()}
      {renderAddedDepartments()}
      <div className="form-container">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ManageInstitutions;
