'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Integritetspolicy</h1>
              <p className="text-gray-600 mt-2">
                Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
              </p>
            </div>
            
            <div className="prose prose-blue max-w-none text-gray-900">
              <h2>1. Inledning</h2>
              <p>
                På Vårdbasen värnar vi om din personliga integritet och strävar efter att alltid skydda dina personuppgifter på bästa sätt. 
                Denna integritetspolicy förklarar hur vi samlar in och använder dina personuppgifter samt vilka rättigheter du har.
              </p>
              
              <h2>2. Personuppgiftsansvarig</h2>
              <p>
                Vårdbasen AB är personuppgiftsansvarig för behandlingen av dina personuppgifter på denna webbplats.
              </p>
              
              <h2>3. Vilka personuppgifter vi samlar in</h2>
              <p>
                Vi samlar in följande typer av personuppgifter:
              </p>
              <ul>
                <li>Kontaktuppgifter (namn, e-post, telefonnummer)</li>
                <li>Profilinformation (utbildning, arbetslivserfarenhet)</li>
                <li>Tekniska uppgifter (IP-adress, enhetsinformation)</li>
                <li>Användaraktivitet (jobbsökningar, ansökningar)</li>
              </ul>
              
              <h2>4. Hur vi använder dina personuppgifter</h2>
              <p>
                Vi använder dina personuppgifter för att:
              </p>
              <ul>
                <li>Tillhandahålla och förbättra våra tjänster</li>
                <li>Matcha läkarstudenter med potentiella arbetsgivare</li>
                <li>Kommunicera med dig om våra tjänster</li>
                <li>Förhindra missbruk av våra tjänster</li>
              </ul>
              
              <h2>5. Laglig grund för behandling</h2>
              <p>
                Vi behandlar dina personuppgifter med stöd av följande rättsliga grunder:
              </p>
              <ul>
                <li>Fullgörande av avtal när du registrerar ett konto</li>
                <li>Berättigat intresse för att förbättra vår tjänst</li>
                <li>Ditt samtycke när detta specifikt efterfrågas</li>
              </ul>
              
              <h2>6. Lagring av personuppgifter</h2>
              <p>
                Vi behåller dina personuppgifter endast så länge som det är nödvändigt för att uppfylla ändamålen för 
                vilka de samlades in, eller enligt vad som krävs enligt lag.
              </p>
              
              <h2>7. Delning av personuppgifter</h2>
              <p>
                Vi kan dela dina personuppgifter med:
              </p>
              <ul>
                <li>Arbetsgivare som du ansöker till jobb hos</li>
                <li>Tjänsteleverantörer som hjälper oss driva vår plattform</li>
                <li>Myndigheter när det krävs enligt lag</li>
              </ul>
              
              <h2>8. Dina rättigheter</h2>
              <p>
                Enligt dataskyddslagstiftningen har du flera rättigheter:
              </p>
              <ul>
                <li>Rätt till tillgång till dina personuppgifter</li>
                <li>Rätt till rättelse av felaktiga uppgifter</li>
                <li>Rätt till radering ("rätten att bli bortglömd")</li>
                <li>Rätt till begränsning av behandling</li>
                <li>Rätt att göra invändningar mot viss typ av behandling</li>
                <li>Rätt till dataportabilitet</li>
              </ul>
              
              <h2>9. Cookies</h2>
              <p>
                Vi använder cookies för att förbättra din upplevelse. Mer information finns i vår cookiepolicy.
              </p>
              
              <h2>10. Ändringar i integritetspolicyn</h2>
              <p>
                Vi kan komma att uppdatera denna integritetspolicy. Den senaste versionen finns alltid tillgänglig på vår webbplats.
              </p>
              
              <h2>11. Kontakt</h2>
              <p>
                Om du har frågor om hur vi behandlar dina personuppgifter, vänligen kontakta oss på dataskydd@Vårdbasen.se
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 