// pages/past-diagnosis.tsx
'use client';
import React from 'react';
import Past from '@/components/past-diagnosis'; // Adjust the path accordingly
import Sidebar from '@/components/sidebar';
const PastDiagnosisPage: React.FC = () => {
  return (
    <div className=''>
      <Past />
    </div>
  );
};

export default PastDiagnosisPage;
