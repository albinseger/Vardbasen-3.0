'use client';

import React from 'react';

export type ApplicationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'reviewing' 
  | 'interview' 
  | 'offered' 
  | 'accepted' 
  | 'rejected';

interface ApplicationProgressBarProps {
  status: ApplicationStatus;
}

const getStatusInfo = (status: ApplicationStatus) => {
  const statuses = [
    { key: 'draft', label: 'Utkast', color: 'bg-gray-400' },
    { key: 'submitted', label: 'Inskickad', color: 'bg-blue-400' },
    { key: 'reviewing', label: 'Under granskning', color: 'bg-yellow-400' },
    { key: 'interview', label: 'Intervju', color: 'bg-indigo-400' },
    { key: 'offered', label: 'Erbjudande', color: 'bg-purple-400' },
    { key: 'accepted', label: 'Accepterad', color: 'bg-green-500' },
    { key: 'rejected', label: 'Avslag', color: 'bg-red-500' }
  ];

  const statusIndex = statuses.findIndex(s => s.key === status);
  return { statuses, currentIndex: statusIndex };
};

const ApplicationProgressBar: React.FC<ApplicationProgressBarProps> = ({ status }) => {
  const { statuses, currentIndex } = getStatusInfo(status);
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        {statuses.map((s, index) => (
          <div key={s.key} className="text-xs font-medium text-center">
            {s.label}
          </div>
        ))}
      </div>
      
      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          {statuses.map((s, index) => {
            // Calculate percentage width for each status segment
            const width = 100 / statuses.length;
            
            // Determine if this segment should be filled based on current status
            const isFilled = index <= currentIndex;
            
            return (
              <div
                key={s.key}
                style={{ width: `${width}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center ${
                  isFilled ? s.color : 'bg-gray-200'
                } transition-all duration-300`}
              />
            );
          })}
        </div>
        
        {/* Current status marker */}
        <div 
          className="absolute top-0 w-4 h-4 rounded-full bg-white border-2 -ml-2 transform -translate-y-1/4"
          style={{ 
            left: `${(currentIndex / (statuses.length - 1)) * 100}%`,
            borderColor: statuses[currentIndex]?.color || 'bg-gray-400'
          }}
        />
      </div>
    </div>
  );
};

export default ApplicationProgressBar; 