import React, { useState, useEffect } from 'react';

interface TimeEntry {
  hours: string;
  isWeekend: boolean;
}

const TimeTable = () => {
  const weeks = ['S44', 'S45', 'S46', 'S47', 'S48'];
  const activities = [
    { category: 'ABSENCES', items: ['Congés', 'Maladie'] },
    { 
      category: 'ACTIVITES INTERNES', 
      items: ['Inter contrat', 'Réunion', 'Formation', 'Problèmes informatiques'] 
    }
  ];

  // Initialize time entries for each activity and day
  const [timeEntries, setTimeEntries] = useState<Record<string, TimeEntry[]>>({});
  const [totals, setTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize empty time entries
    const initialEntries: Record<string, TimeEntry[]> = {};
    activities.forEach(category => {
      category.items.forEach(item => {
        initialEntries[item] = Array(35).fill(null).map((_, index) => ({
          hours: '',
          isWeekend: (index % 7 === 5) || (index % 7 === 6) // Saturday or Sunday
        }));
      });
    });
    setTimeEntries(initialEntries);
  }, []);

  const handleTimeChange = (activity: string, dayIndex: number, value: string) => {
    if (timeEntries[activity][dayIndex].isWeekend) return;

    const newValue = value.replace(/[^\d.]/, '');
    if (newValue === '' || (parseFloat(newValue) >= 0 && parseFloat(newValue) <= 24)) {
      const newEntries = {
        ...timeEntries,
        [activity]: timeEntries[activity].map((entry, i) => 
          i === dayIndex ? { ...entry, hours: newValue } : entry
        )
      };
      setTimeEntries(newEntries);
      calculateTotals(newEntries);
    }
  };

  const calculateTotals = (entries: Record<string, TimeEntry[]>) => {
    const newTotals: Record<string, number> = {};
    
    // Calculate totals for each activity
    Object.entries(entries).forEach(([activity, timeArray]) => {
      newTotals[activity] = timeArray.reduce((sum, entry) => 
        sum + (entry.hours ? parseFloat(entry.hours) : 0), 0
      );
    });

    // Calculate total for each day
    for (let i = 0; i < 35; i++) {
      newTotals[`day_${i}`] = Object.values(entries).reduce((sum, timeArray) => 
        sum + (timeArray[i].hours ? parseFloat(timeArray[i].hours) : 0), 0
      );
    }

    // Calculate grand total
    newTotals.grandTotal = Object.values(entries).reduce((sum, timeArray) => 
      sum + timeArray.reduce((daySum, entry) => 
        daySum + (entry.hours ? parseFloat(entry.hours) : 0), 0
      ), 0
    );

    setTotals(newTotals);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full min-w-max">
        <thead>
          <tr className="bg-purple-700 text-white text-sm">
            <th className="py-3 px-4 text-left">ACTIVITES</th>
            {weeks.map(week => (
              <th key={week} className="px-2 text-center" colSpan={7}>
                {week}
              </th>
            ))}
            <th className="px-4">TOTAL</th>
          </tr>
          <tr className="bg-purple-600 text-white text-xs">
            <th className="py-2 px-4"></th>
            {weeks.map(week => (
              <React.Fragment key={`days-${week}`}>
                <th className="px-2">lun</th>
                <th className="px-2">mar</th>
                <th className="px-2">mer</th>
                <th className="px-2">jeu</th>
                <th className="px-2">ven</th>
                <th className="px-2 bg-gray-600">sam</th>
                <th className="px-2 bg-gray-600">dim</th>
              </React.Fragment>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {activities.map((category) => (
            <React.Fragment key={category.category}>
              <tr className="bg-purple-50">
                <td className="py-2 px-4 font-semibold">{category.category}</td>
                {Array(35).fill(null).map((_, i) => (
                  <td key={i} className="border px-2 text-center"></td>
                ))}
                <td className="border px-4"></td>
              </tr>
              {category.items.map((item) => (
                <tr key={`${category.category}-${item}`}>
                  <td className="py-2 px-4 pl-8">{item}</td>
                  {timeEntries[item]?.map((entry, dayIndex) => (
                    <td 
                      key={dayIndex} 
                      className={`border px-2 text-center ${entry.isWeekend ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      <input
                        type="text"
                        value={entry.hours}
                        onChange={(e) => handleTimeChange(item, dayIndex, e.target.value)}
                        className={`w-full text-center ${entry.isWeekend ? 'bg-gray-100' : 'bg-white'}`}
                        disabled={entry.isWeekend}
                      />
                    </td>
                  ))}
                  <td className="border px-4 font-semibold text-right">
                    {totals[item]?.toFixed(1) || '0.0'}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          <tr className="bg-purple-700 text-white font-semibold">
            <td className="py-2 px-4">TOTAL</td>
            {Array(35).fill(null).map((_, i) => (
              <td key={i} className="border px-2 text-center">
                {totals[`day_${i}`]?.toFixed(1) || '0.0'}
              </td>
            ))}
            <td className="border px-4 text-right">{totals.grandTotal?.toFixed(1) || '0.0'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimeTable;