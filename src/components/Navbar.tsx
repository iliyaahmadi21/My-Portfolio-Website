import React, { useState } from 'react';
import { Mic, BookOpen, GraduationCap, FileText, Mail, Sparkles, Menu, X, LayoutDashboard, Edit3 } from 'lucide-react';
import { SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenNewsletter: () => void;
  isAdminView: boolean;
  onToggleAdminView: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeSection,
  onNavigate,
  onOpenNewsletter,
  isAdminView,
  onToggleAdminView,
  isEditMode,
  onToggleEditMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'صفحه اصلی', icon: Sparkles },
    { id: 'podcast', label: 'پادکست', icon: Mic },
    { id: 'courses', label: 'دوره‌ها', icon: GraduationCap },
    { id: 'articles', label: 'مقالات', icon: FileText },
    { id: 'about', label: 'درباره من', icon: BookOpen },
    { id: 'newsletter', label: 'ارتباط و خبرنامه', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#D9CBC2]/60 transition-all duration-300">
      {/* Top Banner for Admin / No-Code Editor indicator */}
      <div className="bg-[#002147] text-[#E0C58F] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>پیش‌نمایش زنده No-Code (طرح اختصاصی ایلیا احمدی - سبک Ali Abdaal)</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px]">
          <button
            onClick={onToggleEditMode}
            className={`px-2.5 py-0.5 rounded transition flex items-center gap-1 ${
              isEditMode ? 'bg-[#E0C58F] text-[#002147] font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="فعال‌سازی ویرایش زنده متون"
          >
            <Edit3 className="w-3 h-3" />
            {isEditMode ? 'ویرایش دیداری فعال' : 'ویرایش متنی زنده'}
          </button>

          <button
            onClick={onToggleAdminView}
            className={`px-2.5 py-0.5 rounded transition flex items-center gap-1 ${
              isAdminView ? 'bg-[#E0C58F] text-[#002147] font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <LayoutDashboard className="w-3 h-3" />
            {isAdminView ? 'بازگشت به سایت اصلی' : 'پنل مدیریت (CMS)'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-right group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#112250] text-[#E0C58F] flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform border border-[#3C507D]/30">
              ا‌ا
            </div>
            <div>
              <span className="font-black text-xl text-[#002147] block tracking-tight group-hover:text-[#3C507D] transition-colors">
                {config.name}
              </span>
              <span className="text-xs text-[#3C507D] font-medium hidden sm:block">
                فن بیان & علوم شناختی
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id && !isAdminView;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#112250] text-[#F5F0E9] shadow-sm'
                    : 'text-[#112250]/80 hover:text-[#002147] hover:bg-[#D9CBC2]/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E0C58F]' : 'text-[#3C507D]'}`} />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Main Newsletter CTA */}
          <button
            onClick={onOpenNewsletter}
            className="bg-[#E0C58F] hover:bg-[#D2B48C] text-[#002147] font-bold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">عضویت در خبرنامه</span>
            <span className="sm:hidden">خبرنامه</span>
          </button>

          {/* Admin Toggle button for mobile */}
          <button
            onClick={onToggleAdminView}
            className="md:hidden p-2 rounded-lg bg-[#002147] text-[#E0C58F] text-xs font-semibold flex items-center gap-1"
            title="پنل مدیریت"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          {/* Hamburger Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#002147] hover:bg-[#D9CBC2]/50 focus:outline-none"
            aria-label="باز کردن منو"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F0E9] border-b border-[#D9CBC2] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-right px-4 py-3 rounded-xl text-base font-semibold flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-[#112250] text-[#E0C58F]'
                    : 'text-[#112250] hover:bg-[#D9CBC2]/40'
                }`}
              >
                <Icon className="w-5 h-5 text-[#3C507D]" />
                {link.label}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#D9CBC2]/60 flex flex-col gap-2">
            <button
              onClick={() => {
                onToggleEditMode();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold bg-[#3C507D]/10 text-[#002147] flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              {isEditMode ? 'غیرفعال‌سازی ویرایش متنی' : 'حالت ویرایش متنی زنده'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
