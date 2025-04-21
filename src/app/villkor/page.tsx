'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-8">
            <div className="mb-8">
              <Link href="/student/registrera?step=2" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                ← Tillbaka till registrering
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Användarvillkor</h1>
              <p className="text-gray-600 mt-2">
                Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
              </p>
            </div>
            
            <div className="prose prose-blue max-w-none text-gray-900">
              <h2>1. Introduktion</h2>
              <p>
                Välkommen till Vårdbasen. Genom att använda vår hemsida och våra tjänster godkänner du dessa användarvillkor. 
                Vänligen läs dem noggrant.
              </p>
              
              <h2>2. Tjänstebeskrivning</h2>
              <p>
                Vårdbasen erbjuder en plattform där läkarstudenter kan hitta sommarjobb och arbetsgivare kan annonsera 
                lediga tjänster inom sjukvårdssektorn.
              </p>
              
              <h2>3. Användarregistrering</h2>
              <p>
                För att använda vissa delar av vår tjänst måste du registrera ett konto. Du är ansvarig för att hålla dina 
                inloggningsuppgifter konfidentiella och för all aktivitet som sker under ditt konto.
              </p>
              
              <h2>4. Begränsningar</h2>
              <p>
                Som användare av vår tjänst får du inte:
              </p>
              <ul>
                <li>Bryta mot några lagar eller regleringar</li>
                <li>Publicera falsk eller vilseledande information</li>
                <li>Utge dig för att vara någon annan</li>
                <li>Försöka få obehörig åtkomst till plattformen</li>
              </ul>
              
              <h2>5. Användardata</h2>
              <p>
                Vi samlar in och behandlar personuppgifter i enlighet med vår <Link href="/integritet" className="text-blue-600 hover:text-blue-800">integritetspolicy</Link>.
              </p>
              
              <h2>6. Ändringar av villkor</h2>
              <p>
                Vi förbehåller oss rätten att ändra dessa villkor när som helst. Fortsatt användning av tjänsten efter 
                sådana ändringar utgör ditt samtycke till de nya villkoren.
              </p>
              
              <h2>7. Ansvarsbegränsning</h2>
              <p>
                Vårdbasen tillhandahålls "i befintligt skick" utan några garantier, uttryckliga eller underförstådda. 
                Vi ansvarar inte för några skador som uppstår genom din användning av plattformen.
              </p>
              
              <h2>8. Kontakt</h2>
              <p>
                Om du har några frågor om dessa användarvillkor, kontakta oss på info@vardbasen.se
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 