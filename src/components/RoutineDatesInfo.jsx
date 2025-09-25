import { Calendar } from "lucide-react";

const RoutineDatesInfo = ({ startDate, endDate }) => {
  // Helper function to format dates
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Fecha no disponible";
    }
  };

  // Helper function to calculate days remaining
  const getDaysRemaining = (endDateString) => {
    try {
      const end = new Date(endDateString);
      const today = new Date();
      const diffTime = end - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        return `${diffDays} día${diffDays !== 1 ? 's' : ''} restante${diffDays !== 1 ? 's' : ''}`;
      } else if (diffDays === 0) {
        return "Rutina vence hoy";
      } else {
        return "Rutina vencida";
      }
    } catch {
      return "Fecha no válida";
    }
  };

  // Don't render if no dates are provided
  if (!startDate && !endDate) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
      {/* Start Date */}
      {startDate && (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(startDate)}</span>
        </div>
      )}
      
      {/* Separator */}
      {(startDate && endDate) && (
        <span className="text-gray-300">•</span>
      )}
      
      {/* End Date */}
      {endDate && (
        <div className="flex items-center gap-1">
          <span>{formatDate(endDate)}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            (() => {
              try {
                const end = new Date(endDate);
                const today = new Date();
                const diffTime = end - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays > 7) return 'bg-green-100 text-green-700';
                if (diffDays > 0) return 'bg-yellow-100 text-yellow-700';
                if (diffDays === 0) return 'bg-orange-100 text-orange-700';
                return 'bg-red-100 text-red-700';
              } catch {
                return 'bg-gray-100 text-gray-700';
              }
            })()
          }`}>
            {getDaysRemaining(endDate)}
          </span>
        </div>
      )}
    </div>
  );
};

export default RoutineDatesInfo;
