import React from 'react';
import { Home, Users, Calendar, PieChart, Settings, FileText } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Users, label: 'Collaborateurs' },
    { icon: Calendar, label: 'Planning' },
    { icon: FileText, label: 'RMA' },
    { icon: PieChart, label: 'Rapports' },
    { icon: Settings, label: 'Paramètres' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-purple-700 text-white">
      <div className="p-6">
        <nav className="space-y-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;