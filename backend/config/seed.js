import bcrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js';

const defaultDoctors = [
  {
    name: 'Dr. Richard James',
    email: 'richard@appointy.com',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Emily Larson',
    email: 'emily@appointy.com',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Sarah Patel',
    email: 'sarah@appointy.com',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Christopher Lee',
    email: 'christopher@appointy.com',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Jennifer Garcia',
    email: 'jennifer@appointy.com',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Andrew Williams',
    email: 'andrew@appointy.com',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Williams has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Christopher Davis',
    email: 'davis@appointy.com',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Timothy White',
    email: 'timothy@appointy.com',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. White has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Ava Mitchell',
    email: 'ava@appointy.com',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Mitchell has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Jeffrey King',
    email: 'jeffrey@appointy.com',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. King has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Zoe Kelly',
    email: 'zoe@appointy.com',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Kelly has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Patrick Harris',
    email: 'patrick@appointy.com',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gastroenterologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Harris has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Chloe Evans',
    email: 'chloe@appointy.com',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Evans has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Ryan Martinez',
    email: 'ryan@appointy.com',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Martinez has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Amelia Hill',
    email: 'amelia@appointy.com',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Hill has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  }
];

export const seedDoctors = async () => {
  try {
    const count = await doctorModel.countDocuments();
    if (count === 0) {
      console.log('Seeding default doctors...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('doctorPassword123', salt);

      const doctorsToInsert = defaultDoctors.map((doc) => ({
        ...doc,
        password: hashedPassword,
        date: Date.now()
      }));

      await doctorModel.insertMany(doctorsToInsert);
      console.log('Seeding completed. 15 doctors added.');
    } else {
      console.log('Doctors collection not empty, skipping seed.');
    }
  } catch (error) {
    console.error('Seeding doctors failed:', error);
  }
};
