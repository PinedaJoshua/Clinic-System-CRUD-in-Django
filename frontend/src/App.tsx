import React, { useEffect, useState } from "react";
import { Patient } from "./types";
import { getPatients, createPatients, updatePatients, deletePatients } from "./api";
import { Doctor } from "./types";
import { getDoctors, createDoctors, updateDoctors, deleteDoctors } from "./api";
import { Appointment } from "./types";
import { getAppointments, createAppointments, updateAppointments, deleteAppointments } from "./api"; 
import PatientList from "./component/PatientList";
import DoctorList from "./component/DoctorList";
import AppointmentList from "./component/AppointmentList";

const App: React.FC = () => {
  // Patient State
  const [patients, setPatients] = useState<Patient[]>([]);
  // (Removed patientName, phoneNumber, and email states since PatientList handles them now)

  // Doctor State
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorName, setDoctorName] = useState<string>("");
  const [doctorPhoneNumber, setDoctorPhoneNumber] = useState<string>("");
  const [doctorEmail, setDoctorEmail] = useState<string>("");

  // Appointment State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentPatient, setAppointmentPatient] = useState<string>("");
  const [appointmentDoctor, setAppointmentDoctor] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentStatus, setAppointmentStatus] = useState<string>("Pending");

  // Fetch Patients
  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  // Handle Patient Creation (Updated to accept data from PatientList)
  const handleCreatePatient = async (newPatient: { name: string; email: string; phone_number: string }) => {
    try {
      await createPatients(newPatient);
      fetchPatients();
    } catch (error) {
      console.error("Error creating patient", error);
    }
  };

  // Handle Doctor Creation
  const handleCreateDoctor = async () => {
    try {
      await createDoctors({ name: doctorName, phone_number: doctorPhoneNumber, email: doctorEmail });
      setDoctorName("");
      setDoctorPhoneNumber("");
      setDoctorEmail("");
      fetchDoctors();
    } catch (error) {
      console.error("Error creating doctor", error);
    }
  };

  // Handle Appointment Creation
  const handleCreateAppointment = async () => {
    try {
      await createAppointments({ 
        date_of_appointment: appointmentDate, 
        patient: appointmentPatient, 
        doctor: appointmentDoctor, 
        status: appointmentStatus 
      });
      setAppointmentPatient("");
      setAppointmentDoctor("");
      setAppointmentDate("");
      setAppointmentStatus("Pending");
      fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment", error);
    }
  };

  // Handle Patient Update
  const handleTogglePatient = async (patient: Patient) => {
    try {
      await updatePatients(patient.id, {
        name: patient.name,
        phone_number: patient.phone_number,
        email: patient.email,
      });
      fetchPatients();
    } catch (error) {
      console.error("Error updating patient", error);
    }
  };

  // Handle Doctor Update
  const handleToggleDoctor = async (doctor: Doctor) => {
    try {
      await updateDoctors(doctor.id, {
        name: doctor.name,
        phone_number: doctor.phone_number,
        email: doctor.email,
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error updating doctor", error);
    }
  };

  // Handle Appointment Update
  const handleToggleAppointment = async (appointment: Appointment) => {
    try {
      await updateAppointments(appointment.id, {
        date_of_appointment: appointment.date_of_appointment,
        patient: appointment.patient,
        doctor: appointment.doctor,
        status: appointment.status,
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment", error);
    }
  };

  // Handle Appointment Delete
  const handleDeleteAppointment = async (id: number) => {
    try {
      await deleteAppointments(id);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment", error);
    }
  };

  // Handle Patient Delete
  const handleDeletePatient = async (id: number) => {
    try {
      await deletePatients(id);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient", error);
    }
  };

  // Handle Doctor Delete
  const handleDeleteDoctor = async (id: number) => {
    try {
      await deleteDoctors(id);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/2 -right-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Clinic Management Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Manage patients, doctors, and appointments in one clean view.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 shadow-lg shadow-slate-950/60">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-200">Connected to API</span>
          </div>
        </header>

        {/* Main glass panel */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/50 backdrop-blur-xl p-4 sm:p-6 lg:p-8 space-y-10">
          {/* Patient section */}
          <section>
            <PatientList
              patients={patients}
              onToggle={handleTogglePatient}
              onDelete={handleDeletePatient}
              onAddPatient={handleCreatePatient}
            />
          </section>

          {/* Doctor + Appointment in two columns on large screens */}
          <section className="grid gap-8 lg:grid-cols-2">
            {/* Doctor CRUD + list */}
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor CRUD (TypeScript)</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                        Doctor Name
                      </label>
                      <input
                        type="text"
                        value={doctorName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDoctorName(e.target.value)}
                        placeholder="Enter Doctor Name..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={doctorPhoneNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDoctorPhoneNumber(e.target.value)}
                        placeholder="Enter Doctor Phone Number..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={doctorEmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDoctorEmail(e.target.value)}
                        placeholder="Enter Doctor Email..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={handleCreateDoctor}
                      className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add Doctor
                    </button>
                  </div>
                </div>
              </div>

              <DoctorList doctor={doctors} onToggle={handleToggleDoctor} onDelete={handleDeleteDoctor} />
            </div>

            {/* Appointment CRUD + list */}
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Appointment CRUD (TypeScript)</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                        Patient
                      </label>
                      <select
                        value={appointmentPatient}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAppointmentPatient(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                      >
                        <option value="">Select Patient</option>
                        {patients.map((patient) => (
                          <option key={patient.id} value={patient.id}>
                            {patient.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                        Doctor
                      </label>
                      <select
                        value={appointmentDoctor}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAppointmentDoctor(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppointmentDate(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                        Status
                      </label>
                      <select
                        value={appointmentStatus}
                        onChange={(e) => setAppointmentStatus(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 transition-all duration-200 ease-in-out focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none shadow-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={handleCreateAppointment}
                      className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add Appointment
                    </button>
                  </div>
                </div>
              </div>

              <AppointmentList
                appointments={appointments}
                onToggle={handleToggleAppointment}
                onDelete={handleDeleteAppointment}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;