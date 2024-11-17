import React, { useState } from 'react';
import TimeTable from './components/TimeTable';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const [currentMonth] = useState('novembre');
  const [currentYear] = useState(2024);
  const [currentEmployee] = useState('Bouchra CHOUKRI');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <Header 
          employee={currentEmployee}
          month={currentMonth}
          year={currentYear}
        />
        <main className="p-6">
          <TimeTable />
        </main>
      </div>
    </div>
  );
}

export default App;