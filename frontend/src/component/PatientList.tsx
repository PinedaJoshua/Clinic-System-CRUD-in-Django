import React, { useState } from "react";
import { Patient } from "../types";

interface Props {
  patients: Patient[];
  onToggle: (patient: Patient) => void;
  onDelete: (patientID: number) => void;
  // Added this new prop to handle the Add Form submission
  onAddPatient: (patient: { name: string; email: string; phone_number: string }) => void; 
}

const PatientList: React.FC<Props> = ({ patients, onToggle, onDelete, onAddPatient }) => {
  // --- STATE FOR EDITING ---
  const [editingPatientID, setEditingPatientID] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState<string>("");
  const [EditPatientName, setEditPatientName] = useState<string>("");
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>("");

  // --- STATE FOR ADDING NEW PATIENT ---
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");

  // --- HANDLERS FOR EDITING ---
  const handleEdit = (patient: Patient) => {
    setEditingPatientID(patient.id);
    setEditPatientName(patient.name);
    setEditEmail(patient.email);
    setEditPhoneNumber(patient.phone_number);
  };

  const handleSave = (patient: Patient) => {
    onToggle({
      ...patient,
      name: EditPatientName,
      email: editEmail,
      phone_number: editPhoneNumber
    });
    setEditingPatientID(null);
    setEditPatientName("");
    setEditEmail("");
    setEditPhoneNumber("");
  };

  const handleCancel = () => {
    setEditingPatientID(null);
    setEditPatientName("");
    setEditEmail("");
    setEditPhoneNumber("");
  };

  // --- HANDLER FOR ADDING ---
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPhone) return;

    onAddPatient({
      name: newName,
      email: newEmail,
      phone_number: newPhone,
    });

    // Clear form after submitting
    setNewName("");
    setNewEmail("");
    setNewPhone("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* --- MODERN ADD PATIENT FORM --- */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient CRUD (TypeScript)</h2>
        
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                Patient Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter Patient Name..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter Patient Email..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Enter Patient Phone Num..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>

      {/* --- PATIENT LIST (EDIT/DELETE) --- */}
      <ul className="space-y-4">
        {patients.map((patient) => (
          <li
            key={patient.id}
            className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-lg transition-shadow rounded-2xl p-5 md:p-6 flex items-center justify-between"
          >
            {editingPatientID === patient.id ? (
              <div className="space-y-4 w-full">
                <input
                  type="text"
                  value={EditPatientName}
                  onChange={(e) => setEditPatientName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                  placeholder="Enter patient name"
                />
                <input
                  type="text"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                  placeholder="Enter email"
                />
                <input
                  type="text"
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                  placeholder="Enter phone number"
                />
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleSave(patient)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 w-full flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <span className="text-lg font-semibold text-gray-800 block">
                    {patient.name}
                  </span>
                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-1 sm:gap-4">
                    <span><span className="font-medium text-gray-400">Email:</span> {patient.email}</span>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span><span className="font-medium text-gray-400">Phone:</span> {patient.phone_number}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="bg-indigo-50 text-indigo-600 px-5 py-2.5 font-medium rounded-lg hover:bg-indigo-100 focus:outline-none transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(patient.id)}
                    className="bg-red-50 text-red-600 px-5 py-2.5 font-medium rounded-lg hover:bg-red-100 focus:outline-none transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
        
        {/* Empty state when no patients are in the list */}
        {patients.length === 0 && (
          <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            No patients added yet. Use the form above to add one!
          </div>
        )}
      </ul>
    </div>
  );
};

export default PatientList;