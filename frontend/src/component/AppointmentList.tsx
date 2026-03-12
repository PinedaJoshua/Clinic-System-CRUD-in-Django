import React, { useState } from "react";
import { Appointment } from "../types";

interface Props {
  appointments: Appointment[];
  onToggle: (appointment: Appointment) => void;
  onDelete: (appointmentID: number) => void;
}

const AppointmentList: React.FC<Props> = ({ appointments, onToggle, onDelete }) => {
  const [editingAppointmentID, setEditingAppointmentID] = useState<number | null>(null);
  const [editAppointmentStatus, setEditAppointmentStatus] = useState<string>("Pending");
  const [editAppointmentPatient, setEditAppointmentPatient] = useState<number>(0);
  const [editAppointmentDoctor, setEditAppointmentDoctor] = useState<number>(0);
  const [editAppointmentDate, setEditAppointmentDate] = useState<string>("");

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointmentID(appointment.id);
    setEditAppointmentStatus(appointment.status);
    setEditAppointmentPatient(appointment.patient);
    setEditAppointmentDoctor(appointment.doctor);
    setEditAppointmentDate(appointment.date_of_appointment);
  };

  const handleSave = (appointment: Appointment) => {
    onToggle({
      ...appointment,
      status: editAppointmentStatus,  // Keep status as "Pending" or "Done"
      patient: editAppointmentPatient,
      doctor: editAppointmentDoctor,
      date_of_appointment: editAppointmentDate
    });
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setEditingAppointmentID(null);
    setEditAppointmentStatus("Pending");
    setEditAppointmentPatient(0);
    setEditAppointmentDoctor(0);
    setEditAppointmentDate("");
  };

  return (
    <ul className="space-y-4">
      {appointments.map((appointment) => (
        <li
          key={appointment.id}
          className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-lg transition-shadow rounded-2xl p-5 md:p-6 flex items-center justify-between"
        >
          {editingAppointmentID === appointment.id ? (
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                    Status
                  </label>
                  <select
                    value={editAppointmentStatus}
                    onChange={(e) => setEditAppointmentStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={editAppointmentDate}
                    onChange={(e) => setEditAppointmentDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                    Patient ID
                  </label>
                  <input
                    type="number"
                    value={editAppointmentPatient}
                    onChange={(e) => setEditAppointmentPatient(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                    placeholder="Enter patient ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                    Doctor ID
                  </label>
                  <input
                    type="number"
                    value={editAppointmentDoctor}
                    onChange={(e) => setEditAppointmentDoctor(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                    placeholder="Enter doctor ID"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-4 justify-end">
                <button
                  onClick={() => handleSave(appointment)}
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
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {appointment.status}
                </span>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-1 sm:gap-4">
                  <span>
                    <span className="font-medium text-gray-400">Patient ID:</span> {appointment.patient}
                  </span>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span>
                    <span className="font-medium text-gray-400">Doctor ID:</span> {appointment.doctor}
                  </span>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span>
                    <span className="font-medium text-gray-400">Date:</span> {appointment.date_of_appointment}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="bg-indigo-50 text-indigo-600 px-5 py-2.5 font-medium rounded-lg hover:bg-indigo-100 focus:outline-none transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(appointment.id)}
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

export default AppointmentList;