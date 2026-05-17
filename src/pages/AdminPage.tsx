import { Vehicle } from '../types';
import React, { useState } from 'react';
import {
  getUsers,
  createUser,
  updatePasswordForEmail,
  AppUser
} from '../lib/users';

import { motion } from 'motion/react';

import {
  User,
  LayoutDashboard,
  AlertTriangle,
  ArrowUpRight
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
  onVehiclesChange
}: AdminPageProps) {

  const [currentPage, setCurrentPage] =
    useState('dashboard');

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

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
              {renderStat('LIFETIME VOLUME', '$4.8M', '+12.4%')}
              {renderStat('ACTIVE FLEET', '32 UNITS', '88%')}
              {renderStat('INQUIRY QUEUE', '18 LEADS', '5 NEW')}
              {renderStat('VIP RETENTION', '92%', 'TOP')}
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">

              <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center mx-auto mb-8">
                <LayoutDashboard
                  className="text-silver"
                  size={28}
                  strokeWidth={1}
                />
              </div>

              <h2 className="font-serif text-3xl italic text-white mb-4">
                Command Center Active
              </h2>

              <p className="text-silver text-[13px] tracking-widest uppercase">
                Real-time telemetry synchronized.
              </p>

            </div>
          </div>
        );

      case 'fleet':
        return (
          <div className="space-y-8">

            {/* Add Vehicle */}

            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">

              <h3 className="font-serif text-2xl italic mb-6">
                Add New Vehicle
              </h3>

              <AddVehicleForm
                onAdd={(v) =>
                  onVehiclesChange([...vehicles, v])
                }
              />
            </div>

            {/* Fleet List */}

            <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">

              <div className="p-8 border-b border-white/5">
                <h3 className="font-serif text-2xl italic">
                  Fleet Management
                </h3>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                {vehicles.length === 0 ? (
                  <p className="text-silver">
                    No vehicles added yet.
                  </p>
                ) : (
                  vehicles.map((v) => (

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

                        <div className="absolute bottom-3 left-4">

                          <span className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">
                            {v.category}
                          </span>

                        </div>
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
                              "text-[9px] px-3 py-1 rounded-full font-bold tracking-widest uppercase",
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
                              onVehiclesChange(
                                vehicles.filter(
                                  (x) => x.id !== v.id
                                )
                              )
                            }
                            className="text-[9px] tracking-[0.2em] font-bold text-red-400 uppercase"
                          >
                            REMOVE
                          </button>

                        </div>
                      </div>
                    </div>
                  ))
                )}
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
              onCreate={(u) => createUser(u)}
              onReset={(email, pass) =>
                updatePasswordForEmail(email, pass)
              }
            />

          </div>
        );
      }

      case 'damage':
        return (
          <div className="space-y-8">

            <div className="bg-[#111111] border border-white/5 rounded-3xl p-12 text-center">

              <AlertTriangle
                className="text-gold mx-auto mb-6"
                size={40}
                strokeWidth={1}
              />

              <h3 className="font-serif text-3xl italic text-white mb-4">
                Integrity Reports
              </h3>

              <p className="text-silver text-[13px] tracking-widest uppercase font-light max-w-sm mx-auto mb-12">
                Zero active incident reports.
              </p>

              <button className="bg-white/5 border border-white/10 text-white px-10 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                File Incident Report
              </button>

            </div>
          </div>
        );

      default:
        return (
          <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden">

            <div className="p-8 border-b border-white/5 flex justify-between items-center">

              <h3 className="font-serif text-2xl italic capitalize">
                {currentPage} Management
              </h3>

              <button className="text-silver hover:text-white">
                <ArrowUpRight size={20} />
              </button>

            </div>

            <div className="p-12 text-center">

              <p className="text-dim font-serif italic text-2xl mb-4">
                Module accessing secure archives...
              </p>

              <div className="w-12 h-[1px] bg-gold/30 mx-auto" />

            </div>
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
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar">

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

              <p className="text-silver text-[12px] tracking-widest uppercase font-light">
                Global Hub · Management Console
              </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white">

              <User size={22} strokeWidth={1} />

            </div>

          </header>

          {renderTabContent()}

        </motion.div>
      </div>
    </div>
  );
}

function UserList({ users }: { users: AppUser[] }) {

  return (
    <div className="space-y-4">

      {users.map((u) => (

        <div
          key={u.id}
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
        >

          <div>

            <p className="text-white font-medium">
              {u.name || u.username || u.email}
            </p>

            <p className="text-dim text-[11px]">
              {u.role.toUpperCase()}
            </p>

          </div>

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

  onReset: (
    email: string,
    pass: string
  ) => boolean;
}) {

  const [role, setRole] =
    useState<'staff' | 'customer'>('staff');

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [name, setName] =
    useState('');

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

      </div>
    </div>
  );
}