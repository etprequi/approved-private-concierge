import { Vehicle } from '../types';
import React, { useState } from 'react';
import {
  getUsers,
  createUser,
  updatePasswordForEmail,
  AppUser
} from '../lib/users';

import { motion } from 'motion/react';
import { User, LayoutDashboard, AlertTriangle } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

interface AdminPageProps {
  onExit: () => void;
  vehicles: Vehicle[];
  onVehiclesChange: (v: Vehicle[]) => void;
}

export default function AdminPage({
  onExit,
  vehicles,
  onVehiclesChange
}: AdminPageProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  React.useEffect(() => {
    if (currentPage === 'public') onExit();
  }, [currentPage, onExit]);

  const renderTabContent = () => {
    switch (currentPage) {

      case 'dashboard':
        return (
          <div className="text-white">
            <LayoutDashboard className="mb-4" />
            Dashboard
          </div>
        );

      case 'fleet':
        return (
          <div className="space-y-6">

            <AddVehicleForm
              onAdd={(v) => onVehiclesChange([...vehicles, v])}
            />

            <div className="space-y-4">
              {vehicles.length === 0 ? (
                <p className="text-silver">No vehicles yet</p>
              ) : (
                vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 bg-white/5 text-white flex justify-between"
                  >
                    <div>
                      {v.make} {v.model}
                    </div>

                    <button
                      onClick={() =>
                        onVehiclesChange(
                          vehicles.filter((x) => x.id !== v.id)
                        )
                      }
                      className="text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'users': {
        const users = getUsers();

        return (
          <div className="space-y-6">

            <UserList users={users} />

            <UserCreateForm
              onCreate={(u) => createUser(u)}
              onReset={(email: string, pass: string) =>
                updatePasswordForEmail(email, pass)
              }
            />

          </div>
        );
      }

      case 'damage':
        return (
          <div className="text-white">
            <AlertTriangle />
            No incidents
          </div>
        );

      default:
        return <div className="text-white">Select a page</div>;
    }
  };

  return (
    <div className="flex h-screen bg-black">

      <AdminSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 p-8 overflow-y-auto">

        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <header className="flex justify-between mb-6 text-white">
            <h1 className="text-2xl capitalize">{currentPage}</h1>
            <User />
          </header>

          {renderTabContent()}

        </motion.div>

      </div>
    </div>
  );
}

/* ---------------- VEHICLE FORM ---------------- */

function AddVehicleForm({
  onAdd
}: {
  onAdd: (v: Vehicle) => void;
}) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [photo, setPhoto] = useState('');

  const submit = () => {
    if (!make || !model) return;

    onAdd({
      id: Date.now().toString(),
      make,
      model,
      year: 2024,
      seats: 4,
      dailyRate: 0,
      photo,
      category: 'CARS',
      color: '',
      colorHex: '#000',
      deposit: 0,
      status: 'available',
      description: '',
      features: []
    });

    setMake('');
    setModel('');
    setPhoto('');
  };

  return (
    <div className="space-y-3 text-white">
      <input
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        className="p-2 bg-white/5 w-full"
      />

      <input
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="p-2 bg-white/5 w-full"
      />

      <input
        placeholder="Photo URL"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        className="p-2 bg-white/5 w-full"
      />

      <button
        onClick={submit}
        className="bg-gold text-black px-4 py-2"
      >
        Add Vehicle
      </button>
    </div>
  );
}

/* ---------------- USERS ---------------- */

function UserList({ users }: { users: AppUser[] }) {
  return (
    <div className="space-y-2 text-white">
      {users.map((u) => (
        <div key={u.id} className="p-2 bg-white/5">
          {u.email}
        </div>
      ))}
    </div>
  );
}

function UserCreateForm({
  onCreate,
  onReset
}: {
  onCreate: (u: {
    username?: string;
    email?: string;
    password: string;
    role: 'staff' | 'customer';
    name?: string;
  }) => void;

  onReset: (email: string, pass: string) => boolean;
}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="space-y-3 text-white">

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 bg-white/5 w-full"
      />

      <input
        placeholder="new password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="p-2 bg-white/5 w-full"
      />

      <button
        onClick={() => {
          onReset(email, pass);
          setEmail('');
          setPass('');
        }}
        className="bg-white text-black px-4 py-2"
      >
        Reset
      </button>

    </div>
  );
}