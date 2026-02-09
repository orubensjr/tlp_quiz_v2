import { Trophy, Star, RefreshCw, Share2, MessageCircle, Linkedin, Instagram } from 'lucide-react';
import { profiles } from '@/app/components/Quiz';
import { useState } from 'react';

interface QuizResultProps {
  profileScores: { [key: string]: number };
  onRestart: () => void;
}

export function QuizResult({ profileScores, onRestart }: QuizResultProps) {
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  // Encontrar o perfil com maior pontuação
  const sortedProfiles = Object.entries(profileScores)
    .sort(([, a], [, b]) => b - a)
    .map(([profileId]) => profiles.find((p) => p.id === profileId)!)
    .filter(Boolean);

  const mainProfile = sortedProfiles[0];
  const secondaryProfiles = sortedProfiles.slice(1, 3);

  // Calcular porcentagem do perfil principal
  const totalScore = Object.values(profileScores).reduce((acc, score) => acc + score, 0);
  const mainPercentage = Math.round((profileScores[mainProfile.id] / totalScore) * 100);

  // Texto para compartilhamento
  const shareText = `Acabei de descobrir meu perfil profissional! 🎯\n\n✨ Perfil Principal: ${mainProfile.name} (${mainPercentage}%)\n${mainProfile.description}\n\nFaça você também o quiz de perfil profissional!`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const handleInstagramShare = () => {
    setShowInstagramModal(true);
  };

  const copyToClipboard = () => {
    // Método alternativo usando textarea temporário
    const textArea = document.createElement('textarea');
    textArea.value = shareText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      textArea.remove();
      alert('Texto copiado! Cole no Instagram para compartilhar seu resultado 📋✨');
      setShowInstagramModal(false);
    } catch (err) {
      textArea.remove();
      // Se falhar, mantém o modal aberto para cópia manual
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header com ícone */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
            <Trophy className="size-10 text-white" />
          </div>
          <h1 className="mb-2">Seu Perfil Profissional</h1>
          <p className="text-muted-foreground">
            Descubra suas principais características e pontos fortes
          </p>
        </div>

        {/* Perfil Principal */}
        <div
          className="rounded-2xl overflow-hidden mb-6 text-white relative"
          style={{ backgroundColor: mainProfile.color }}
        >
          {/* Imagem de fundo */}
          <div className="absolute inset-0">
            <img 
              src={mainProfile.image} 
              alt={mainProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay gradient sutil para legibilidade do texto */}
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(135deg, ${mainProfile.color}66 0%, ${mainProfile.color}44 50%, ${mainProfile.color}77 100%)`
            }}
          />
          
          <div className="relative p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="size-6 drop-shadow-lg" fill="currentColor" />
                  <h2 className="text-white drop-shadow-lg">Perfil Principal</h2>
                </div>
                <h1 className="text-white mb-2 drop-shadow-lg">{mainProfile.name}</h1>
                <p className="text-white/95 text-lg drop-shadow-lg">{mainProfile.description}</p>
              </div>
              <div className="bg-white/25 rounded-xl px-4 py-2 backdrop-blur-md shadow-lg">
                <div className="text-3xl font-bold text-white drop-shadow-lg">{mainPercentage}%</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-white mb-3 drop-shadow-lg">Características Principais:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mainProfile.characteristics.map((characteristic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-md shadow-md"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-white drop-shadow">{characteristic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Perfis Secundários */}
        {secondaryProfiles.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4">Perfis Complementares</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondaryProfiles.map((profile) => {
                const percentage = Math.round((profileScores[profile.id] / totalScore) * 100);
                return (
                  <div
                    key={profile.id}
                    className="border-2 rounded-xl overflow-hidden"
                    style={{ borderColor: profile.color }}
                  >
                    {/* Imagem do perfil */}
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={profile.image} 
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundColor: profile.color }}
                      />
                      {/* Badge de porcentagem sobre a imagem */}
                      <div className="absolute top-3 right-3">
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                          style={{ backgroundColor: `${profile.color}`, color: 'white' }}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="p-4">
                      <h4 style={{ color: profile.color }} className="mb-2">{profile.name}</h4>
                      <p className="text-muted-foreground text-sm">{profile.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Todos os Perfis - Pontuação Detalhada */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="mb-4">Distribuição de Perfis</h3>
          <div className="space-y-3">
            {sortedProfiles.map((profile) => {
              const score = profileScores[profile.id];
              const percentage = Math.round((score / totalScore) * 100);
              return (
                <div key={profile.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm" style={{ color: profile.color }}>
                      {profile.name}
                    </span>
                    <span className="text-sm text-muted-foreground">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: profile.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compartilhar Resultado */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="size-5 text-purple-600" />
            <h3 className="text-purple-900">Compartilhe seu resultado</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Mostre para seus colegas e amigos qual é o seu perfil profissional!
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-all"
            >
              <MessageCircle className="size-5" />
              WhatsApp
            </button>
            <button
              onClick={handleLinkedInShare}
              className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-all"
            >
              <Linkedin className="size-5" />
              LinkedIn
            </button>
            <button
              onClick={handleInstagramShare}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F56040] text-white rounded-lg hover:opacity-90 transition-all"
            >
              <Instagram className="size-5" />
              Instagram
            </button>
          </div>
        </div>

        {/* Botão Refazer */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            <RefreshCw className="size-5" />
            Refazer Quiz
          </button>
        </div>
      </div>

      {/* Modal para Instagram */}
      {showInstagramModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Compartilhar no Instagram</h3>
            <p className="text-sm text-gray-500 mb-4">
              Copie o texto abaixo e cole no Instagram para compartilhar seu resultado:
            </p>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-lg mb-4"
              value={shareText}
              readOnly
            />
            <div className="flex justify-end">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F56040] text-white rounded-lg hover:opacity-90 transition-all"
              >
                Copiar Texto
              </button>
              <button
                onClick={() => setShowInstagramModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all ml-2"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}