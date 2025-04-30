'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { MapPinIcon, BriefcaseIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';
import JobApplicationModal from '@/components/JobApplicationModal';
import { Job } from '@/types/job';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Läkarvikarierande',
      location: 'Tønsberg',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '65000 NOK/månad',
      department: 'Medicinska avdelningen',
      description: 'Vi söker ambitiösa läkarstudenter för sommarjobb på vår medicinska avdelning. Erfarenhet av akutsjukvård är meriterande.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper',
        'Erfarenhet av akutsjukvård är meriterande'
      ],
      contactPerson: 'Dr. Anders Nilsen',
      contactEmail: 'rekrytering@siv.no',
      applyUrl: 'https://siv.no/jobb/1234',
      deadline: '2024-05-01'
    },
    {
      id: '2',
      title: 'Sommervikar Lege',
      location: 'Oslo',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '70000 NOK/månad',
      department: 'Diverse avdelningar',
      description: 'Möjlighet att arbeta på Norges största sjukhus. Vi erbjuder god handledning och varierande arbetsuppgifter inom olika specialiteter.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper',
        'Tidigare erfarenhet är meriterande'
      ],
      contactPerson: 'Dr. Maria Hansen',
      contactEmail: 'sommarjobb@ous-hf.no',
      applyUrl: 'https://ous-hf.no/jobb/5678',
      deadline: '2024-05-15'
    },
    {
      id: '3',
      title: 'LIS1-vikariat',
      location: 'Bergen',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '68000 NOK/månad',
      department: 'Kirurgiska och medicinska avdelningar',
      description: 'Perfekt för dig som vill få erfarenhet inom både kirurgi och medicin. Vi söker dig som är i slutet av din utbildning.',
      requirements: [
        'Läkarstudent termin 11+',
        'Svenska eller norska kunskaper',
        'Erfarenhet från både kirurgi och medicin är meriterande'
      ],
      contactPerson: 'Dr. Erik Solberg',
      contactEmail: 'jobb@helse-bergen.no',
      applyUrl: 'https://helse-bergen.no/jobb/9012',
      deadline: '2024-04-30'
    },
    {
      id: '4',
      title: 'Sommarläkare',
      location: 'Trondheim',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '67000 NOK/månad',
      department: 'Akutmottagningen',
      description: 'Vi söker engagerade läkarstudenter till vår akutmottagning under sommaren. God handledning utlovas.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper',
        'Intresse för akutsjukvård'
      ],
      contactPerson: 'Dr. Kristian Berg',
      contactEmail: 'jobb@st-olav.no',
      applyUrl: 'https://st-olav.no/jobb/1234',
      deadline: '2024-05-10'
    },
    {
      id: '5',
      title: 'Läkarvikarie',
      location: 'Stavanger',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '69000 NOK/månad',
      department: 'Barnkliniken',
      description: 'Sommarvikariat på barnkliniken. Vi erbjuder ett stimulerande arbete med goda utvecklingsmöjligheter.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper',
        'Intresse för pediatrik'
      ],
      contactPerson: 'Dr. Lisa Andersen',
      contactEmail: 'jobb@sus.no',
      applyUrl: 'https://sus.no/jobb/5678',
      deadline: '2024-05-20'
    },
    {
      id: '6',
      title: 'Sommarvikarierande läkare',
      location: 'Tromsø',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '72000 NOK/månad',
      department: 'Internmedicin',
      description: 'Spännande möjlighet att arbeta vid Norges nordligaste universitetssjukhus.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Ole Hansen',
      contactEmail: 'jobb@unn.no',
      applyUrl: 'https://unn.no/jobb/9012',
      deadline: '2024-05-15'
    },
    {
      id: '7',
      title: 'Läkarvikarie',
      location: 'Kristiansand',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '66000 NOK/månad',
      department: 'Ortopediska kliniken',
      description: 'Vi söker läkarstudenter med intresse för ortopedi till sommarvikariat.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Nina Larsen',
      contactEmail: 'jobb@sshf.no',
      applyUrl: 'https://sshf.no/jobb/1234',
      deadline: '2024-05-01'
    },
    {
      id: '8',
      title: 'Sommarjobb läkare',
      location: 'Ålesund',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '67000 NOK/månad',
      department: 'Kirurgiska avdelningen',
      description: 'Möjlighet till varierande arbete inom kirurgi under sommaren.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Thomas Berg',
      contactEmail: 'jobb@helse-mr.no',
      applyUrl: 'https://helse-mr.no/jobb/5678',
      deadline: '2024-05-10'
    },
    {
      id: '9',
      title: 'Läkarvikarie',
      location: 'Bodø',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '70000 NOK/månad',
      department: 'Psykiatriska kliniken',
      description: 'Vi söker läkarstudenter med intresse för psykiatri till sommarvikariat.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Maria Olsen',
      contactEmail: 'jobb@nordlandssykehuset.no',
      applyUrl: 'https://nordlandssykehuset.no/jobb/9012',
      deadline: '2024-05-20'
    },
    {
      id: '10',
      title: 'Sommarvikarierande läkare',
      location: 'Drammen',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '68000 NOK/månad',
      department: 'Medicinska avdelningen',
      description: 'Vi erbjuder sommarvikariat med fokus på internmedicin.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Anders Nilsson',
      contactEmail: 'jobb@vestreviken.no',
      applyUrl: 'https://vestreviken.no/jobb/1234',
      deadline: '2024-05-15'
    },
    {
      id: '11',
      title: 'Läkarvikarie',
      location: 'Haugesund',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '66000 NOK/månad',
      department: 'Akutmottagningen',
      description: 'Spännande möjlighet att arbeta på vår akutmottagning under sommaren.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Erik Hansen',
      contactEmail: 'jobb@helse-fonna.no',
      applyUrl: 'https://helse-fonna.no/jobb/5678',
      deadline: '2024-05-01'
    },
    {
      id: '12',
      title: 'Sommarläkare',
      location: 'Fredrikstad',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '67000 NOK/månad',
      department: 'Barnkliniken',
      description: 'Vi söker engagerade läkarstudenter till vår barnklinik.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Lisa Berg',
      contactEmail: 'jobb@so-hf.no',
      applyUrl: 'https://so-hf.no/jobb/9012',
      deadline: '2024-05-10'
    },
    {
      id: '13',
      title: 'Läkarvikarie',
      location: 'Skien',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '65000 NOK/månad',
      department: 'Kirurgiska avdelningen',
      description: 'Sommarvikariat med fokus på kirurgi och akutsjukvård.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Ole Larsen',
      contactEmail: 'jobb@sthf.no',
      applyUrl: 'https://sthf.no/jobb/1234',
      deadline: '2024-05-20'
    },
    {
      id: '14',
      title: 'Sommarvikarierande läkare',
      location: 'Gjøvik',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '66000 NOK/månad',
      department: 'Medicinska avdelningen',
      description: 'Vi erbjuder sommarvikariat inom internmedicin med god handledning.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Nina Berg',
      contactEmail: 'jobb@sykehuset-innlandet.no',
      applyUrl: 'https://sykehuset-innlandet.no/jobb/5678',
      deadline: '2024-05-15'
    },
    {
      id: '15',
      title: 'Läkarvikarie',
      location: 'Molde',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '68000 NOK/månad',
      department: 'Ortopediska kliniken',
      description: 'Spännande möjlighet att arbeta inom ortopedi under sommaren.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Thomas Nilsen',
      contactEmail: 'jobb@helse-mr.no',
      applyUrl: 'https://helse-mr.no/jobb/9012',
      deadline: '2024-05-01'
    },
    {
      id: '16',
      title: 'Sommarläkare',
      location: 'Lillehammer',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '67000 NOK/månad',
      department: 'Psykiatriska kliniken',
      description: 'Vi söker läkarstudenter med intresse för psykiatri.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Maria Berg',
      contactEmail: 'jobb@sykehuset-innlandet.no',
      applyUrl: 'https://sykehuset-innlandet.no/jobb/1234',
      deadline: '2024-05-10'
    },
    {
      id: '17',
      title: 'Läkarvikarie',
      location: 'Kongsberg',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '66000 NOK/månad',
      department: 'Akutmottagningen',
      description: 'Sommarvikariat på akutmottagningen med varierande arbetsuppgifter.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Erik Olsen',
      contactEmail: 'jobb@vestreviken.no',
      applyUrl: 'https://vestreviken.no/jobb/5678',
      deadline: '2024-05-20'
    },
    {
      id: '18',
      title: 'Sommarvikarierande läkare',
      location: 'Kristiansund',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '69000 NOK/månad',
      department: 'Medicinska avdelningen',
      description: 'Vi erbjuder sommarvikariat med fokus på internmedicin.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Anders Berg',
      contactEmail: 'jobb@helse-mr.no',
      applyUrl: 'https://helse-mr.no/jobb/9012',
      deadline: '2024-05-15'
    },
    {
      id: '19',
      title: 'Läkarvikarie',
      location: 'Harstad',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '71000 NOK/månad',
      department: 'Kirurgiska avdelningen',
      description: 'Spännande möjlighet att arbeta inom kirurgi i Nordnorge.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Ole Berg',
      contactEmail: 'jobb@unn.no',
      applyUrl: 'https://unn.no/jobb/1234',
      deadline: '2024-05-01'
    },
    {
      id: '20',
      title: 'Sommarläkare',
      location: 'Arendal',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '66000 NOK/månad',
      department: 'Barnkliniken',
      description: 'Vi söker engagerade läkarstudenter till vår barnklinik.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Lisa Olsen',
      contactEmail: 'jobb@sshf.no',
      applyUrl: 'https://sshf.no/jobb/5678',
      deadline: '2024-05-10'
    },
    {
      id: '21',
      title: 'Läkarvikarie',
      location: 'Elverum',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '67000 NOK/månad',
      department: 'Medicinska avdelningen',
      description: 'Sommarvikariat inom internmedicin med goda utvecklingsmöjligheter.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Thomas Hansen',
      contactEmail: 'jobb@sykehuset-innlandet.no',
      applyUrl: 'https://sykehuset-innlandet.no/jobb/9012',
      deadline: '2024-05-20'
    },
    {
      id: '22',
      title: 'Sommarvikarierande läkare',
      location: 'Namsos',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '68000 NOK/månad',
      department: 'Akutmottagningen',
      description: 'Vi erbjuder sommarvikariat på vår akutmottagning.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Nina Olsen',
      contactEmail: 'jobb@hnt.no',
      applyUrl: 'https://hnt.no/jobb/1234',
      deadline: '2024-05-15'
    },
    {
      id: '23',
      title: 'Läkarvikarie',
      location: 'Voss',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '67000 NOK/månad',
      department: 'Kirurgiska avdelningen',
      description: 'Spännande möjlighet att arbeta inom kirurgi i vackra Voss.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Erik Berg',
      contactEmail: 'jobb@helse-bergen.no',
      applyUrl: 'https://helse-bergen.no/jobb/5678',
      deadline: '2024-05-01'
    },
    {
      id: '24',
      title: 'Sommarläkare',
      location: 'Larvik',
      country: 'Norge',
      period: 'Juni - Augusti 2024',
      salary: '66000 NOK/månad',
      department: 'Medicinska avdelningen',
      description: 'Vi söker läkarstudenter för sommarvikariat inom internmedicin.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Maria Hansen',
      contactEmail: 'jobb@siv.no',
      applyUrl: 'https://siv.no/jobb/9012',
      deadline: '2024-05-10'
    },
    {
      id: '25',
      title: 'Läkarvikarie',
      location: 'Hammerfest',
      country: 'Norge',
      period: 'Juli - Augusti 2024',
      salary: '73000 NOK/månad',
      department: 'Diverse avdelningar',
      description: 'Unik möjlighet att arbeta i Nordnorge med extra lönetillägg.',
      requirements: [
        'Läkarstudent termin 8+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Ole Nilsen',
      contactEmail: 'jobb@finnmarkssykehuset.no',
      applyUrl: 'https://finnmarkssykehuset.no/jobb/1234',
      deadline: '2024-05-20'
    },
    {
      id: '26',
      title: 'Sommarvikarierande läkare',
      location: 'Førde',
      country: 'Norge',
      period: 'Juni - Juli 2024',
      salary: '67000 NOK/månad',
      department: 'Psykiatriska kliniken',
      description: 'Vi erbjuder sommarvikariat inom psykiatri med god handledning.',
      requirements: [
        'Läkarstudent termin 9+',
        'Svenska eller norska kunskaper'
      ],
      contactPerson: 'Dr. Thomas Olsen',
      contactEmail: 'jobb@helse-forde.no',
      applyUrl: 'https://helse-forde.no/jobb/5678',
      deadline: '2024-05-15'
    }
];

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useProfile();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minSalary: '',
    duration: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 25;

  // Get unique locations and durations for the filter dropdowns
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const durations = Array.from(new Set(jobs.map(job => job.period)));

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Handle search submit and scroll
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // First update the search results
    const filtered = jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = !filters.location || job.location === filters.location;
      const salaryNOK = parseInt(job.salary.replace(/[^0-9]/g, ''));
      const salarySEK = Math.round(salaryNOK * 1.05);
      const matchesMinSalary = !filters.minSalary || salarySEK >= parseInt(filters.minSalary);
      const matchesDuration = !filters.duration || job.period === filters.duration;

      return matchesSearch && matchesLocation && matchesMinSalary && matchesDuration;
    });
    setFilteredJobs(filtered);

    // Then scroll after a short delay to ensure the DOM has updated
    setTimeout(() => {
      const jobListingsElement = document.getElementById('job-listings');
      if (jobListingsElement) {
        const headerHeight = 64; // Height of the fixed header
        const targetPosition = jobListingsElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = !filters.location || job.location === filters.location;
      
      // Convert NOK to SEK (approximate conversion)
      const salaryNOK = parseInt(job.salary.replace(/[^0-9]/g, ''));
      const salarySEK = Math.round(salaryNOK * 1.05); // Approximate conversion rate
      const matchesMinSalary = !filters.minSalary || salarySEK >= parseInt(filters.minSalary);
      
      const matchesDuration = !filters.duration || job.period === filters.duration;

      return matchesSearch && matchesLocation && matchesMinSalary && matchesDuration;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, jobs, filters]);

  // Add effect for handling scroll parameter
  useEffect(() => {
    // Check if we should scroll to job listings (either from search or scroll parameter)
    const searchParams = new URLSearchParams(window.location.search);
    const shouldScroll = searchParams.get('scroll') === 'jobs';
    
    if (shouldScroll) {
      const jobListingsElement = document.getElementById('job-listings');
      if (jobListingsElement) {
        const headerHeight = 64; // Height of the fixed header
        const targetPosition = jobListingsElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleJobClick = (jobId: string) => {
    router.push(`/jobb/${jobId}`);
  };

  const handleApplyClick = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };

  // Format date to Swedish format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format salary from NOK to SEK
  const formatSalary = (salaryStr: string) => {
    const salaryNOK = parseInt(salaryStr.replace(/[^0-9]/g, ''));
    const salarySEK = Math.round(salaryNOK * 1.05); // Approximate conversion rate
    return `${salarySEK.toLocaleString('sv-SE')} kr/månad`;
  };

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to job listings when changing page
    const jobListingsElement = document.getElementById('job-listings');
    if (jobListingsElement) {
      const headerHeight = 64;
      const targetPosition = jobListingsElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FF] flex flex-col">
      <Header />
      
      {/* Hero Section with Search */}
      <div className="relative overflow-hidden flex-1" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("/background.jpg")',
            opacity: '1',
            zIndex: 1
          }}
        />
        {/* Gradient Overlay for better text readability and smooth transition */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.2) 60%, #F5F7FF 100%)',
            zIndex: 2
          }}
        />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32" style={{ zIndex: 3 }}>
          <div className="text-center space-y-8">
            <h1 className="text-5xl leading-tight font-bold text-gray-900">
              Hitta ditt nästa
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">
                  sommarjobb i Norge
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100/80 rounded-full"></div>
              </span>
              </h1>
            <p className="mt-8 text-xl text-gray-700 max-w-2xl mx-auto">
              Sök bland lediga sommarjobb för svenska läkarstudenter i Norge
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mt-16 max-w-2xl mx-auto space-y-6 relative z-10">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-14 pr-4 py-5 text-gray-900 border-2 border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-lg transition-colors"
                  placeholder="Sök efter tjänster, sjukhus eller platser..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                    Plats
                  </label>
                  <select
                    id="location"
                    className="w-full px-4 py-3 border-2 text-gray-700 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-base transition-colors hover:border-blue-200"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  >
                    <option value="">Alla platser</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div className="group">
                  <label htmlFor="minSalary" className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                    Lägsta lön
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="minSalary"
                      className="w-full px-4 py-3 pr-12 border-2 text-gray-700 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-base transition-colors hover:border-blue-200"
                      placeholder="T.ex. 50000"
                      value={filters.minSalary}
                      onChange={(e) => setFilters(prev => ({ ...prev, minSalary: e.target.value }))}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">kr</span>
                        </div>
                      </div>
                    </div>
                <div className="group">
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                    Period
                  </label>
                  <select
                    id="duration"
                    className="w-full px-4 py-3 border-2 text-gray-700 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-base transition-colors hover:border-blue-200"
                    value={filters.duration}
                    onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                  >
                    <option value="">Alla perioder</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
              </div>
              </div>
            </div>
          </div>
              </div>
              </div>

      {/* Job Listings */}
      <div className="relative pb-16" style={{ zIndex: 10 }}>
        <div id="job-listings" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Laddar tjänster...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Inga tjänster hittades</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-4 sm:p-6 transition-colors hover:border-blue-200 cursor-pointer"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-lg sm:text-xl">
                            {job.department.charAt(0)}
                      </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 mb-3">
                            <div className="flex items-center">
                              <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                              <span className="truncate">{job.department}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 text-sm">
                              <BriefcaseIcon className="h-4 w-4 mr-1.5" />
                              {job.period}
                            </div>
                            <div className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100 text-sm">
                              {formatSalary(job.salary)}
                            </div>
                            <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100 text-sm">
                              <CalendarIcon className="h-4 w-4 mr-1.5" />
                              Sista ansökningsdag: {formatDate(job.deadline)}
                            </div>
                    </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4 sm:mb-0">
                            {job.description}
                      </p>
                    </div>
                      </div>
                      <div className="flex sm:flex-col gap-3 sm:w-auto w-full">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJobClick(job.id);
                          }}
                          className="flex-1 sm:flex-initial inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          Visa mer
                        </button>
                        <button
                          onClick={(e) => handleApplyClick(e, job)}
                          className="flex-1 sm:flex-initial inline-flex justify-center items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                        >
                          Ansök nu
                        </button>
                      </div>
                  </div>
                </div>
              ))}
            </div>
            
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg border ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      Föregående
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-4 py-2 rounded-lg border ${
                          currentPage === number
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg border ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      Nästa
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
            </div>
          </div>

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />
      )}
      
      <Footer />
    </main>
  );
}
