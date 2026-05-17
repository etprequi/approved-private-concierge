import { Vehicle } from '../types';
import React, { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updatePasswordForEmail,
  AppUser,
} from '../lib/users';

import { motion } from 'motion/react';

import {
  User,
  LayoutDashboard,
  Users,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

import { cn } from '../lib/utils';
import AdminSidebar from '../components/AdminSidebar';

interface AdminPageProps {
  onExit: () => void;
  vehicles: Vehicle[];
  onVehiclesChange: (v: Vehicle[]) => void;
}

export default function AdminPage({
  onExit,
  vehicles,
}: AdminPageProps) {
  const [currentPage, setCurrentPage] =
    useState('dashboard');

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  // PERSISTENT VEHICLES
  const [fleetVehicles, setFleetVehicles] =
    useState<Vehicle[]>(() => {
      const saved =
        localStorage.getItem('fleetVehicles');

      if (saved) {
        return JSON.parse(saved);
      }

      return vehicles;
    });

  useEffect(() => {
    localStorage.setItem(
      'fleetVehicles',
      JSON.stringify(fleetVehicles)
    );
  }, [fleetVehicles]);

  React.useEffect(() => {
    if (currentPage === 'public') {
      onExit();
    }
  }, [currentPage, onExit]);

  if (currentPage === 'public') return null;

  const renderStat = (
    label: string,
    value: string,
    trend: string
  ) => (
    <div
      key={label}
      className="bg-[#111111] border border-white/5 p-8 rounded-3xl"
    >
      <span className="text-[10px] tracking-[0.3em] text-silver font-bold block mb-4 uppercase">
        {label}
      </span>

      <p className="font-serif text-4xl text-white mb-2">
        {value}
      </p>

      <span className="text-[10px] text-gold tracking-widest uppercase">
        {trend}
      </span>
    </div>
  );

  const renderTabContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {renderStat(
                'LIFETIME VOLUME',
                '$4.8M',
                '+12.4% GROWTH'
              )}

              {renderStat(
                'ACTIVE FLEET',
                `${fleetVehicles.length} UNITS`,
                '88% UTILIZATION'
              )}

              {renderStat(
                'INQUIRY QUEUE',
                '18 LEADS',
                '5 NEW TODAY'
              )}

              {renderStat(
                'VIP RETENTION',
                '92%',
                'TOP TIER'
              )}
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">
              <LayoutDashboard
                className="text-gold mx-auto mb-6"
                size={42}
                strokeWidth={1}
              />

              <h2 className="font-serif text-3xl italic text-white mb-4">
                Command Center Active
              </h2>

              <p className="text-silver text-[13px] tracking-widest uppercase">
                Real-time fleet management enabled.
              </p>
            </div>
          </div>
        );

      case 'fleet':
        return (
          <div className="space-y-8">
            {/* ADD VEHICLE */}
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
              <h3 className="font-serif text-2xl italic mb-6">
                Add New Vehicle
              </h3>

              <AddVehicleForm
                onAdd={(v) =>
                  setFleetVehicles([
                    ...fleetVehicles,
                    v,
                  ])
                }
              />
            </div>

            {/* VEHICLE LIST */}
            <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">
              <div className="p-8 border-b border-white/5">
                <h3 className="font-serif text-2xl italic">
                  Fleet Management
                </h3>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {fleetVehicles.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
                  >
                    <div className="relative h-40">
                      <img
                        src={v.photo}
                        alt={v.make}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    <div className="p-5 flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">
                          {v.make} {v.model}
                        </p>

                        <p className="text-dim text-[10px] tracking-widest uppercase mt-1">
                          {v.year} · {v.seats} seats
                        </p>

                        {v.dailyRate > 0 ? (
                          <p className="text-gold text-[11px] mt-1">
                            ${v.dailyRate}/day
                          </p>
                        ) : (
                          <p className="text-gold italic text-[13px] mt-1">
                            Inquire
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <span
                          className={cn(
                            'text-[9px] px-3 py-1 rounded-full font-bold tracking-widest uppercase',
                            v.status === 'available'
                              ? 'bg-green-400/10 text-green-400'
                              : v.status === 'booked'
                              ? 'bg-gold/10 text-gold'
                              : 'bg-red-400/10 text-red-400'
                          )}
                        >
                          {v.status}
                        </span>

                        <button
                          onClick={() =>
                            setFleetVehicles(
                              fleetVehicles.filter(
                                (x) =>
                                  x.id !== v.id
                              )
                            )
                          }
                          className="text-red-400 text-[10px] uppercase tracking-widest hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'users': {
        const users = getUsers();

        return (
          <div className="space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
              <h3 className="font-serif text-2xl italic mb-6">
                User Management
              </h3>

              <UserList users={users} />
            </div>

            <UserCreateForm
              onCreate={(u) => {
                createUser(u);
              }}
              onReset={(email, pass) =>
                updatePasswordForEmail(
                  email,
                  pass
                )
              }
            />
          </div>
        );
      }

      case 'payments':
        return (
          <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">
            <CreditCard
              className="text-gold mx-auto mb-6"
              size={40}
              strokeWidth={1}
            />

            <h3 className="font-serif text-3xl italic text-white mb-4">
              Payments & Revenue
            </h3>
          </div>
        );

      case 'customers':
        return (
          <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">
            <Users
              className="text-gold mx-auto mb-6"
              size={40}
              strokeWidth={1}
            />

            <h3 className="font-serif text-3xl italic text-white mb-4">
              Customer Relations
            </h3>
          </div>
        );

      case 'damage':
        return (
          <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">
            <AlertTriangle
              className="text-gold mx-auto mb-6"
              size={40}
              strokeWidth={1}
            />

            <h3 className="font-serif text-3xl italic text-white mb-4">
              Integrity Reports
            </h3>

            <p className="text-silver text-[13px] tracking-widest uppercase">
              Zero active incident reports.
            </p>
          </div>
        );

      default:
        return (
          <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">
            <p className="text-dim font-serif italic text-2xl">
              Module loading...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black-pure overflow-hidden">
      <AdminSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <div className="flex-1 overflow-y-auto p-4 md:p-12">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="font-serif text-4xl mb-2 text-white capitalize">
                {currentPage}
              </h1>

              <p className="text-silver text-[12px] tracking-widest uppercase">
                Global Hub · Management Console
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-right hidden md:block">
                <p className="text-white text-[12px] font-bold">
                  ALEXANDER VANCE
                </p>

                <p className="text-gold text-[10px] tracking-[0.3em] uppercase">
                  Super Admin
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                <User
                  size={22}
                  strokeWidth={1}
                />
              </div>
            </div>
          </header>

          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}

function UserList({
  users,
}: {
  users: AppUser[];
}) {
  return (
    <div className="space-y-4">
      {users.map((u) => (
        <div
          key={u.id}
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
        >
          <div>
            <p className="text-white font-medium">
              {u.name ||
                u.username ||
                u.email}
            </p>

            <p className="text-dim text-[11px]">
              {u.role.toUpperCase()} •{' '}
              {u.email || 'no-email'}
            </p>
          </div>

          <div className="text-[11px] text-silver">
            ID: {u.id.slice(0, 8)}
          </div>
        </div>
      ))}
    </div>
  );
}

function UserCreateForm({
  onCreate,
  onReset,
}: any) {
  const [role, setRole] =
    useState('staff');

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [name, setName] = useState('');

  return (
    <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
      <h4 className="text-[11px] tracking-[0.4em] text-silver font-bold uppercase mb-4">
        Create New User
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Full name"
          className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl"
        />

        <input
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          placeholder="Username"
          className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl"
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl"
        />

        <input
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl"
        />
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl"
        >
          <option value="staff">
            Staff
          </option>

          <option value="customer">
            Customer
          </option>
        </select>

        <button
          onClick={() => {
            onCreate({
              username,
              email,
              password,
              role,
              name,
            });

            setUsername('');
            setEmail('');
            setPassword('');
            setName('');
          }}
          className="bg-gold text-black px-6 py-2 rounded-full"
        >
          Create
        </button>
      </div>
    </div>
  );
}

function AddVehicleForm({
  onAdd,
}: {
  onAdd: (v: Vehicle) => void;
}) {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'CARS' as
      | 'CARS'
      | 'YACHT'
      | 'JET',
    color: '',
    colorHex: '#000000',
    dailyRate: 0,
    deposit: 0,
    seats: 2,
    status: 'available' as
      | 'available'
      | 'booked'
      | 'maintenance',
    photo: '',
    description: '',
    features: '',
  });

  const input =
    'w-full bg-white/[0.02] border border-white/5 rounded-2xl p-3 text-white';

  const handleAdd = () => {
    if (
      !form.make ||
      !form.model ||
      !form.photo
    ) {
      alert(
        'Please fill in make, model and photo.'
      );

      return;
    }

    const newVehicle: Vehicle = {
      id: `v-${Date.now()}`,
      make: form.make,
      model: form.model,
      year: form.year,
      category: form.category,
      color: form.color,
      colorHex: form.colorHex,
      dailyRate: form.dailyRate,
      deposit: form.deposit,
      seats: form.seats,
      status: form.status,
      photo: form.photo,
      description: form.description,
      features: form.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
    };

    onAdd(newVehicle);

    setForm({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'CARS',
      color: '',
      colorHex: '#000000',
      dailyRate: 0,
      deposit: 0,
      seats: 2,
      status: 'available',
      photo: '',
      description: '',
      features: '',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <input
        className={input}
        placeholder="Make"
        value={form.make}
        onChange={(e) =>
          setForm({
            ...form,
            make: e.target.value,
          })
        }
      />

      <input
        className={input}
        placeholder="Model"
        value={form.model}
        onChange={(e) =>
          setForm({
            ...form,
            model: e.target.value,
          })
        }
      />

      <input
        className={input}
        type="number"
        placeholder="Year"
        value={form.year}
        onChange={(e) =>
          setForm({
            ...form,
            year: +e.target.value,
          })
        }
      />

      <input
        className={input}
        placeholder="Photo URL"
        value={form.photo}
        onChange={(e) =>
          setForm({
            ...form,
            photo: e.target.value,
          })
        }
      />

      <input
        className={input}
        type="number"
        placeholder="Daily Rate"
        value={form.dailyRate}
        onChange={(e) =>
          setForm({
            ...form,
            dailyRate: +e.target.value,
          })
        }
      />

      <button
        onClick={handleAdd}
        className="bg-gold text-black py-3 rounded-2xl uppercase font-bold"
      >
        Add To Fleet
      </button>
    </div>
  );
}