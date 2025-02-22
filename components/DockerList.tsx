export default function DockerList({ items }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{item}</h3>
            <div className="text-gray-500">Estado: <span className="text-green-500">Activo</span></div>
          </div>
        ))}
      </div>
    )
  }