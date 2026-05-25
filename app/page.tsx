'use client';

import React, { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client';
import { Play, Flame, Eye, Film, ArrowUpRight, Monitor, Upload, Loader2, Plus } from 'lucide-react';

export default function Portfolio() {
  // Dynamic State for Video Projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "High-Retention Hook Edit",
      client: "FAATRA TRADING",
      views: "2.4M",
      retention: "87%",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Temporary sample video
      color: "bg-[#FF6B6B]"
    }
  ]);

  // Player view states
  const [activeVideo, setActiveVideo] = useState(projects[0].videoUrl);
  const [activeRetention, setActiveRetention] = useState(projects[0].retention);

  // Form & Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [views, setViews] = useState('');
  const [retention, setRetention] = useState('');

  // Handle Video Upload and Project Creation
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) {
      alert("Please select a vertical video file first!");
      return;
    }

    try {
      setIsUploading(true);
      const file = fileInputRef.current.files[0];

      // 1. Upload video file to Vercel Blob
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      // 2. Append new project object to state array
      const colors = ["bg-[#4DABF7]", "bg-[#51CF66]", "bg-[#FF6B6B]", "bg-[#CCFF00]"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newProject = {
        id: projects.length + 1,
        title: title || "Untitled Edit",
        client: client || "Independent",
        views: views || "0",
        retention: retention ? `${retention}%` : "50%",
        videoUrl: newBlob.url,
        color: randomColor
      };

      setProjects([newProject, ...projects]);
      setActiveVideo(newBlob.url);
      setActiveRetention(newProject.retention);

      // Reset form variables
      setTitle('');
      setClient('');
      setViews('');
      setRetention('');
      setIsUploading(false);
      setShowAdmin(false);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Make sure your Vercel Token is configured.");
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4E6] text-black font-mono p-6 md:p-12 selection:bg-black selection:text-white">
      
      {/* HEADER */}
      <header className="flex justify-between items-center border-4 border-black bg-white p-4 mb-12 shadow-[4px_4px_0px_0px_#000000]">
        <div className="flex items-center gap-2">
          <Film className="w-6 h-6" />
          <span className="font-black text-xl tracking-wider">CUT.BAY // PORTFOLIO</span>
        </div>
        <button 
          onClick={() => setShowAdmin(!showAdmin)}
          className="border-2 border-black px-3 py-1 font-bold bg-[#CCFF00] hover:shadow-[2px_2px_0px_0px_#000000] transition-all flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> {showAdmin ? "CLOSE PANEL" : "UPLOAD WORK"}
        </button>
      </header>

      {/* ADMIN UPLOAD PANEL */}
      {showAdmin && (
        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000000] mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2 bg-black text-white p-2">
            <Upload className="w-5 h-5" /> // INITIALIZE NEW MISSION
          </h2>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="PROJECT TITLE" value={title} onChange={e => setTitle(e.target.value)} required className="border-2 border-black p-2 font-bold focus:bg-amber-50 outline-none" />
              <input type="text" placeholder="CLIENT NAME" value={client} onChange={e => setClient(e.target.value)} required className="border-2 border-black p-2 font-bold focus:bg-amber-50 outline-none" />
              <input type="text" placeholder="VIEWS (e.g. 1.2M)" value={views} onChange={e => setViews(e.target.value)} required className="border-2 border-black p-2 font-bold focus:bg-amber-50 outline-none" />
              <input type="number" placeholder="RETENTION % (e.g. 84)" value={retention} onChange={e => setRetention(e.target.value)} required className="border-2 border-black p-2 font-bold focus:bg-amber-50 outline-none" />
            </div>
            <div className="border-2 border-dashed border-black p-4 text-center bg-zinc-50 relative cursor-pointer hover:bg-zinc-100 transition-colors">
              <input type="file" ref={fileInputRef} accept="video/*" required className="absolute inset-0 opacity-0 cursor-pointer" />
              <p className="font-black text-sm text-zinc-600">DRAG & DROP OR CLICK TO CHOOSE 9:16 VIDEO FILE</p>
            </div>
            <button 
              type="submit" 
              disabled={isUploading}
              className="w-full border-4 border-black bg-[#FF6B6B] text-white p-3 font-black text-lg shadow-[4px_4px_0px_0px_#000000] disabled:bg-zinc-400 disabled:text-zinc-600 flex justify-center items-center gap-2"
            >
              {isUploading ? (<><Loader2 className="w-5 h-5 animate-spin" /> COMPRESSING & UPLOADING Asset...</>) : "PUSH TO PORTFOLIO LIVE Feed"}
            </button>
          </form>
        </div>
      )}

      {/* MAIN SYSTEM LAYOUT */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* LEFT: THE LIVE MONITOR */}
        <section className="lg:col-span-5 flex justify-center items-center">
          <div className="border-4 border-black bg-black w-full max-w-[360px] aspect-[9/16] shadow-[8px_8px_0px_0px_#000000] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 bg-white border-b-4 border-black p-2 flex justify-between items-center z-10">
              <span className="text-xs font-black flex items-center gap-1">
                <Monitor className="w-3 h-3" /> LIVE_PREVIEW.MP4
              </span>
            </div>

            {/* Core HTML5 Video Player Engine */}
            <div className="w-full h-full pt-8 bg-zinc-950 flex items-center justify-center">
              <video 
                key={activeVideo} 
                src={activeVideo} 
                controls 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-[#FF6B6B] border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000000] flex justify-between items-center z-10">
              <span className="text-xs font-black text-black">RETENTION RATE</span>
              <span className="text-sm font-black bg-white px-2 border border-black">{activeRetention}</span>
            </div>
          </div>
        </section>

        {/* RIGHT: THE PROJECT LOG GRID */}
        <section className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000000]">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
              Vertical Video Editor & Motion Designer
            </h1>
            <p className="text-lg font-bold text-zinc-700 max-w-xl leading-relaxed">
              I build high-retention 9:16 visual assets that convert. Optimized for the algorithm ecosystem.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-black tracking-widest uppercase text-zinc-600">// COMPLETED MISSIONS</h2>
            
            {projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => {
                  setActiveVideo(project.videoUrl);
                  setActiveRetention(project.retention);
                }}
                className={`border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer group ${activeVideo === project.videoUrl ? 'ring-4 ring-black' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${project.color} border-2 border-black flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_0px_#000000]`}>
                    0{project.id}
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-zinc-500 tracking-wider bg-zinc-100 px-1 border border-zinc-300">{project.client}</span>
                    <h3 className="text-lg font-black tracking-tight group-hover:text-[#FF6B6B] transition-colors">{project.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t-2 sm:border-t-0 pt-2 sm:pt-0 border-black">
                  <div className="flex items-center gap-1 font-bold text-sm bg-[#E9ECEF] px-2 py-1 border border-black">
                    <Eye className="w-4 h-4" /> {project.views}
                  </div>
                  <div className="flex items-center gap-1 font-bold text-sm bg-[#FFF0F6] text-[#D6336C] px-2 py-1 border border-black">
                    <Flame className="w-4 h-4" /> {project.retention}
                  </div>
                  <div className="p-1 border border-black bg-black text-white group-hover:bg-[#FF6B6B] group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}