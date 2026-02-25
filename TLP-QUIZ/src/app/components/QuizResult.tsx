import { Trophy, RefreshCw, Share2, MessageCircle, Linkedin, Instagram } from 'lucide-react';
import { profiles } from '@/app/components/Quiz';
import { useState } from 'react';

interface QuizResultProps {
  profileId: string;   // Agora recebemos apenas UM perfil final
  onRestart: () => void;
}

export function QuizResult({ profileId, onRestart }: QuizResultProps) {
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  const mainProfile = profiles.find((p) => p.id === profileId);

  if (!mainProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
          <h1 className="mb-4">Ops! Não encontrei o seu perfil.</h1>
          <p className="text-muted-foreground mb-6">
            Tente refazer o quiz.
          </p>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            <RefreshCw className="size-5" />
            Refazer Quiz
          </button>
        </div>
      </div>
    );
  }

  // Texto de compartilhamento (inclui % da população do perfil)
  const shareText =
    `Acabei de descobrir meu perfil! 🎯\n\n` +
    `✨ Perfil: ${mainProfile.name} (${mainProfile.populationPct}% da população)\n` +
    `${mainProfile.description}\n\n` +
    `Faça você também o quiz e descubra o seu perfil!`;

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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
            <Trophy className="size-10 text-white" />
          </div>
          <h1 className="mb-2">Resultado do Quiz</h1>
          <p className="text-muted-foreground">Seu perfil principal</p>
        </div>

        {/* Bloco do Perfil */}
        <div
          className="rounded-2xl overflow-hidden mb-6 text-white relative"
          style={{ backgroundColor: mainProfile.color }}
        >
          {/* Imagem */}
          <div className="absolute inset-0">
            <img
              src={mainProfile.image}
              alt={mainProfile.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay para legibilidade */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${mainProfile.color}66 0%, ${mainProfile.color}99 100%)`,
            }}
          />

          <div className="relative p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-white/95 mb-2 drop-shadow-lg">Perfil Principal</h2>
                <h1 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">
                  {mainProfile.name}
                </h1>
                <p className="text-white/95 text-lg drop-shadow-lg">
                  {mainProfile.description}
                </p>
              </div>

              {/* Badge com % da população (PPT) */}
              <div className="bg-white/25 rounded-xl px-4 py-2 backdrop-blur-md shadow-lg">
                <div className="text-sm font-medium text-white/90">DA POPULAÇÃO</div>
                <div className="text-3xl font-bold text-white drop-shadow-lg">
                  {mainProfile.populationPct}%
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-white mb-3 drop-shadow-lg">Características principais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mainProfile.characteristics.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-md shadow-md"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-white drop-shadow">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compartilhar */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="size-5 text-purple-600" />
            <h3 className="text-purple-900">Compartilhe seu resultado</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Mostre para seus colegas e amigos qual é o seu perfil!
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">Compartilhar no Instagram</h3>
            <p className="text-sm text-gray-500 mb-4">
              Copie o texto abaixo e cole no Instagram para compartilhar seu resultado:
            </p>
            <textarea
              className="w-full h-28 p-2 border border-gray-300 rounded-lg mb-4"
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
``
