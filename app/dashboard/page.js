'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaArrowLeft, FaCheckCircle, FaTimesCircle, FaServer, FaChartLine, 
  FaShieldAlt, FaAd, FaDocker, FaCloud, FaFilm, FaGlobe, FaRobot, FaChartBar
} from 'react-icons/fa';

const services = [
  { name: 'LEMP Stack', description: 'Nginx, MariaDB, PHP-FPM', icon: FaServer, port: 80, url: 'http://192.168.1.100:80' },
  { name: 'Netdata', description: 'Monitoreo en tiempo real', icon: FaChartLine, port: 19999, url: 'http://192.168.1.100:19999' },
  { name: 'Prometheus', description: 'Sistema de monitoreo', icon: FaChartBar, port: 9090, url: 'http://192.168.1.100:9090' },
  { name: 'WG-Easy', description: 'WireGuard VPN', icon: FaShieldAlt, port: 51821, url: 'http://192.168.1.100:51821' },
  { name: 'Pi-hole', description: 'Bloqueo de anuncios', icon: FaAd, port: 5353, url: 'http://192.168.1.100:5353/admin' },
  { name: 'Portainer', description: 'Gestión de Docker', icon: FaDocker, port: 9443, url: 'https://192.168.1.100:9443' },
  { name: 'Nextcloud', description: 'Almacenamiento en la nube', icon: FaCloud, port: 8080, url: 'http://192.168.1.100:8080' },
  { name: 'Jellyfin', description: 'Servidor de medios', icon: FaFilm, port: 8096, url: 'http://192.168.1.100:8096' },
  { name: 'DuckDNS', description: 'Servicio DNS dinámico', icon: FaGlobe, port: 0, url: '#' },
  { name: 'Docker Controller Bot', description: 'Bot de control de Docker', icon: FaRobot, port: 0, url: '#' }
];

const guestServices = ['Jellyfin'];

export default function Dashboard() {
  const [statuses, setStatuses] = useState({});
  const router = useRouter();
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
  const filteredServices = userRole === 'admin' ? services : services.filter(s => guestServices.includes(s.name));

  useEffect(() => {
    if (!userRole) router.push('/');
  }, [userRole, router]);

  const checkStatus = async (service) => {
    if (service.url === '#') return 'no-verificable';
    try {
      await fetch(service.url, { mode: 'no-cors' });
      return 'active';
    } catch {
      return 'inactive';
    }
  };

  const updateStatuses = async () => {
    const newStatuses = {};
    await Promise.all(
      services.map(async (service) => {
        newStatuses[service.name] = await checkStatus(service);
      })
    );
    setStatuses(newStatuses);
  };

  useEffect(() => {
    updateStatuses();
    const interval = setInterval(updateStatuses, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#3498db] to-[#2c3e50] p-8">
      <div className="fondologin max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Dashboard QiangServer</h1>
        
        <button 
          onClick={() => router.push('/')} 
          className="mb-8 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
        >
          <FaArrowLeft className="mr-2" /> Volver al inicio
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
         <a
         key={service.name}
         href={service.url !== '#' ? service.url : undefined}
         target="_blank"
         rel="noopener noreferrer"
         className={`bg-white/40 p-6 rounded-xl shadow-lg border border-white/50 backdrop-blur-lg hover:shadow-2xl 
           hover:bg-white/50 transform transition-all duration-300 hover:scale-105 hover:brightness-110
           ${service.url === '#' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
       >
         <div className="flex items-start mb-4">
           <div className="p-3 bg-white/50 rounded-lg">
             <service.icon className="text-3xl text-white drop-shadow-lg" />
           </div>
           <div className="ml-4 flex-1">
             <h2 className="text-xl font-bold text-gray-800 drop-shadow-lg">{service.name}</h2>
             <p className="text-gray-700 text-sm mt-1 drop-shadow-md">{service.description}</p>
             <div className="mt-3 flex items-center space-x-2">
               {statuses[service.name] === 'active' ? (
                 <FaCheckCircle className="text-green-400 drop-shadow-md animate-pulse" />
               ) : statuses[service.name] === 'inactive' ? (
                 <FaTimesCircle className="text-red-400 drop-shadow-md animate-pulse" />
               ) : (
                 <span className="text-gray-400 drop-shadow-md">—</span>
               )}
               <span className={`text-sm font-medium ${
                 statuses[service.name] === 'active' ? 'text-green-300' :
                 statuses[service.name] === 'inactive' ? 'text-red-300' : 'text-gray-300'
               } drop-shadow-lg`}>
                 {statuses[service.name] === 'active' ? 'Activo' : statuses[service.name] === 'inactive' ? 'Inactivo' : 'No verificable'}
               </span>
             </div>
           </div>
         </div>
       </a>
       

          ))}
        </div>
      </div>
    </div>
  );
}
