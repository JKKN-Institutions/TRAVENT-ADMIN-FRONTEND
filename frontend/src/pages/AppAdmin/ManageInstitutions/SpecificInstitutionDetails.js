import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Shared/Button/Button";
import "./SpecificInstitutionDetails.css";

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value || "N/A"}</span>
  </div>
);

const SectionHeader = ({ title, entityId, entityType, onEdit, onDelete }) => (
  <div className="section-header">
    <h3 className="section-title">{title}</h3>
    <div className="action-buttons">
      <Button label="Edit" onClick={() => onEdit(entityType, entityId)} />
      <Button label="Delete" onClick={() => onDelete(entityType, entityId)} />
    </div>
  </div>
);

const SpecificInstitutionDetails = ({ institution, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleEdit = (type, id) => {
    console.log(`Editing ${type} with ID: ${id}`);
  };

  const handleDelete = (type, id) => {
    console.log(`Deleting ${type} with ID: ${id}`);
  };

  if (!institution) return null;

  const {
    institutionName,
    state,
    founderName,
    founderEmail,
    founderContactNumber,
    address,
    contact1,
    contact2,
    emailDomain,
    institutes = [],
    adminDetails,
    subscription,
  } = institution;

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${isClosing ? "closing" : ""}`}>
        <header className="modal-header">
          <h2>{institutionName}</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className="close-button"
            onClick={handleClose}
          />
        </header>

        <div className="modal-content">
          {/* Institution Information */}
          <section className="institution-section">
            <SectionHeader
              title="Institution Information"
              entityId={institution.id}
              entityType="institution"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <div className="details-grid">
              <DetailItem label="Institution Name" value={institutionName} />
              <DetailItem label="State" value={state} />
              <DetailItem label="Founder Name" value={founderName} />
              <DetailItem label="Founder Email" value={founderEmail} />
              <DetailItem
                label="Founder Contact"
                value={founderContactNumber}
              />
              <DetailItem label="Address" value={address} />
              <DetailItem label="Contact 1" value={contact1} />
              <DetailItem label="Contact 2" value={contact2} />
              <DetailItem label="Email Domain" value={emailDomain} />
            </div>
          </section>

          {/* Institutes Information */}
          {institutes.map((institute, index) => (
            <section key={index} className="institute-section">
              <SectionHeader
                title={`Institute: ${institute.instituteName}`}
                entityId={institute.id}
                entityType="institute"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <div className="details-grid">
                <DetailItem
                  label="Institute Code"
                  value={institute.instituteCode}
                />
                <DetailItem label="State" value={institute.state} />
                <DetailItem label="Address" value={institute.address} />
                <DetailItem
                  label="Principal Name"
                  value={institute.principalName}
                />
                <DetailItem
                  label="Principal Email"
                  value={institute.principalEmail}
                />
                <DetailItem
                  label="Principal Contact"
                  value={institute.principalContactNumber}
                />
              </div>

              {/* Departments Information */}
              {institute.departments?.map((department, deptIndex) => (
                <section key={deptIndex} className="department-section">
                  <SectionHeader
                    title={`Department: ${department.departmentName}`}
                    entityId={department.id}
                    entityType="department"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  <div className="details-grid">
                    <DetailItem
                      label="Department Code"
                      value={department.departmentCode || "N/A"}
                    />
                    <DetailItem
                      label="Department Name"
                      value={department.departmentName}
                    />
                    <DetailItem
                      label="HOD Name"
                      value={department.hodName || "N/A"}
                    />
                    <DetailItem
                      label="HOD Email"
                      value={department.hodEmail || "N/A"}
                    />
                    <DetailItem
                      label="HOD Contact"
                      value={department.hodContactNumber || "N/A"}
                    />
                  </div>

                  {/* Years and Sections Information */}
                  {department.years?.map((year, yearIndex) => (
                    <section key={yearIndex} className="year-section">
                      <SectionHeader
                        title={`Year: ${year.year}`}
                        entityId={year.id}
                        entityType="year"
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                      <div className="sections-list">
                        <span className="sections-label">Sections:</span>
                        <span className="sections-value">
                          {year.sections?.join(", ") || "N/A"}
                        </span>
                      </div>
                    </section>
                  ))}
                </section>
              ))}
            </section>
          ))}

          {/* Admin Details */}
          <section className="admin-section">
            <SectionHeader
              title="Admin Details"
              entityId={adminDetails?.id}
              entityType="admin"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <div className="details-grid">
              <DetailItem label="Admin Name" value={adminDetails?.adminName} />
              <DetailItem label="Admin Email" value={adminDetails?.email} />
              <DetailItem
                label="Admin Contact"
                value={adminDetails?.contactNumber}
              />
            </div>
          </section>
          <section className="subscription-section">
            <SectionHeader
              title="Subscription Details"
              entityId={subscription?.id}
              entityType="subscription"
            />
            <div className="details-grid">
              {/* Plan Details */}
              <DetailItem
                label="Subscription Plan Name"
                value={subscription?.plan?.plan_name || "N/A"}
              />
              <DetailItem
                label="Validity"
                value={subscription?.plan?.validity || "N/A"}
              />
              <DetailItem
                label="Category"
                value={subscription?.plan?.category || "N/A"}
              />
              <DetailItem
                label="User Range"
                value={subscription?.plan?.user_range || "N/A"}
              />
              <DetailItem
                label="Price"
                value={subscription?.plan?.price || "N/A"}
              />

              {/* Subscription Dates and Status */}
              <DetailItem
                label="Subscription Start Date"
                value={
                  subscription?.details?.startDate
                    ? new Date(
                        subscription.details.startDate
                      ).toLocaleDateString()
                    : "N/A"
                }
              />
              <DetailItem
                label="Subscription End Date"
                value={
                  subscription?.details?.endDate
                    ? new Date(
                        subscription.details.endDate
                      ).toLocaleDateString()
                    : "N/A"
                }
              />
              <DetailItem
                label="Subscription Status"
                value={subscription?.details?.status || "N/A"}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SpecificInstitutionDetails;
