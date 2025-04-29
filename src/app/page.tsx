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

interface Filters {
  location: string;
  minSalary: string;
  duration: string;
  department: string;
  sort: string;
}

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useProfile();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    minSalary: '',
    duration: '',
    department: '',
    sort: ''
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
    <main className="min-h-screen bg-gray-50">
      <div className="relative">
        <div className="absolute inset-0 h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 z-0" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Hitta ditt nästa sommarjobb inom vården
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10">
              Vi samlar alla sommarjobb inom vården på ett ställe. Sök bland hundratals lediga tjänster och hitta ditt drömjobb idag.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Sök efter jobb..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleSearchSubmit}
                className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 w-full sm:w-auto"
              >
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Sök
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Län</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                >
                  <option value="">Alla län</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yrkesområde</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                >
                  <option value="">Alla områden</option>
                  {jobs.map(job => (
                    <option key={job.department} value={job.department}>{job.department}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  value={filters.duration}
                  onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                >
                  <option value="">Alla perioder</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sortera efter</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                  value={filters.sort}
                  onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                >
                  <option value="">Senast publicerad</option>
                  <option value="salary">Högst lön</option>
                  <option value="deadline">Sista ansökningsdag</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {currentJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobb/${job.id}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <span className="text-sm font-semibold">{job.department.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{job.title}</h2>
                        <p className="text-sm text-gray-500 mb-2">{job.department}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                        {job.period}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700">
                        {job.salary}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-orange-50 text-orange-700">
                        {job.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="min-w-[120px] px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Läs mer
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyClick(e, job);
                        }}
                        className="min-w-[120px] px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Ansök nu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
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
