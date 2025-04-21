import React from 'react';

export type ApplicationStatus = 'submitted' | 'received' | 'reviewing' | 'interview' | 'offered' | 'rejected';

interface ApplicationStatusBarProps {
  status: ApplicationStatus;
  jobTitle: string;
}

const statusToStep = (status: ApplicationStatus): number => {
  const statusMap: Record<ApplicationStatus, number> = {
    submitted: 1,
    received: 2,
    reviewing: 3,
    interview: 4,
    offered: 5,
    rejected: 5 // Also at the end, but with a different appearance
  };
  
  return statusMap[status] || 1;
};

const statusToLabel = (status: ApplicationStatus): string => {
  const statusMap: Record<ApplicationStatus, string> = {
    submitted: 'Ansökan inskickad',
    received: 'Ansökan mottagen',
    reviewing: 'Under granskning',
    interview: 'Kallad till intervju',
    offered: 'Erbjudande',
    rejected: 'Avslag'
  };
  
  return statusMap[status] || 'Okänd status';
};

const ApplicationStatusBar: React.FC<ApplicationStatusBarProps> = ({ status, jobTitle }) => {
  const currentStep = statusToStep(status);
  const totalSteps = 5;
  const isRejected = status === 'rejected';
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <h3 className="text-md font-semibold text-gray-800">Ansökningsstatus</h3>
        <span className="text-sm text-gray-600">{statusToLabel(status)}</span>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Steg {currentStep} av {totalSteps}
            </span>
          </div>
        </div>
        
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
              isRejected ? 'bg-red-500' : 'bg-blue-500'
            }`}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>Inskickad</span>
          <span>Mottagen</span>
          <span>Granskning</span>
          <span>Intervju</span>
          <span>{isRejected ? 'Avslag' : 'Erbjudande'}</span>
        </div>
      </div>
      
      {isRejected && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
          <p className="text-sm text-red-800">
            Tyvärr har vi valt att gå vidare med andra kandidater för tjänsten "{jobTitle}".
            Vi uppskattar ditt intresse och uppmuntrar dig att söka framtida möjligheter hos oss.
          </p>
        </div>
      )}
      
      {status === 'offered' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md">
          <p className="text-sm text-green-800">
            Grattis! Du har fått ett jobberbjudande för tjänsten "{jobTitle}".
            Vänligen kolla din e-post för mer information om nästa steg.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusBar; 