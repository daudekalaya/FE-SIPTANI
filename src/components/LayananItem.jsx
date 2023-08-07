const LayananItem = ({ icon, title, description }) => (
  <div className="p-4 lg:w-1/3 md:w-1/2">
    <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
      <div className="flex-grow">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">{icon}</div>
          <div className="ml-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-base">{description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LayananItem