import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Nav from '../components/Nav' 
import Card from '../components/Card'
import Leaderboard from '../components/Leaderboard' 
import { FaUserGraduate, FaChalkboardTeacher, FaLayerGroup } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import home from "../assets/home1.jpg"; 
import ai from '../assets/ai.png';
import ai1 from '../assets/SearchAi.png';
import { SiViaplay } from "react-icons/si";
import Logos from '../components/Logos';
import About from '../components/About';
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate()
  const { courseData } = useSelector((state) => state.course)
  const { userData } = useSelector((state) => state.user)

  const featuredCourses = courseData?.slice(0, 3) || []

  // Progress Bar Logic
  const getNextRankInfo = (xp) => {
    const currentXp = xp || 0;
    if (currentXp >= 1500) return { next: "MAXED", percent: 100 };
    if (currentXp >= 1000) return { next: "Terminator", percent: (currentXp / 1500) * 100 };
    if (currentXp >= 500) return { next: "Master", percent: (currentXp / 1000) * 100 };
    if (currentXp >= 200) return { next: "Expert", percent: (currentXp / 500) * 100 };
    return { next: "Apprentice", percent: (currentXp / 200) * 100 };
  };

  const progress = getNextRankInfo(userData?.xp);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <div className='w-full lg:h-[90vh] h-[80vh] relative'>
        <div className="absolute top-0 left-0 w-full z-50">
           <Nav/>
        </div>
        <div className="w-full h-full relative">
           <img src={home} className='w-full h-full object-cover md:object-fill' alt="Hero" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-blue-900/40 to-slate-50"></div>
        </div>

        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16'>
            <h1 className='text-3xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-4'>
              Grow Your Skills to Advance
            </h1>
            <h2 className='text-xl md:text-3xl lg:text-5xl font-bold text-blue-200 drop-shadow-lg mb-10'>
              Your Career Path
            </h2>
            <div className='flex flex-col md:flex-row items-center gap-6 w-full justify-center'>
              <button className='px-8 py-3 border-2 border-white text-white rounded-xl text-lg font-medium flex items-center gap-3 hover:bg-white hover:text-blue-900 transition-all duration-300 backdrop-blur-sm' onClick={() => navigate("/allcourses")}>
                View all Courses <SiViaplay className='w-6 h-6' />
              </button>
              <button className='px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium flex items-center gap-3 shadow-lg shadow-blue-500/50 hover:bg-blue-700 hover:scale-105 transition-all duration-300' onClick={() => navigate("/searchwithai")}>
                Search with AI 
                <img src={ai} className='w-8 h-8 rounded-full hidden lg:block border border-blue-400' alt="AI" />
                <img src={ai1} className='w-8 h-8 rounded-full lg:hidden border border-blue-400' alt="AI" />
              </button>
            </div>
        </div>
      </div>

      {/* 2. PROGRESS & LEADERBOARD SECTION */}
      <div className="bg-white py-16 px-6">
        {/* User Progress Banner */}
        {userData && (
          <div className="max-w-5xl mx-auto bg-blue-600 text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow-xl mb-16 transform hover:scale-[1.01] transition-all">
            <div className="text-left mb-4 md:mb-0">
               <h2 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Your Current Rank</h2>
               <p className="text-3xl font-black">
                 {userData.xp || 0} XP <span className="text-blue-200 mx-2">|</span> <span className="text-yellow-300">{userData.rank || "Novice"}</span>
               </p>
            </div>
            <div className="w-full md:w-1/3">
               <div className="flex justify-between text-xs mb-2 font-bold opacity-90">
                  <span>NEXT: {progress.next}</span>
                  <span>{Math.round(progress.percent)}%</span>
               </div>
               <div className="w-full bg-blue-900/50 rounded-full h-3">
                  <div className="bg-yellow-400 h-3 rounded-full transition-all duration-1000" style={{ width: `${progress.percent}%` }}></div>
               </div>
            </div>
          </div>
        )}

        {/* Hall of Fame Header */}
        <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                The Terminator Hall of Fame
            </h1>
            <p className="text-blue-600 font-bold text-lg">
                Top 10 Learners dominating the platform right now
            </p>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Leaderboard Grid */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-12">
            <div className="lg:w-1/3 text-center lg:text-left sticky top-24">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Compete & Win</h3>
                <p className="text-slate-500 leading-relaxed mb-8">
                    Every lecture you complete earns you <span className="font-bold text-blue-600">50 XP</span>. 
                    Climb the ranks, unlock the <span className="font-bold text-slate-900">Terminator Badge</span>, 
                    and showcase your skills to the world.
                </p>
                <button 
                  onClick={() => navigate('/allcourses')}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg w-full md:w-auto"
                >
                    Start Earning XP
                </button>
            </div>
            <div className="w-full lg:w-2/3">
                <Leaderboard />
            </div>
        </div>
      </div>

      {/* 3. FEATURED COURSES SECTION */}
      <div className="bg-gray-50 py-20 px-6 border-t border-gray-100">
         <div className="max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Featured Courses</h2>
             
             {/* Course Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredCourses.length > 0 ? (
                    featuredCourses.map((course) => (
                        <Card 
                            key={course._id} 
                            id={course._id} 
                            title={course.title} 
                            category={course.category} 
                            price={course.price} 
                            thumbnail={course.thumbnail} 
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500 italic">No courses available yet.</p>
                )}
             </div>

             {/* View All Button */}
             <div className="flex justify-center">
                <button 
                    onClick={() => navigate('/allcourses')} 
                    className="bg-black text-white text-base px-10 py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:bg-gray-900 transition-all duration-300"
                >
                    View all Courses
                </button>
             </div>
         </div>
      </div>

      {/* 4. ABOUT SECTION (Fixed "TLE Terminators" Text) */}
      <div className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            {/* Left: Blue Box with "TLE Terminators" Text */}
            <div className="w-full md:w-1/2 h-80 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group p-4">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                
                {/* UPDATED TEXT HERE */}
                <span className="text-white font-black text-5xl md:text-6xl text-center opacity-20 group-hover:opacity-40 transition-opacity duration-500 leading-tight">
                  TLE Terminators
                </span>

                <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30">
                    <p className="text-white font-bold text-sm">Empowering 1000+ Students</p>
                </div>
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 space-y-8">
                <div>
                    <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">Why Choose Us?</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        We Maximize Your Learning Potential
                    </h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                    We provide a modern Learning Management System to simplify online education, 
                    track progress with gamification, and enhance student-instructor collaboration.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                        <div className="bg-white p-3 rounded-full shadow-sm text-blue-600 text-xl"><FaLayerGroup /></div>
                        <span className="font-semibold text-slate-800">Gamified Learning</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                        <div className="bg-white p-3 rounded-full shadow-sm text-blue-600 text-xl"><FaChalkboardTeacher /></div>
                        <span className="font-semibold text-slate-800">Expert Trainers</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 5. FOOTER FEATURES */}
      <div className="bg-slate-900 py-16 border-t border-slate-800 text-slate-400">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-10 md:justify-between text-sm md:text-base">
              <div className="flex items-center gap-3 group cursor-default">
                  <FaUserGraduate className="text-2xl text-white group-hover:text-blue-400 transition-colors" />
                  <span className="font-medium group-hover:text-white transition-colors">20k+ Online Courses</span>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                  <RiSecurePaymentFill className="text-2xl text-white group-hover:text-blue-400 transition-colors" />
                  <span className="font-medium group-hover:text-white transition-colors">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                  <span className="text-2xl text-white font-bold group-hover:text-blue-400 transition-colors">$</span>
                  <span className="font-medium group-hover:text-white transition-colors">Value For Money</span>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                  <BiSupport className="text-2xl text-white group-hover:text-blue-400 transition-colors" />
                  <span className="font-medium group-hover:text-white transition-colors">Lifetime Support</span>
              </div>
          </div>
      </div>

      <Footer />

    </div>
  )
}

export default Home