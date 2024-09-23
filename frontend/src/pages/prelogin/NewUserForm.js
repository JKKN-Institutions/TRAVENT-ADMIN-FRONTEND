import React, { useState, useEffect } from "react";
import "./NewUserForm.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function NewUserForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState(""); // Indicates whether student or staff
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [stoppings, setStoppings] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [formData, setFormData] = useState({
    type: "",
    basicDetails: {
      name: "",
      email: "",
      gender: "",
      dob: "",
      mobile: "",
      address: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    },
    studentDetails: {
      rollNo: "",
      regNo: "",
      instituteName: "",
      department: "",
      year: "",
      section: "",
    },
    staffDetails: {
      staffId: "",
      instituteName: "",
      department: "",
      designation: "",
    },
    locationDetails: {
      state: "",
      district: "",
      city: "",
      stopName: "",
      route: "",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/register/registerform")
      .then((response) => {
        setInstitutions(response.data);
        console.log("Fetched Institutions and Routes:", response.data); // Log fetched institutions and routes
      })
      .catch((error) => {
        console.error("Error fetching institutions and routes:", error);
      });
  }, []);

  const handleTypeChange = (newType) => {
    setUserType(newType);
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: newType,
    }));
    setSelectedInstitution("");
    setDistricts([]);
    setCities([]);
    setStoppings([]);
    setRoutes([]);
    console.log("Selected Type:", newType); // Log selected type
  };

  const handleInstitutionChange = (e) => {
    const selectedInstitutionId = e.target.value;
    setSelectedInstitution(selectedInstitutionId);

    console.log("Selected Institution ID:", selectedInstitutionId); // Log selected institution ID

    const institution = institutions.find(
      (inst) => inst.institutionId === selectedInstitutionId
    );

    if (institution) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        studentDetails:
          userType === "student"
            ? {
                ...prevFormData.studentDetails,
                instituteName: institution.institutionName,
              }
            : prevFormData.studentDetails,
        staffDetails:
          userType === "staff"
            ? {
                ...prevFormData.staffDetails,
                instituteName: institution.institutionName,
              }
            : prevFormData.staffDetails,
      }));
      setDistricts(institution.states.flatMap((state) => state.districts)); // Fetch districts
      setRoutes(institution.routes); // Set routes for the selected institution
      console.log(
        "Fetched Districts:",
        institution.states.flatMap((state) => state.districts)
      ); // Log fetched districts
      console.log("Fetched Routes:", institution.routes); // Log fetched routes
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationDetails: {
        ...prevFormData.locationDetails,
        district: selectedDistrict,
        city: "",
        stopName: "",
        route: "",
      },
    }));

    console.log("Selected District:", selectedDistrict); // Log selected district

    if (selectedInstitution) {
      const institution = institutions.find(
        (inst) => inst.institutionId === selectedInstitution
      );

      const district = institution.states
        .flatMap((state) => state.districts)
        .find((dist) => dist.districtName === selectedDistrict);

      if (district) {
        setCities(district.cities);
        console.log("Fetched Cities:", district.cities); // Log fetched cities
      }
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationDetails: {
        ...prevFormData.locationDetails,
        city: selectedCity,
        stopName: "",
        route: "",
      },
    }));

    console.log("Selected City:", selectedCity);
    const city = cities.find((c) => c.cityName === selectedCity);

    if (city) {
      setStoppings(city.stoppings);
      setRoutes(city.routes);
      console.log("Fetched Stoppings:", city.stoppings); // Log fetched stoppings
      console.log("Fetched Routes:", city.routes); // Log fetched routes
    }
  };

  const validate = () => {
    const validationErrors = {};
    if (currentPage === 1) {
      if (!formData.basicDetails.name?.trim())
        validationErrors.name = "Name is required";
      if (!formData.basicDetails.gender)
        validationErrors.gender = "Gender is required";
      if (!formData.basicDetails.dob)
        validationErrors.dob = "Date of Birth is required";
      if (!formData.basicDetails.email?.trim())
        validationErrors.email = "Email is required";
      if (!formData.basicDetails.mobile?.trim())
        validationErrors.mobile = "Phone Number is required";
      if (!formData.basicDetails.address?.trim())
        validationErrors.address = "Address is required";
      if (!formData.basicDetails.emergencyContact.name?.trim())
        validationErrors.emergencyContactName =
          "Emergency contact name is required";
      if (!formData.basicDetails.emergencyContact.relationship?.trim())
        validationErrors.emergencyContactRelationship =
          "Emergency contact relationship is required";
      if (!formData.basicDetails.emergencyContact.phone?.trim())
        validationErrors.emergencyContactPhone =
          "Emergency contact phone is required";
    } else if (currentPage === 2) {
      if (!userType)
        validationErrors.userType = "Please select a user userType";
      if (userType === "student") {
        if (!formData.studentDetails.rollNo?.trim())
          validationErrors.rollNo = "Roll No is required";
        if (!formData.studentDetails.regNo?.trim())
          validationErrors.regNo = "Register No is required";
        if (!formData.studentDetails.instituteName)
          validationErrors.instituteName = "Institute Name is required";
        if (!formData.studentDetails.department?.trim())
          validationErrors.department = "Department is required";
        if (!formData.studentDetails.year?.trim())
          validationErrors.year = "Year is required";
        if (!formData.studentDetails.section?.trim())
          validationErrors.section = "Section is required";
      } else if (userType === "staff") {
        if (!formData.staffDetails.staffId?.trim())
          validationErrors.staffId = "Staff ID is required";
        if (!formData.staffDetails.instituteName?.trim())
          validationErrors.instituteName = "Institute Name is required";
        if (!formData.staffDetails.department?.trim())
          validationErrors.department = "Department is required";
        if (!formData.staffDetails.designation?.trim())
          validationErrors.designation = "Designation is required";
      }
    } else if (currentPage === 3) {
      if (!formData.locationDetails.state?.trim())
        validationErrors.state = "State is required";
      if (!formData.locationDetails.district?.trim())
        validationErrors.district = "District is required";
      if (!formData.locationDetails.city?.trim())
        validationErrors.city = "City is required";
      if (!formData.locationDetails.stopName)
        validationErrors.stopName = "Stop Name is required";
      if (!formData.locationDetails.route)
        validationErrors.route = "Route is required";
    }
    return validationErrors;
  };

  const nextPage = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setCurrentPage((prev) => Math.min(prev + 1, 3)); // Increment page number
    } else {
      setErrors(validationErrors);
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Decrement page number
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
  
    setFormData((prevFormData) => {
      if (id in prevFormData.basicDetails) {
        return {
          ...prevFormData,
          basicDetails: { ...prevFormData.basicDetails, [id]: value },
        };
      } else if (id in prevFormData.basicDetails.emergencyContact) {
        return {
          ...prevFormData,
          basicDetails: {
            ...prevFormData.basicDetails,
            emergencyContact: {
              ...prevFormData.basicDetails.emergencyContact,
              [id]: value,
            },
          },
        };
      } else if (userType === "student" && id in prevFormData.studentDetails) {
        return {
          ...prevFormData,
          studentDetails: {
            ...prevFormData.studentDetails,
            [id]: value,
          },
        };
      } else if (userType === "staff" && id in prevFormData.staffDetails) {
        return {
          ...prevFormData,
          staffDetails: {
            ...prevFormData.staffDetails,
            [id]: value,
          },
        };
      } else if (id in prevFormData.locationDetails) {
        return {
          ...prevFormData,
          locationDetails: {
            ...prevFormData.locationDetails,
            [id]: value,
          },
        };
      }
      return prevFormData;
    });
  
    // Log the changes
    if (id === "district") {
      console.log("Selected District:", value);
    } else if (id === "department") {
      console.log("Selected Department:", value);
    }
  };
  

  const register = () => {
    console.log("pressed");
    console.log(formData);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3000/api/auth/register", formData)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(
            "Registration error:",
            error.response?.data?.message || error.message
          );
          alert(error.response?.data?.message || "An error occurred");
        });
    } else {
      setErrors(validationErrors);
    }
  };

  // Ensure formData contains all required fields
  useEffect(() => {
    console.log("Form Data:", formData); // Log formData to verify fields
  }, [formData]);

  return (
    <div className="new-user-container">
      <div className="new-user-page-container">
        {currentPage === 1 && (
          <>
            <h1>
              Provide <span className="highlight">Basic Details</span>
            </h1>
            <form className="new-user-form-container">
              <div className="new-user-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  placeholder="Enter your name"
                  value={formData.basicDetails.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  className="input-field"
                  value={formData.basicDetails.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="error-message">{errors.gender}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  className="input-field"
                  value={formData.basicDetails.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p className="error-message">{errors.dob}</p>}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="Enter your email"
                  value={formData.basicDetails.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="mobile">Phone No</label>
                <input
                  type="text"
                  id="mobile"
                  className="input-field"
                  placeholder="Enter your phone number"
                  value={formData.basicDetails.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <p className="error-message">{errors.mobile}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  className="input-field"
                  rows="3"
                  placeholder="Enter your address"
                  value={formData.basicDetails.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="error-message">{errors.address}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="name">Emergency Contact Name</label>
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  placeholder="Enter emergency contact name"
                  value={formData.basicDetails.emergencyContact.name}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        emergencyContact: {
                          ...prevState.basicDetails.emergencyContact,
                          name: e.target.value,
                        },
                      },
                    }))
                  }
                />
                {errors.emergencyContactName && (
                  <p className="error-message">{errors.emergencyContactName}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="relationship">
                  Emergency Contact Relationship
                </label>
                <input
                  type="text"
                  id="relationship"
                  className="input-field"
                  placeholder="Enter emergency contact relationship"
                  value={formData.basicDetails.emergencyContact.relationship}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        emergencyContact: {
                          ...prevState.basicDetails.emergencyContact,
                          relationship: e.target.value,
                        },
                      },
                    }))
                  }
                />
                {errors.emergencyContactRelationship && (
                  <p className="error-message">
                    {errors.emergencyContactRelationship}
                  </p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="phone">Emergency Contact Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="input-field"
                  placeholder="Enter emergency contact phone"
                  value={formData.basicDetails.emergencyContact.phone}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        emergencyContact: {
                          ...prevState.basicDetails.emergencyContact,
                          phone: e.target.value,
                        },
                      },
                    }))
                  }
                />
                {errors.emergencyContactPhone && (
                  <p className="error-message">
                    {errors.emergencyContactPhone}
                  </p>
                )}
              </div>
            </form>
          </>
        )}
        {currentPage === 2 && (
          <>
            <h1>
              Provide{" "}
              <span className="highlight">
                Educational/Professional Details
              </span>
            </h1>
            <form className="new-user-form-container">
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={userType === "student"}
                    onChange={() => handleTypeChange("student")}
                  />
                  Student
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={userType === "staff"}
                    onChange={() => handleTypeChange("staff")}
                  />
                  Staff
                </label>
                {errors.userType && (
                  <p className="error-message">{errors.userType}</p>
                )}
              </div>
              {userType && (
                <>
                  <div className="new-user-form-group">
                    <label htmlFor="instituteName">Institute Name</label>
                    <select
                      id="instituteName"
                      className="input-field"
                      value={selectedInstitution}
                      onChange={handleInstitutionChange}
                    >
                      <option value="">Select Institute</option>
                      {institutions.map((inst) => (
                        <option
                          key={inst.institutionId}
                          value={inst.institutionId}
                        >
                          {inst.institutionName}
                        </option>
                      ))}
                    </select>
                    {errors.instituteName && (
                      <p className="error-message">{errors.instituteName}</p>
                    )}
                  </div>
                  {selectedInstitution && (
                    <>
                      {userType === "student" && (
                        <>
                          <div className="new-user-form-group">
                            <label htmlFor="rollNo">Roll No</label>
                            <input
                              type="text"
                              id="rollNo"
                              className="input-field"
                              placeholder="Enter your roll number"
                              value={formData.studentDetails.rollNo}
                              onChange={handleChange}
                            />
                            {errors.rollNo && (
                              <p className="error-message">{errors.rollNo}</p>
                            )}
                          </div>
                          <div className="new-user-form-group">
                            <label htmlFor="regNo">Register No</label>
                            <input
                              type="text"
                              id="regNo"
                              className="input-field"
                              placeholder="Enter your register number"
                              value={formData.studentDetails.regNo}
                              onChange={handleChange}
                            />
                            {errors.regNo && (
                              <p className="error-message">{errors.regNo}</p>
                            )}
                          </div>
                        </>
                      )}
                      <div className="new-user-form-group">
                        <label htmlFor="department">Department</label>
                        <select
                          id="department"
                          className="input-field"
                          value={
                            userType === "student"
                              ? formData.studentDetails.department
                              : formData.staffDetails.department
                          }
                          onChange={(e) => handleChange(e, "department")}
                        >
                          <option value="">Select Department</option>
                          {institutions
                            .find(
                              (inst) =>
                                inst.institutionId === selectedInstitution
                            )
                            ?.departments.map((dept) => (
                              <option
                                key={dept.departmentName}
                                value={dept.departmentName}
                              >
                                {dept.departmentName}
                              </option>
                            ))}
                        </select>
                        {errors.department && (
                          <p className="error-message">{errors.department}</p>
                        )}
                      </div>
                      {userType === "student" && (
                        <>
                          <div className="new-user-form-group">
                            <label htmlFor="year">Year</label>
                            <select
                              id="year"
                              className="input-field"
                              value={formData.studentDetails.year}
                              onChange={handleChange}
                            >
                              <option value="">Select Year</option>
                              {institutions
                                .find(
                                  (inst) =>
                                    inst.institutionId === selectedInstitution
                                )
                                ?.departments.find(
                                  (dept) =>
                                    dept.departmentName ===
                                    formData.studentDetails.department
                                )
                                ?.years.map((year) => (
                                  <option
                                    key={year.yearNumber}
                                    value={year.yearNumber}
                                  >
                                    {year.yearNumber}
                                  </option>
                                ))}
                            </select>
                            {errors.year && (
                              <p className="error-message">{errors.year}</p>
                            )}
                          </div>
                          <div className="new-user-form-group">
                            <label htmlFor="section">Section</label>
                            <select
                              id="section"
                              className="input-field"
                              value={formData.studentDetails.section}
                              onChange={handleChange}
                            >
                              <option value="">Select Section</option>
                              {institutions
                                .find(
                                  (inst) =>
                                    inst.institutionId === selectedInstitution
                                )
                                ?.departments.find(
                                  (dept) =>
                                    dept.departmentName ===
                                    formData.studentDetails.department
                                )
                                ?.years.find(
                                  (year) =>
                                    year.yearNumber ===
                                    parseInt(formData.studentDetails.year)
                                )
                                ?.sections.map((section) => (
                                  <option
                                    key={section.sectionName}
                                    value={section.sectionName}
                                  >
                                    {section.sectionName}
                                  </option>
                                ))}
                            </select>
                            {errors.section && (
                              <p className="error-message">{errors.section}</p>
                            )}
                          </div>
                        </>
                      )}
                      {userType === "staff" && (
                        <>
                          <div className="new-user-form-group">
                            <label htmlFor="staffId">Staff ID</label>
                            <input
                              type="text"
                              id="staffId"
                              className="input-field"
                              placeholder="Enter your staff ID"
                              value={formData.staffDetails.staffId}
                              onChange={handleChange}
                            />
                            {errors.staffId && (
                              <p className="error-message">{errors.staffId}</p>
                            )}
                          </div>

                          <div className="new-user-form-group">
                            <label htmlFor="designation">Designation</label>
                            <input
                              type="text"
                              id="designation"
                              className="input-field"
                              placeholder="Enter your designation"
                              value={formData.staffDetails.designation}
                              onChange={handleChange}
                            />
                            {errors.designation && (
                              <p className="error-message">
                                {errors.designation}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </form>
          </>
        )}
        {currentPage === 3 && (
          <>
            <h1>
              Provide <span className="highlight">Location Details</span>
            </h1>
            <form className="new-user-form-container">
              <div className="new-user-form-group">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  className="input-field"
                  value={formData.locationDetails.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {institutions
                    .find((inst) => inst.institutionId === selectedInstitution)
                    ?.states.map((state) => (
                      <option key={state.stateName} value={state.stateName}>
                        {state.stateName}
                      </option>
                    ))}
                </select>
                {errors.state && (
                  <p className="error-message">{errors.state}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="district">District</label>
                <select
                  id="district"
                  className="input-field"
                  value={formData.locationDetails.district}
                  onChange={handleDistrictChange}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option
                      key={district.districtName}
                      value={district.districtName}
                    >
                      {district.districtName}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="error-message">{errors.district}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  className="input-field"
                  value={formData.locationDetails.city}
                  onChange={handleCityChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.cityName} value={city.cityName}>
                      {city.cityName}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="error-message">{errors.city}</p>}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="stopName">Stop Name</label>
                <select
                  id="stopName"
                  className="input-field"
                  value={formData.locationDetails.stopName}
                  onChange={handleChange}
                >
                  <option value="">Select Stop</option>
                  {stoppings.map((stop) => (
                    <option key={stop.stopID} value={stop.stopID}>
                      {stop.stopName}
                    </option>
                  ))}
                </select>
                {errors.stopName && (
                  <p className="error-message">{errors.stopName}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label htmlFor="route">Route</label>
                <select
                  id="route"
                  className="input-field"
                  value={formData.locationDetails.route}
                  onChange={handleChange}
                >
                  <option value="">Select Route</option>
                  {routes.map((route) => (
                    <option key={route.routeNumber} value={route.routeNumber}>
                      {`${route.routeNumber} - ${route.routeName} - Capacity ${
                        route.sittingCapacity + route.standingCapacity
                      }`}
                    </option>
                  ))}
                </select>
                {errors.route && (
                  <p className="error-message">{errors.route}</p>
                )}
              </div>
              <div className="new-user-form-group">
                <label className="checkbox-container">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-text">
                    I am accepting that all the information I provided will be
                    used solely for processing purposes. If any details are
                    found to be inaccurate, I know my account approval may be
                    declined.
                  </span>
                </label>
              </div>
            </form>
          </>
        )}
        <div className="navigation-controls">
          <button className="previous-button" onClick={prevPage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="dots-container">
            <span className={`dot ${currentPage === 1 ? "active" : ""}`}></span>
            <span className={`dot ${currentPage === 2 ? "active" : ""}`}></span>
            <span className={`dot ${currentPage === 3 ? "active" : ""}`}></span>
          </div>
          {currentPage === 3 ? (
            <button
              className="register-button"
              onClick={register}
              // disabled={Object.keys(errors).length > 0}
            >
              Register
            </button>
          ) : (
            <button className="next-button" onClick={nextPage}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewUserForm;
