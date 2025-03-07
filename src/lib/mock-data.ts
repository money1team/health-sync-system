
import { Patient, Doctor, Appointment, MedicalRecord } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Kamau',
    age: 45,
    gender: 'Male',
    email: 'john.kamau@example.com',
    phone: '(+254) 712-345-678',
    address: '123 Moi Avenue, Nairobi, 00100',
    insuranceNumber: 'INS12345678',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: '2023-06-15',
  },
  {
    id: '2',
    name: 'Wanjiku Njoroge',
    age: 32,
    gender: 'Female',
    email: 'wanjiku.njoroge@example.com',
    phone: '(+254) 723-987-654',
    address: '456 Kenyatta Avenue, Nairobi, 00200',
    insuranceNumber: 'INS87654321',
    bloodType: 'A+',
    allergies: ['Sulfa Drugs'],
    conditions: ['Asthma'],
    lastVisit: '2023-08-22',
  },
  {
    id: '3',
    name: 'Robert Ochieng',
    age: 68,
    gender: 'Male',
    email: 'robert.ochieng@example.com',
    phone: '(+254) 735-456-789',
    address: '789 Ngong Road, Nairobi, 00300',
    insuranceNumber: 'INS45678901',
    bloodType: 'B-',
    allergies: ['Latex', 'Aspirin'],
    conditions: ['Arthritis', 'Coronary Artery Disease'],
    lastVisit: '2023-07-08',
  },
  {
    id: '4',
    name: 'Akinyi Otieno',
    age: 29,
    gender: 'Female',
    email: 'akinyi.otieno@example.com',
    phone: '(+254) 748-234-567',
    address: '321 Uhuru Highway, Nairobi, 00400',
    insuranceNumber: 'INS23456789',
    bloodType: 'AB+',
    allergies: [],
    conditions: ['Migraine'],
    lastVisit: '2023-09-10',
  },
  {
    id: '5',
    name: 'David Mwangi',
    age: 52,
    gender: 'Male',
    email: 'david.mwangi@example.com',
    phone: '(+254) 756-876-543',
    address: '654 Waiyaki Way, Nairobi, 00500',
    insuranceNumber: 'INS76543210',
    bloodType: 'A-',
    allergies: ['Shellfish'],
    conditions: ['GERD', 'Sleep Apnea'],
    lastVisit: '2023-05-30',
  },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Kimani',
    specialty: 'Cardiology',
    email: 'sarah.kimani@example.com',
    phone: '(+254) 711-222-333',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
  },
  {
    id: '2',
    name: 'Dr. Michael Maina',
    specialty: 'Pediatrics',
    email: 'michael.maina@example.com',
    phone: '(+254) 722-333-444',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: '3',
    name: 'Dr. Esther Wangari',
    specialty: 'Neurology',
    email: 'esther.wangari@example.com',
    phone: '(+254) 733-555-666',
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
  },
  {
    id: '4',
    name: 'Dr. James Waweru',
    specialty: 'Orthopedics',
    email: 'james.waweru@example.com',
    phone: '(+254) 744-777-888',
    availableDays: ['Monday', 'Thursday', 'Friday'],
  },
  {
    id: '5',
    name: 'Dr. Lucy Karanja',
    specialty: 'Family Medicine',
    email: 'lucy.karanja@example.com',
    phone: '(+254) 755-999-000',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2023-10-15',
    time: '09:00 AM',
    status: 'Scheduled',
    reason: 'Annual checkup',
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '5',
    date: '2023-10-16',
    time: '10:30 AM',
    status: 'Scheduled',
    reason: 'Flu symptoms',
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    date: '2023-10-12',
    time: '02:00 PM',
    status: 'Completed',
    reason: 'Headache consultation',
    notes: 'Prescribed medication for migraines',
  },
  {
    id: '4',
    patientId: '4',
    doctorId: '2',
    date: '2023-10-18',
    time: '11:15 AM',
    status: 'Scheduled',
    reason: 'Follow-up appointment',
  },
  {
    id: '5',
    patientId: '5',
    doctorId: '4',
    date: '2023-10-10',
    time: '03:45 PM',
    status: 'Cancelled',
    reason: 'Joint pain evaluation',
  },
  {
    id: '6',
    patientId: '1',
    doctorId: '5',
    date: '2023-10-22',
    time: '01:30 PM',
    status: 'Scheduled',
    reason: 'Blood pressure check',
  },
];

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2023-06-15',
    diagnosis: 'Hypertension',
    treatment: 'Lifestyle modifications and medication',
    prescription: [
      {
        medication: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '90 days',
      },
    ],
    notes: 'Patient advised to reduce sodium intake and increase physical activity',
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '5',
    date: '2023-08-22',
    diagnosis: 'Acute bronchitis',
    treatment: 'Rest and medication',
    prescription: [
      {
        medication: 'Azithromycin',
        dosage: '500mg',
        frequency: 'Once daily',
        duration: '5 days',
      },
      {
        medication: 'Benzonatate',
        dosage: '200mg',
        frequency: 'Three times daily',
        duration: '7 days',
      },
    ],
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    date: '2023-07-08',
    diagnosis: 'Migraine',
    treatment: 'Medication and trigger avoidance',
    prescription: [
      {
        medication: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed for migraine',
        duration: '30 days',
      },
    ],
    notes: 'Patient to maintain headache diary to identify triggers',
  },
];

export const getPatientById = (id: string): Patient | undefined => {
  return MOCK_PATIENTS.find(patient => patient.id === id);
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return MOCK_DOCTORS.find(doctor => doctor.id === id);
};

export const getAppointmentsForPatient = (patientId: string): Appointment[] => {
  return MOCK_APPOINTMENTS.filter(appointment => appointment.patientId === patientId);
};

export const getMedicalRecordsForPatient = (patientId: string): MedicalRecord[] => {
  return MOCK_MEDICAL_RECORDS.filter(record => record.patientId === patientId);
};
