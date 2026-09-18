'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Users,
  Clock,
  Award,
  ShieldCheck,
  Search,
  LogOut,
  Mail,
  Smartphone,
} from 'lucide-react';

const ADMIN_PASSWORD = 'capablindia';

const PODDAR_MBA_STUDENTS = [
  { sNo: 1, name: 'KHUSHI MAHESHWARI', email: 'pgdm25.KHUSHIMAHESHWARI@poddarinstitute.org', phoneNumber: '9000000001', college: 'Poddar Group of Institutions' },
  { sNo: 2, name: 'PRIYANKA TEKCHANDANI', email: 'pgdm25.priyankatekchandani@poddarinstitute.org', phoneNumber: '9000000002', college: 'Poddar Group of Institutions' },
  { sNo: 3, name: 'MANASVI JAIN', email: 'pgdm25.manasvijain@poddarinstitute.org', phoneNumber: '9000000003', college: 'Poddar Group of Institutions' },
  { sNo: 4, name: 'KANISHK SEN', email: 'pgdm25.kanishksen@poddarinstitute.org', phoneNumber: '9000000004', college: 'Poddar Group of Institutions' },
  { sNo: 5, name: 'TUSHAR SHARMA', email: 'pgdm25.tusharsharma@poddarinstitute.org', phoneNumber: '9000000005', college: 'Poddar Group of Institutions' },
  { sNo: 6, name: 'KUNAL PRAJAPAT', email: 'pgdm25.kunalprajapat@poddarinstitute.org', phoneNumber: '9000000006', college: 'Poddar Group of Institutions' },
  { sNo: 7, name: 'SHIVANI SINGH', email: 'pgdm25.shivanisingh@poddarinstitute.org', phoneNumber: '9000000007', college: 'Poddar Group of Institutions' },
  { sNo: 8, name: 'SHASHI KANT SHARMA', email: 'pgdm25.shashikantsharma@poddarinstitute.org', phoneNumber: '9000000008', college: 'Poddar Group of Institutions' },
  { sNo: 9, name: 'DIKSHA SHARMA', email: 'pgdm25.dikshasharma@poddarinstitute.org', phoneNumber: '9000000009', college: 'Poddar Group of Institutions' },
  { sNo: 10, name: 'SUMIT JANGIR', email: 'pgdm25.sumitjangir@poddarinstitute.org', phoneNumber: '9000000010', college: 'Poddar Group of Institutions' },
  { sNo: 11, name: 'LOKESH SINGH CHOUHAN', email: 'pgdm25.lokeshsinghchouhan@poddarinstitute.org', phoneNumber: '9000000011', college: 'Poddar Group of Institutions' },
  { sNo: 12, name: 'KHUSHBOO SINDHI', email: 'pgdm25.khushboosindhi@poddarinstitute.org', phoneNumber: '9000000012', college: 'Poddar Group of Institutions' },
  { sNo: 13, name: 'AYUSH PAREEK', email: 'pgdm25.ayushpareek@poddarinstitute.org', phoneNumber: '9000000013', college: 'Poddar Group of Institutions' },
  { sNo: 14, name: 'LALITA SHARMA', email: 'pgdm25.lalitasharma@poddarinstitute.org', phoneNumber: '9000000014', college: 'Poddar Group of Institutions' },
  { sNo: 15, name: 'SURAJ JAIN', email: 'pgdm25.surajjain@poddarinstitute.org', phoneNumber: '9000000015', college: 'Poddar Group of Institutions' },
  { sNo: 16, name: 'VIKASH KUMAR SAINI', email: 'pgdm25.vikashkumarsaini@poddarinstitute.org', phoneNumber: '9000000016', college: 'Poddar Group of Institutions' },
  { sNo: 17, name: 'RAHUL SHARMA', email: 'pgdm25.rahulsharma@poddarinstitute.org', phoneNumber: '9000000017', college: 'Poddar Group of Institutions' },
  { sNo: 18, name: 'BHUPENDER SINGH', email: 'pgdm25.bhupendersingh@poddarinstitute.org', phoneNumber: '9000000018', college: 'Poddar Group of Institutions' },
  { sNo: 19, name: 'MOHIT SHARMA', email: 'pgdm25.mohitsharma@poddarinstitute.org', phoneNumber: '9000000019', college: 'Poddar Group of Institutions' },
];

interface TestItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: 'EMAIL_ONLY' | 'PHONE_OTP';
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  targetPath: string;
  landingPath: string;
  description: string;
  tag: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
      const isAuth = sessionStorage.getItem('aisat_admin_auth') === 'true';
      if (isAuth) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(null);
      sessionStorage.setItem('aisat_admin_auth', 'true');
    } else {
      setError('Incorrect administrator password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    sessionStorage.removeItem('aisat_admin_auth');
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const tests: TestItem[] = [
    {
      id: 'c35c9000-0000-4000-8000-000000000003',
      code: 'PRE_AISAT_MBA',
      title: 'Pre AI SAT MBA',
      subtitle: 'Management & Applied AI Pre-Assessment',
      type: 'EMAIL_ONLY',
      durationMinutes: 45,
      totalMarks: 160,
      totalQuestions: 50,
      targetPath: '/test/c35c9000-0000-4000-8000-000000000003',
      landingPath: '/?quizId=c35c9000-0000-4000-8000-000000000003',
      description: 'Non-tech & Management AI benchmark test. Candidates authenticate using only their official email ID without phone number or OTP.',
      tag: 'Email-Only Flow',
    },
    {
      id: '03afd2a8-2294-4e37-b81b-722300f66d81',
      code: 'AISAT_TECH_V1',
      title: 'AI SAT Engineering & CS',
      subtitle: 'National AI Benchmark Assessment',
      type: 'PHONE_OTP',
      durationMinutes: 45,
      totalMarks: 160,
      totalQuestions: 40,
      targetPath: '/test/03afd2a8-2294-4e37-b81b-722300f66d81',
      landingPath: '/?quizId=03afd2a8-2294-4e37-b81b-722300f66d81',
      description: 'Engineering CS & Developer agentic AI benchmark evaluation with full proctored timer & coding challenges.',
      tag: 'Phone + OTP Flow',
    },
  ];

  const filteredStudents = PODDAR_MBA_STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.phoneNumber.includes(studentSearch)
  );

  // Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#011C40] text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight pt-2">
              Capabl Admin Portal
            </h1>
            <p className="text-xs text-gray-500">
              Enter the administrator password to access the test directory.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full btn-capabl py-3 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              ← Back to Assessment Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Content
  return (
    <div className="min-h-screen bg-gray-50/40 text-gray-900 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-xl font-black tracking-tight text-gray-950">Capa</span>
              <span className="text-xl font-black tracking-tight bg-[#FFC700] text-gray-950 px-1 py-0.5 rounded-sm ml-0.5">bl.</span>
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-md">
              Test Administration & Link Directory
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-gray-500" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-10">
        
        {/* Banner */}
        <div className="bg-[#011C40] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#FFC700] text-black uppercase tracking-wider">
              Assessment Management
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Assessment Tests & Quick Launch Links
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Copy direct test links, inspect authentication configurations, or look up student login credentials.
            </p>
          </div>
        </div>

        {/* Section 1: Active Assessment Tests */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-gray-950">Active Assessment Tests ({tests.length})</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tests.map((test) => {
              const fullTestUrl = origin ? `${origin}${test.targetPath}` : test.targetPath;
              const fullLandingUrl = origin ? `${origin}${test.landingPath}` : test.landingPath;

              return (
                <div
                  key={test.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-2 ${
                          test.type === 'EMAIL_ONLY'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}>
                          {test.tag}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 leading-snug">
                          {test.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">{test.subtitle}</p>
                      </div>
                      <span className="font-mono text-[11px] font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {test.code}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {test.description}
                    </p>

                    {/* Stats Pill */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase">Duration</div>
                          <div className="font-bold">{test.durationMinutes} Mins</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-700">
                        <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase">Questions</div>
                          <div className="font-bold">{test.totalQuestions} Qs</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase">Total Marks</div>
                          <div className="font-bold">{test.totalMarks} Pts</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Links & Copy Buttons */}
                  <div className="space-y-2.5 pt-5 border-t border-gray-100 mt-5">
                    {/* Direct Test URL */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-gray-500 flex items-center justify-between">
                        <span>Direct Test Arena URL:</span>
                        <span className="font-mono text-[10px] text-gray-400">{test.targetPath}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={fullTestUrl}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-700 select-all"
                        />
                        <button
                          onClick={() => copyToClipboard(fullTestUrl, `direct_${test.id}`)}
                          className="btn-capabl shrink-0 px-3.5 py-2 rounded-lg text-xs font-bold text-black flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          title="Copy Link"
                        >
                          {copiedKey === `direct_${test.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-800" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <Link
                          href={test.targetPath}
                          target="_blank"
                          className="shrink-0 p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Landing Page URL with Query */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-bold text-gray-500 flex items-center justify-between">
                        <span>Landing Page Entry URL:</span>
                        <span className="font-mono text-[10px] text-gray-400">{test.landingPath}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={fullLandingUrl}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-700 select-all"
                        />
                        <button
                          onClick={() => copyToClipboard(fullLandingUrl, `landing_${test.id}`)}
                          className="px-3.5 py-2 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                          title="Copy Link"
                        >
                          {copiedKey === `landing_${test.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-800" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Pre-Seeded MBA Students Quick Directory */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-gray-950">
                  Pre-Seeded MBA Students ({PODDAR_MBA_STUDENTS.length})
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Students from Poddar Institute mapped for the "Pre AI SAT MBA" test with sequential phone numbers.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-[#FFC700]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Official Email ID</th>
                  <th className="px-4 py-3">Sequential Phone</th>
                  <th className="px-4 py-3">Institute</th>
                  <th className="px-4 py-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr key={s.email} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-gray-500">{s.sNo}</td>
                      <td className="px-4 py-3 font-bold text-gray-950">{s.name}</td>
                      <td className="px-4 py-3 font-mono text-gray-700">{s.email}</td>
                      <td className="px-4 py-3 font-mono text-gray-600">{s.phoneNumber}</td>
                      <td className="px-4 py-3 text-gray-500">{s.college}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => copyToClipboard(s.email, `email_${s.sNo}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer"
                          title="Copy Email ID"
                        >
                          {copiedKey === `email_${s.sNo}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-gray-500" />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      No matching students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-white text-center text-xs text-gray-500">
        Capabl Assessment Administration Portal · Secure Mode
      </footer>
    </div>
  );
}
