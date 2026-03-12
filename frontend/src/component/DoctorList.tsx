import React, { useState } from "react";
import { Doctor } from "../types";


interface Props {
  doctor: Doctor[];
  onToggle: (doctor: Doctor) => void;
  onDelete: (doctorID: number) => void;
}

const DoctorList: React.FC<Props> = ({ doctor, onToggle, onDelete }) => {
  const [editingDoctorID, setEditingDoctorID] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState<string>("");
  const [editDoctorName, setEditDoctorName] = useState<string>("");
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>("");

  const handleEdit = (doctorItem: Doctor) => {
    setEditingDoctorID(doctorItem.id);
    setEditDoctorName(doctorItem.name);
    setEditEmail(doctorItem.email);
    setEditPhoneNumber(doctorItem.phone_number);
  };

  const handleSave = (doctorItem: Doctor) => {
    onToggle({
      ...doctorItem,
      name: editDoctorName,
      email: editEmail,
      phone_number: editPhoneNumber,
    });
    setEditingDoctorID(null);
    setEditDoctorName("");
    setEditEmail("");
    setEditPhoneNumber("");
  };

  const handleCancel = () => {
    setEditingDoctorID(null);
    setEditDoctorName("");
    setEditEmail("");
    setEditPhoneNumber("");
  };

  return (
    <ul className="space-y-4">
      {doctor.map((doctorItem) => (
        <li
          key={doctorItem.id}
          className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-lg transition-shadow rounded-2xl p-5 md:p-6 flex items-center justify-between"
        >
          {editingDoctorID === doctorItem.id ? (
            <div className="space-y-4 w-full">
              <input
                type="text"
                value={editDoctorName}
                onChange={(e) => setEditDoctorName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                placeholder="Enter doctor name"
              />
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                placeholder="Enter email"
              />
              <input
                type="tel"
                value={editPhoneNumber}
                onChange={(e) => setEditPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                placeholder="Enter phone number"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleSave(doctorItem)}
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
                  {doctorItem.name}
                </span>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-1 sm:gap-4">
                  <span>
                    <span className="font-medium text-gray-400">Email:</span> {doctorItem.email}
                  </span>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span>
                    <span className="font-medium text-gray-400">Phone:</span> {doctorItem.phone_number}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEdit(doctorItem)}
                  className="bg-indigo-50 text-indigo-600 px-5 py-2.5 font-medium rounded-lg hover:bg-indigo-100 focus:outline-none transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(doctorItem.id)}
                  className="bg-red-50 text-red-600 px-5 py-2.5 font-medium rounded-lg hover:bg-red-100 focus:outline-none transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};


export default DoctorList;
