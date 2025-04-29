import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: `${40 + i * 30}px`,
              bottom: `${10 + i * 12}%`,
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "50%",
              transform: "scaleX(2)",
              animation: `wave ${3 + i * 0.5}s infinite alternate ease-in-out`
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-md"
            style={{
              width: Math.random() * 30 + 10 + "px",
              height: "3px",
              top: Math.random() * 90 + 5 + "%",
              left: Math.random() * 90 + 5 + "%",
              background: "rgba(255, 255, 255, 0.2)",
              animation: `float ${Math.random() * 6 + 5}s infinite ease-in-out`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-30 transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="text-purple-200 mb-4 text-4xl">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 font-medium">{description}</p>
    </div>
  );
};

export default function IntroductionPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative bg-purple-900 text-white overflow-hidden">
      <AnimatedBackground />
      <nav className="relative z-10 flex justify-between items-center py-4 px-6 lg:px-12 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="text-2xl font-bold text-white">
          <span className="text-purple-300">Transkriptor AI</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="py-2 px-4 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white font-medium">
            Login
          </Link>
          <Link to="/register" className="py-2 px-4 rounded-md bg-purple-500 hover:bg-purple-600 transition text-white font-medium">
            Cadastro
          </Link>
        </div>
      </nav>
      <section className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-10 px-6 pt-20 pb-12 lg:px-12 transition-all duration-1000`}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Transformando <span className="text-purple-300">voz</span> em <span className="text-purple-300">texto</span> para todos
            </h1>
            <p className="text-xl mb-8 font-medium">
              O Transkriptor AI é uma ferramenta avançada que transforma áudio em texto com precisão,
              tornando o conteúdo acessível para todos, incluindo recursos de conversão para Braille e outras
              formas de acessibilidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="py-3 px-6 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white font-medium text-lg shadow-lg">
                Começar agora
              </Link>
              <a href="#saiba-mais" className="py-3 px-6 rounded-md bg-purple-500 hover:bg-purple-600 transition text-white font-medium text-lg">
                Saiba mais
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path fill="#9F7AEA" fillOpacity="0.5" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.4,-0.3C88.8,15.6,85,31.2,77.1,45.2C69.2,59.1,57.3,71.4,43.1,77.9C28.9,84.5,14.4,85.4,0.5,84.5C-13.5,83.7,-27,81.1,-39.1,74.9C-51.1,68.6,-61.7,58.8,-70.4,46.6C-79.1,34.4,-85.8,19.9,-87.6,4.5C-89.3,-10.9,-86.2,-27.8,-78.4,-42.2C-70.7,-56.6,-58.3,-68.5,-44.2,-75.8C-30.1,-83,-15.1,-85.6,0.2,-85.9C15.4,-86.3,30.7,-84.4,44.7,-76.4Z" transform="translate(100 100)"/>
              <g transform="translate(40,70)">
                {Array.from({ length: 7 }).map((_, i) => (
                  <path key={i} d={`M0,${30 + (i%3)*5} Q30,${20 + (i%4)*10} 60,${30 + (i%3)*5} T120,${30 + (i%3)*5}`} stroke="white" strokeWidth="2" fill="none" strokeOpacity={0.8 - i*0.1} style={{animation: `pulse ${1 + i*0.3}s infinite alternate ease-in-out`}}/>
                ))}
                <g transform="translate(130,20)">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <rect key={i} x="0" y={i*12} width={60 - i*10} height="5" fill="white" fillOpacity="0.9" rx="2"/>
                  ))}
                </g>
                <circle cx="70" cy="-10" r="15" fill="white" fillOpacity="1"/>
                <path d="M70,-15 a5,5 0 1,1 0,10 a5,5 0 1,1 0,-10 M65,-5 L75,-5 M70,-5 L70,5 M65,0 L75,8 M75,0 L65,8" stroke="#9F7AEA" strokeWidth="2" fill="none"/>
              </g>
            </svg>
          </div>
        </div>
      </section>
      <section id="saiba-mais" className="relative z-10 px-6 py-20 lg:px-12 bg-black bg-opacity-40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-white">O que é um <span className="text-purple-300">Transkriptor AI</span>?</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-30">
              <h3 className="text-2xl font-bold mb-4 text-gray-600">Definição</h3>
              <p className="text-lg text-gray-600">
                Um transcritor é uma ferramenta que converte a fala em texto escrito, permitindo que conteúdo auditivo
                seja transformado em formato textual. O <span className="text-purple-300">Transkriptor AI</span> vai além,
                oferecendo recursos avançados de processamento de linguagem natural e suporte para múltiplos formatos
                de acessibilidade.
              </p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-30">
              <h3 className="text-2xl font-bold mb-4 text-gray-600">Como funciona</h3>
              <p className="text-lg text-gray-600">
                Nosso sistema utiliza algoritmos avançados de reconhecimento de fala para detectar padrões sonoros
                e convertê-los em texto com alta precisão. Após a transcrição, processamos o texto para correções
                automáticas e adaptações para diferentes formatos de acessibilidade, como Braille, texto ampliado,
                e versões simplificadas.
              </p>
            </div>
          </div>
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold mb-6 text-gray-600">Processo de Transcrição</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
              {[{step:"1",icon:"🎤"},{step:"→"},{step:"2",icon:"🧠"},{step:"→"},{step:"3",icon:"📝"},{step:"→"},{step:"4",icon:"♿"}].map((item,index)=>(
                <div key={index} className={`flex flex-col items-center ${item.icon? 'w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-700 flex justify-center':'px-2'}`}>
                  {item.icon && <><div className="text-2xl">{item.icon}</div><div className="text-sm mt-1 text-white">{item.step}</div></>}
                  {!item.icon && <div className="text-2xl text-purple-300">{item.step}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-white">Por que a <span className="text-purple-300">Acessibilidade</span> é importante?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard icon="👂" title="Inclusão Auditiva" description="Pessoas com deficiência auditiva podem acessar conteúdo de áudio através de transcrições precisas e detalhadas."/>
            <FeatureCard icon="👁️" title="Inclusão Visual" description="Conversão para Braille e outros formatos acessíveis permite que pessoas com deficiência visual acessem conteúdo textual."/>
            <FeatureCard icon="🧠" title="Inclusão Cognitiva" description="Textos podem ser simplificados e adaptados para pessoas com diferentes necessidades de processamento de informação."/>
          </div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-white">Estatísticas de Acessibilidade</h3>
            <p className="text-lg text-white max-w-3xl mx-auto mb-8">
              Mais de 1 bilhão de pessoas no mundo vivem com alguma forma de deficiência. Ferramentas de acessibilidade como o Transkriptor AI ajudam a derrubar as barreiras de comunicação e acesso à informação.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[{value:"15%",label:"da população mundial tem alguma deficiência"},{value:"466M",label:"pessoas têm deficiência auditiva"},{value:"285M",label:"pessoas têm deficiência visual"},{value:"75%",label:"dos sites não são totalmente acessíveis"}].map((stat,index)=>(
                <div key={index} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-300">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 px-6 py-20 lg:px-12 bg-black bg-opacity-40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-white">Recursos do <span className="text-purple-300">Transkriptor AI</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[{title:"Transcrição em Tempo Real",description:"Converta áudio em texto instantaneamente, com suporte para várias línguas e sotaques.",icon:"⚡"},{title:"Conversão para Braille",description:"Transforme o texto transcrito em Braille digital para impressão ou exibição em dispositivos.",icon:"📲"},{title:"Resumo Automático",description:"Crie resumos concisos das transcrições para facilitar a compreensão rápida.",icon:"📃"},{title:"Reconhecimento de Falantes",description:"Identifique diferentes falantes em gravações de áudio com múltiplas pessoas.",icon:"👥"},{title:"Legendagem Automática",description:"Crie legendas para vídeos com precisão e sincronização temporal.",icon:"🎬"},{title:"Exportação Versátil",description:"Exporte as transcrições em diversos formatos como TXT, PDF, DOC e formatos acessíveis.",icon:"💾"}].map((feature,index)=>(
              <div key={index} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30 transform transition-transform hover:scale-105">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">Pronto para tornar seu conteúdo acessível?</h2>
          <p className="text-xl mb-10 font-medium text-white">
            Junte-se a milhares de pessoas e organizações que já usam o Transkriptor AI para
derubar barreiras de comunicação e criar um mundo mais inclusivo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="py-3 px-8 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white font-medium text-lg shadow-lg">
              Cadastre-se gratuitamente
            </Link>
            <Link to="/login" className="py-3 px-8 rounded-md bg-purple-500 hover:bg-purple-600 transition text-white font-medium text-lg">
              Fazer login
            </Link>
          </div>
        </div>
      </section>
      <footer className="relative z-10 px-6 py-10 lg:px-12 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-white">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold"><span className="text-purple-300">Transkriptor AI</span></div>
            <p className="text-sm mt-2">© 2025 - Todos os direitos reservados</p>
          </div>
          <div className="flex gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-white">Links rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white hover:text-purple-300 text-sm">Sobre nós</a></li>
                <li><a href="#" className="text-white hover:text-purple-300 text-sm">Recursos</a></li>
                <li><a href="#" className="text-white hover:text-purple-300 text-sm">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white hover:text-purple-300 text-sm">Termos de Uso</a></li>
                <li><a href="#" className="text-white hover:text-purple-300 text-sm">Privacidade</a></li>
                <li><a href="#" className="text-white hover:text-purple-300 text-sm">Acessibilidade</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <style>{`@keyframes wave {0% {transform: scaleX(2) translateY(0);}100% {transform: scaleX(2) translateY(-20px);}}@keyframes float {0%,100% {transform: translateY(0) translateX(0) rotate(0deg);opacity:0.2;}25% {transform: translateY(-15px) translateX(10px) rotate(5deg);opacity:0.3;}50% {transform: translateY(-5px) translateX(20px) rotate(0deg);opacity:0.25;}75% {transform: translateY(15px) translateX(-10px) rotate(-5deg);opacity:0.3;}}@keyframes pulse {0% {opacity:0.3;}100% {opacity:0.8;}}html{scroll-behavior:smooth;}`}</style>
    </div>
  );
}
