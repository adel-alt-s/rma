import React from 'react';
import { Cog } from 'lucide-react';

interface HeaderProps {
  employee: string;
  month: string;
  year: number;
}

const Header: React.FC<HeaderProps> = ({ employee, month, year }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img 
            src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=40&h=40&fit=crop" 
            alt="Logo"
            className="h-8"
          />
          <span className="text-purple-700 font-bold text-xl">DESCARTES</span>
          <span className="text-gray-500 text-sm">Ingénierie</span>
        </div>

        {/* Employee Info */}
        <div className="flex items-center space-x-4">
          <div className="bg-purple-700 text-white px-4 py-2 rounded-md">
            <span className="font-semibold">Collaborateur : </span>
            <span>{employee}</span>
          </div>
          <div className="flex space-x-2">
            <div className="bg-purple-700 text-white px-4 py-2 rounded-md">
              <span className="font-semibold">ANNÉE : </span>
              <span>{year}</span>
            </div>
            <div className="bg-purple-700 text-white px-4 py-2 rounded-md">
              <span className="font-semibold">MOIS : </span>
              <span>{month}</span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Cog className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;