import React, { useState } from 'react';
import { PodcastEpisode, Course, SiteConfig, NewsletterSubscriber } from '../types';
import { LayoutDashboard, Mic, GraduationCap, Users, Settings, Plus, Trash2, Edit2, Save, Check, RefreshCw } from 'lucide-react';

interface AdminCMSProps {
  config: SiteConfig;
  onUpdateConfig: (updated: Partial<SiteConfig>) => void;
  podcasts: PodcastEpisode[];
  onAddPodcast: (episode: PodcastEpisode) => void;
  onDeletePodcast: (id: string) => void;
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  subscribers: NewsletterSubscriber[];
  onExitAdmin: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  config,
  onUpdateConfig,
  podcasts,
  onAddPodcast,
  onDeletePodcast,
  courses,
  onAddCourse,
  onDeleteCourse,
  subscribers,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'podcasts' | 'courses' | 'subscribers'>('settings');
  const [savedNotice, setSavedNotice] = useState(false);

  // New Podcast Form State
  const [newPodTitle, setNewPodTitle] = useState('');
  const [newPodDesc, setNewPodDesc] = useState('');
  const [newPodDuration, setNewPodDuration] = useState('32:10');

  // New Course Form State
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('۳,۵۰۰,۰۰۰ تومان');
  const [newCourseCategory, setNewCourseCategory] = useState<'فن بیان' | 'علوم شناختی' | 'هوش کلامی' | 'مذاکره'>('فن بیان');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  const triggerSaveNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCreatePodcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPodTitle) return;

    const episode: PodcastEpisode = {
      id: `ep-${Date.now()}`,
      episodeNumber: podcasts.length + 1,
      title: newPodTitle,
      duration: newPodDuration,
      date: new Date().toLocaleDateString('fa-IR'),
      description: newPodDesc || 'توضیحات پیش‌فرض اپیزود جدید',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      spotifyUrl: 'https://spotify.com',
      castboxUrl: 'https://castbox.fm',
      tags: ['جدید', 'فن بیان'],
      playsCount: 0,
    };

    onAddPodcast(episode);
    setNewPodTitle('');
    setNewPodDesc('');
    triggerSaveNotice();
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle) return;

    const course: Course = {
      id: `course-${Date.now()}`,
      title: newCourseTitle,
      category: newCourseCategory,
      description: newCourseDesc || 'توضیحات دوره جدید',
      price: newCoursePrice,
      duration: '۱۵ ساعت آموزش',
      lessonsCount: 15,
      studentsCount: 1,
      rating: 5.0,
      badge: 'جدید',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      features: ['آموزش ویدئویی HQ', 'پشتیبانی دوره', 'گواهی پایان دوره'],
    };

    onAddCourse(course);
    setNewCourseTitle('');
    setNewCourseDesc('');
    triggerSaveNotice();
  };

  return (
    <div className="min-h-screen bg-[#112250] text-[#F5F0E9] p-4 sm:p-8 dir-rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-[#002147] rounded-3xl p-6 border border-[#3C507D] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E0C58F] text-[#002147] flex items-center justify-center font-bold">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                پنل مدیریت بدون کد (Visual No-Code CMS)
              </h1>
              <p className="text-xs text-[#D9CBC2]">
                مدیریت آسان محتوا، دوره‌ها، پادکست‌ها و اعضای خبرنامه
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedNotice && (
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1.5 rounded-xl border border-emerald-500/40 flex items-center gap-1 animate-fadeIn">
                <Check className="w-4 h-4" />
                تغییرات ذخیره شد
              </span>
            )}

            <button
              onClick={onExitAdmin}
              className="bg-[#E0C58F] hover:bg-[#D2B48C] text-[#002147] font-bold px-5 py-2.5 rounded-xl text-xs transition shadow"
            >
              بازگشت به پیش‌نمایش سایت
            </button>
          </div>
        </div>

        {/* CMS Tabs Navbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#3C507D] pb-3">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#E0C58F] text-[#002147]'
                : 'bg-[#002147] text-[#D9CBC2] hover:bg-[#3C507D]/40'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>تنظیمات اصلی و بیو</span>
          </button>

          <button
            onClick={() => setActiveTab('podcasts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'podcasts'
                ? 'bg-[#E0C58F] text-[#002147]'
                : 'bg-[#002147] text-[#D9CBC2] hover:bg-[#3C507D]/40'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>مدیریت پادکست‌ها ({podcasts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-[#E0C58F] text-[#002147]'
                : 'bg-[#002147] text-[#D9CBC2] hover:bg-[#3C507D]/40'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>مدیریت دوره‌ها ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'subscribers'
                ? 'bg-[#E0C58F] text-[#002147]'
                : 'bg-[#002147] text-[#D9CBC2] hover:bg-[#3C507D]/40'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>اعضای خبرنامه ({subscribers.length})</span>
          </button>
        </div>

        {/* Tab 1: General Settings */}
        {activeTab === 'settings' && (
          <div className="bg-[#002147] rounded-3xl p-6 sm:p-8 border border-[#3C507D] space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-[#3C507D] pb-3">
              ویرایش عنوان، بیو و آمار عمومی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#D9CBC2] block font-medium">نام استاد / صاحب برند:</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => {
                    onUpdateConfig({ name: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] text-xs focus:outline-none focus:border-[#E0C58F]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#D9CBC2] block font-medium">شعار برند (Tagline):</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => {
                    onUpdateConfig({ tagline: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] text-xs focus:outline-none focus:border-[#E0C58F]"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs text-[#D9CBC2] block font-medium">تیتر اصلی بخش هیرو:</label>
                <textarea
                  value={config.bioHeadline}
                  onChange={(e) => {
                    onUpdateConfig({ bioHeadline: e.target.value });
                    triggerSaveNotice();
                  }}
                  rows={2}
                  className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] text-xs focus:outline-none focus:border-[#E0C58F]"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs text-[#D9CBC2] block font-medium">توضیحات کوتاه بیوگرافی:</label>
                <textarea
                  value={config.bioParagraph1}
                  onChange={(e) => {
                    onUpdateConfig({ bioParagraph1: e.target.value });
                    triggerSaveNotice();
                  }}
                  rows={3}
                  className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] text-xs focus:outline-none focus:border-[#E0C58F]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Podcasts Management */}
        {activeTab === 'podcasts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Podcast Form */}
            <div className="lg:col-span-5 bg-[#002147] rounded-3xl p-6 border border-[#3C507D] space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#E0C58F]" />
                <span>افزودن اپیزود جدید پادکست</span>
              </h3>

              <form onSubmit={handleCreatePodcast} className="space-y-4 text-xs">
                <div>
                  <label className="block mb-1 text-[#D9CBC2]">عنوان اپیزود:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلا: قسمت ۶۹: تکنیک‌های نفوذ کلام..."
                    value={newPodTitle}
                    onChange={(e) => setNewPodTitle(e.target.value)}
                    className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] focus:outline-none focus:border-[#E0C58F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#D9CBC2]">مدت زمان (دقیقه):</label>
                  <input
                    type="text"
                    value={newPodDuration}
                    onChange={(e) => setNewPodDuration(e.target.value)}
                    className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] focus:outline-none focus:border-[#E0C58F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#D9CBC2]">توضیحات کوتاه:</label>
                  <textarea
                    value={newPodDesc}
                    onChange={(e) => setNewPodDesc(e.target.value)}
                    rows={3}
                    placeholder="خلاصه مباحث مطرح شده..."
                    className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] focus:outline-none focus:border-[#E0C58F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E0C58F] text-[#002147] font-bold py-3 rounded-xl hover:bg-[#D2B48C] transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>انتشار اپیزود جدید</span>
                </button>
              </form>
            </div>

            {/* Existing Podcasts List */}
            <div className="lg:col-span-7 bg-[#002147] rounded-3xl p-6 border border-[#3C507D] space-y-4">
              <h3 className="text-base font-bold text-white">اپیزودهای فعال</h3>

              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {podcasts.map((ep) => (
                  <div
                    key={ep.id}
                    className="bg-[#112250] p-4 rounded-2xl border border-[#3C507D]/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#E0C58F] block">قسمت {ep.episodeNumber}: {ep.title}</span>
                      <span className="text-[#D9CBC2] text-[11px]">{ep.date} | {ep.duration}</span>
                    </div>

                    <button
                      onClick={() => onDeletePodcast(ep.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 transition"
                      title="حذف اپیزود"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Courses Management */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-[#002147] rounded-3xl p-6 border border-[#3C507D] space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#E0C58F]" />
                <span>تعریف دوره آموزشی جدید</span>
              </h3>

              <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
                <div>
                  <label className="block mb-1 text-[#D9CBC2]">عنوان دوره:</label>
                  <input
                    type="text"
                    required
                    placeholder="عنوان دوره..."
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] focus:outline-none focus:border-[#E0C58F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#D9CBC2]">دسته‌بندی:</label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value as any)}
                    className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] focus:outline-none focus:border-[#E0C58F]"
                  >
                    <option value="فن بیان">فن بیان</option>
                    <option value="علوم شناختی">علوم شناختی</option>
                    <option value="هوش کلامی">هوش کلامی</option>
                    <option value="مذاکره">مذاکره</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-[#D9CBC2]">قیمت دوره (تومان):</label>
                  <input
                    type="text"
                    value={newCoursePrice}
                    onChange={(e) => setNewCoursePrice(e.target.value)}
                    className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] focus:outline-none focus:border-[#E0C58F]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[#D9CBC2]">توضیحات دوره:</label>
                  <textarea
                    value={newCourseDesc}
                    onChange={(e) => setNewCourseDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-[#112250] text-white p-3 rounded-xl border border-[#3C507D] focus:outline-none focus:border-[#E0C58F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E0C58F] text-[#002147] font-bold py-3 rounded-xl hover:bg-[#D2B48C] transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت دوره جدید</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-[#002147] rounded-3xl p-6 border border-[#3C507D] space-y-4">
              <h3 className="text-base font-bold text-white">دوره‌های فعال روی سایت</h3>

              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {courses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#112250] p-4 rounded-2xl border border-[#3C507D]/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{c.title}</span>
                      <span className="text-[#E0C58F] font-mono">{c.price} | {c.category}</span>
                    </div>

                    <button
                      onClick={() => onDeleteCourse(c.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 transition"
                      title="حذف دوره"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="bg-[#002147] rounded-3xl p-6 border border-[#3C507D] space-y-4">
            <h3 className="text-base font-bold text-white">لیست اعضای خبرنامه ایمیلی</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead>
                  <tr className="border-b border-[#3C507D] text-[#E0C58F]">
                    <th className="p-3">ردیف</th>
                    <th className="p-3">نام</th>
                    <th className="p-3">ایمیل</th>
                    <th className="p-3">تاریخ عضویت</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s, idx) => (
                    <tr key={s.id} className="border-b border-[#3C507D]/30 text-[#D9CBC2]">
                      <td className="p-3 font-mono">{idx + 1}</td>
                      <td className="p-3 font-bold text-white">{s.name || 'کاربر ناشناس'}</td>
                      <td className="p-3 font-mono dir-ltr text-right">{s.email}</td>
                      <td className="p-3 text-[11px]">{s.subscribedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
