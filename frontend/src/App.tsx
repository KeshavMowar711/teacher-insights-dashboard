import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Users, Presentation, FileText, Search, ChevronLeft, Bell, Lock } from 'lucide-react';

interface DashboardData {
  totals: { lessons: number; quizzes: number; assessments: number; };
  trends: any[];
  teachers: { teacher_id: string; teacher_name: string }[];
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [authError, setAuthError] = useState<boolean>(false);

  const [data, setData] = useState<DashboardData>({ totals: { lessons: 0, quizzes: 0, assessments: 0 }, trends: [], teachers: [] });
  const [selectedTeacher, setSelectedTeacher] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetch(`http://localhost:5000/api/dashboard?teacher_id=${selectedTeacher}`)
        .then(res => res.json())
        .then((fetchedData: DashboardData) => {
          setData(fetchedData);
          setLoading(false);
        });
    }
  }, [selectedTeacher, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPassword('');
    }
  };

  const activeTeacherName = data.teachers.find(t => t.teacher_id === selectedTeacher)?.teacher_name;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fff9f5] flex items-center justify-center p-4 font-sans text-gray-800">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-100 w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-bold text-orange-900 tracking-wider">LUMINA</h1>
            <p className="text-gray-500 mt-2">Sign in to the Director's Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Access PIN</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (admin123)" 
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${authError ? 'border-red-500' : 'border-gray-200'}`}
              />
              {authError && <p className="text-red-500 text-xs mt-2">Incorrect PIN. Please try again.</p>}
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-md"
            >
              Authenticate Securely
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white font-sans text-gray-800 overflow-hidden">
      
      <div className="w-64 bg-[#fff9f5] flex flex-col justify-between p-6 border-r border-orange-100 hidden md:flex">
        <div>
          <h1 className="text-2xl font-bold text-orange-900 tracking-wider mb-10">LUMINA</h1>
          <p className="text-xs text-gray-400 font-bold mb-4 tracking-widest uppercase">Overview</p>
          <nav className="space-y-2">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
            <SidebarItem icon={<Users size={20} />} label="Staff Members" />
            <SidebarItem icon={<Presentation size={20} />} label="Classrooms" />
            <SidebarItem icon={<FileText size={20} />} label="Analytics" />
          </nav>
        </div>
        <div className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-sm border border-orange-50">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700">MV</div>
          <div className="text-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Director</p>
            <p className="font-semibold text-gray-900">Marcus Vance</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#fafafa] p-8">
        
        <div className="flex justify-between items-start mb-8">
          <div>
            {selectedTeacher === 'all' ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900">Director's Overview</h2>
                <p className="text-gray-500 mt-1">Monitor campus-wide academic creation</p>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button onClick={() => setSelectedTeacher('all')} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100">
                  <ChevronLeft size={20} className="text-orange-600" />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{activeTeacherName}</h2>
                  <p className="text-gray-500 mt-1">Instructor Performance</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-gray-500 hover:text-red-600 font-medium mr-4"
            >
              Log Out
            </button>
            <select 
              className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg appearance-none cursor-pointer hover:bg-orange-700 shadow-sm"
              value={selectedTeacher} 
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="all">All Instructors</option>
              {data.teachers.map((t) => (
                <option key={t.teacher_id} value={t.teacher_id}>{t.teacher_name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
           <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div></div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {selectedTeacher === 'all' && <StatCard title="Active Staff" count={data.teachers.length} bgColor="bg-[#ffedd5]" />}
              <StatCard title="Lessons Created" count={data.totals.lessons} bgColor="bg-[#fef08a]" />
              <StatCard title="Assessments Made" count={data.totals.assessments} bgColor="bg-[#fed7aa]" />
              <StatCard title="Quizzes Conducted" count={data.totals.quizzes} bgColor="bg-[#fecaca]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-1">{selectedTeacher === 'all' ? 'Weekly Activity' : 'Content Breakdown'}</h3>
                <p className="text-sm text-gray-400 mb-6">Activity creation trends over time</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLesson" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ea580c" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAssessment" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="lesson" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorLesson)" />
                      <Area type="monotone" dataKey="assessment" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorAssessment)" />
                      <Area type="monotone" dataKey="quiz" stroke="#ca8a04" strokeWidth={3} fillOpacity={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold mb-1">{selectedTeacher === 'all' ? 'Automated Insights' : 'Recent Log'}</h3>
                <p className="text-sm text-gray-400 mb-6">Real-time alerts from your data</p>
                
                <div className="space-y-3 flex-1">
                  {selectedTeacher === 'all' ? (
                    <>
                      <div className="bg-[#ffedd5] p-4 rounded-xl flex items-start space-x-3">
                        <Bell size={18} className="text-orange-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-gray-800">A high volume of <b>Assessments</b> were generated this week.</p>
                      </div>
                      <div className="bg-[#fee2e2] p-4 rounded-xl flex items-start space-x-3">
                        <Presentation size={18} className="text-red-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-gray-800">Review required for <b>Science Dept.</b> due to low quiz deployment rates.</p>
                      </div>
                    </>
                  ) : (
                     <div className="bg-[#fef3c7] p-4 rounded-xl">
                       <p className="text-sm text-gray-800">Consistent activity logged across assigned subjects.</p>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-orange-100 text-orange-800 font-semibold' : 'text-gray-500 hover:bg-orange-50 hover:text-orange-700'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}

function StatCard({ title, count, bgColor }: { title: string, count: number, bgColor: string }) {
  return (
    <div className={`${bgColor} p-5 rounded-2xl flex flex-col justify-between h-32`}>
      <p className="text-sm text-gray-700 font-medium">{title}</p>
      <div className="mt-auto">
        <p className="text-4xl font-bold text-gray-900 mb-1">{count}</p>
        <p className="text-xs text-gray-600 font-medium">This week</p>
      </div>
    </div>
  );
}