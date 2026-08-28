import React, { useState } from 'react';
import { initialSiteConfig, initialPodcasts, initialCourses, initialArticles, initialTestimonials } from './data/initialData';
import { SiteConfig, PodcastEpisode, Course, Article, Testimonial, NewsletterSubscriber } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PodcastPlayerWidget } from './components/PodcastPlayerWidget';
import { CoursesGrid } from './components/CoursesGrid';
import { ArticlesSection } from './components/ArticlesSection';
import { AboutSection } from './components/AboutSection';
import { ConsultationSection } from './components/ConsultationSection';
import { NewsletterBanner } from './components/NewsletterBanner';
import { AdminCMS } from './components/AdminCMS';
import { PersistentAudioPlayer } from './components/PersistentAudioPlayer';
import { CourseModal } from './components/CourseModal';
import { ArticleModal } from './components/ArticleModal';
import { Footer } from './components/Footer';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(initialPodcasts);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [articles] = useState<Article[]>(initialArticles);
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([
    { id: 'sub-1', email: 'sara.ebrahimi@gmail.com', name: 'سارا ابراهیمی', subscribedAt: '۱۴۰۵/۰۵/۰۱' },
    { id: 'sub-2', email: 'reza.m@tech.io', name: 'رضا محمدی', subscribedAt: '۱۴۰۵/۰۵/۰۳' },
  ]);

  // Audio Player State
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(initialPodcasts[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showFloatingPlayer, setShowFloatingPlayer] = useState<boolean>(false);

  // Modals & Navigation State
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);
  const [selectedArticleModal, setSelectedArticleModal] = useState<Article | null>(null);

  // Scroll Handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isAdminView) {
      setIsAdminView(false);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update Config
  const handleUpdateConfig = (updated: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  // Add Newsletter Subscriber
  const handleSubscribe = (email: string, name?: string) => {
    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      name,
      subscribedAt: new Date().toLocaleDateString('fa-IR'),
    };
    setSubscribers((prev) => [newSub, ...prev]);
  };

  // Audio Handlers
  const handlePlayEpisode = (episode: PodcastEpisode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    setShowFloatingPlayer(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowFloatingPlayer(true);
  };

  // CMS Handlers
  const handleAddPodcast = (episode: PodcastEpisode) => {
    setPodcasts((prev) => [episode, ...prev]);
  };

  const handleDeletePodcast = (id: string) => {
    setPodcasts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F0E9] text-[#112250] font-sans selection:bg-[#E0C58F] selection:text-[#002147] dir-rtl">
      
      {/* If in Admin CMS mode, render CMS directly */}
      {isAdminView ? (
        <AdminCMS
          config={config}
          onUpdateConfig={handleUpdateConfig}
          podcasts={podcasts}
          onAddPodcast={handleAddPodcast}
          onDeletePodcast={handleDeletePodcast}
          courses={courses}
          onAddCourse={handleAddCourse}
          onDeleteCourse={handleDeleteCourse}
          subscribers={subscribers}
          onExitAdmin={() => setIsAdminView(false)}
        />
      ) : (
        <>
          {/* Main Public Website Layout */}
          <Navbar
            config={config}
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenNewsletter={() => handleNavigate('newsletter')}
            isAdminView={isAdminView}
            onToggleAdminView={() => setIsAdminView(!isAdminView)}
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
          />

          <main>
            {/* Section 1 & 2: Hero */}
            <Hero
              config={config}
              onNavigate={handleNavigate}
              onPlayFeaturedPodcast={() => handlePlayEpisode(podcasts[0])}
              isEditMode={isEditMode}
              onUpdateConfig={handleUpdateConfig}
            />

            {/* Section: Consultation Booking */}
            <ConsultationSection />

            {/* Section 3: Podcast Player */}
            <PodcastPlayerWidget
              episodes={podcasts}
              currentEpisode={currentEpisode}
              isPlaying={isPlaying}
              onPlayEpisode={handlePlayEpisode}
              onTogglePlay={handleTogglePlay}
              playbackRate={playbackRate}
              onChangeSpeed={(rate) => setPlaybackRate(rate)}
            />

            {/* Section 4: Courses */}
            <CoursesGrid
              courses={courses}
              onSelectCourse={(course) => setSelectedCourseModal(course)}
            />

            {/* Section 5: Articles & Essays */}
            <ArticlesSection
              articles={articles}
              onSelectArticle={(article) => setSelectedArticleModal(article)}
            />

            {/* Section 6: About & Testimonials */}
            <AboutSection
              config={config}
              testimonials={testimonials}
            />

            {/* Section 7: Newsletter Banner */}
            <NewsletterBanner
              config={config}
              onSubscribe={handleSubscribe}
            />
          </main>

          {/* Footer */}
          <Footer config={config} onNavigate={handleNavigate} />

          {/* Persistent Audio Player */}
          {showFloatingPlayer && (
            <PersistentAudioPlayer
              currentEpisode={currentEpisode}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onClose={() => setShowFloatingPlayer(false)}
            />
          )}

          {/* Course Enrollment Modal */}
          <CourseModal
            course={selectedCourseModal}
            onClose={() => setSelectedCourseModal(null)}
          />

          {/* Article Reading Modal */}
          <ArticleModal
            article={selectedArticleModal}
            onClose={() => setSelectedArticleModal(null)}
          />
        </>
      )}

    </div>
  );
}
