const StatsCard = ({ title, value, icon, trend, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {icon && (
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
            <span className="text-3xl">{icon}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
