"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Car,
  Users,
  UserCheck,
  Truck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Mail,
  Phone,
  Clock,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react"
import FaqSection from "@/sections/faq"
import { useBanners } from "@/hooks/useBanners.hook"
import { useEffect, useState } from "react"
import { useFleets } from "@/hooks/useFleets.hook"
import { useBlog } from "@/hooks/useBlog"
import WhatsApp from "@/components/whatsapp"
import Head from "next/head"

export default function Home() {
  const banners = useBanners("executivos"); // 🔸 categoria de banner
  const { visiblePosts: posts } = useBlog(); // 🔸 categoria de banner

  const [currentFleet, setCurrentFleet] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(0);

  const [currentCategory, setCurrentCategory] = useState('');
  const { fleets, categories } = useFleets({ type: "executivos", category: currentCategory }); // 🔸 categoria de banner

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // troca a cada 5 segundos
    return () => clearInterval(interval);
  }, [banners]);

  function handleFleetChange(direction: "left" | "right") {
    if (direction === "left") {
      setCurrentFleet((prev) => (prev - 1 + fleets.length) % fleets.length);
    } else {
      setCurrentFleet((prev) => (prev + 1) % fleets.length);
    }
  }

  return (
    <main className="min-h-screen text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-white font-bold text-2xl">
            <Image src="/logo.svg" alt="Shekinah" width={120} height={30} className="object-contain" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/#frota" className="text-white hover:text-[#0168ec] transition-colors ">
              FROTAS DE VEÍCULOS
            </Link>
            <Link href="/#blog" className="text-white hover:text-[#0168ec] transition-colors ">
              BLOG
            </Link>
            <Link href="/#faq" className="text-white hover:text-[#0168ec] transition-colors ">
              FAQ
            </Link>
            <Link href="/#contato" className="text-white hover:text-[#0168ec] transition-colors ">
              CONTATO
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen z-0">
        <div className="absolute inset-0 z-0">
          {banners[currentBanner] && (
            <Image
              unoptimized
              src={banners[currentBanner]}
              alt={`Banner ${currentBanner + 1}`}
              fill
              className="object-cover brightness-50 transition-opacity duration-700 ease-in-out"
              priority
            />
          )}
          {
            !banners.length && (
              <div className="absolute inset-0 z-0">
                <Image
                  unoptimized
                  src="/banners/executivos.png?height=1080&width=1920"
                  alt="Carro Blindado"
                  fill
                  className="object-cover brightness-50"
                  priority
                />
              </div>
            )
          }
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              EXPERIÊNCIA EXECUTIVA
              <br />
              SOBRE RODAS
            </h1>
            <p className="text-lg mb-6">
              ALUGUEL DE CARROS EXECUTIVOS COM SOFISTICAÇÃO, CONFORTO
              <br />
              E PONTUALIDADE PARA SEUS TRAJETOS.
            </p>
            <a href={process.env.NEXT_PUBLIC_WPP} className="cursor-pointer bg-[#0168ec] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              FAÇA UM ORÇAMENTO
            </a>
          </div>
        </div>
        {/* Dots navigation */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentBanner ? "bg-[#0168ec]" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </section>

      {/* Services Bar */}
      <section className="bg-[#0168ec] py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <UserCheck className="mb-2" size={24} />
              <span className="text-sm">MOTORISTAS QUALIFICADOS</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Users className="mb-2" size={24} />
              <span className="text-sm">ATENDIMENTO PERSONALIZADO</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Car className="mb-2" size={24} />
              <span className="text-sm">CARROS BLINDADOS</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Truck className="mb-2" size={24} />
              <span className="text-sm">LOGÍSTICA DE TRANSPORTE</span>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsApp />

      {/* Brands Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">ALGUMAS MARCAS QUE JÁ TRABALHAMOS</h2>
          <div className="flex gap-6 justify-center flex-wrap">
            {["bmw", "alok", "amazon", "brasal", "saga", "gustavo-lima", "jbs", "kia-karnival", "mercedez", "latam", "mcdonalds", "prosegur", "sicoob"].map((brand) => (
              <div key={brand} className="bg-[#151515] p-4 rounded-md flex items-center justify-center w-[100px] h-[100px] sm:w-[200px] sm:h-[100px]">
                <Image
                  src={`/brands/${brand}.svg?height=60&width=200`}
                  alt={`Brand ${brand}`}
                  width={200}
                  height={60}
                  className="w-full h-full opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <h2 className="text-2xl font-bold mb-6 text-[#0168ec]">MAS AFINAL, QUEM SOMOS NÓS?</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                A <span className="font-black">SHEKINAH LOCAÇÃO DE VEÍCULOS</span> É UMA EMPRESA FUNDADA POR BRENDA E LUCAS, ESPECIALIZADA EM ALUGUEL DE
                CARROS E TRANSPORTE EXECUTIVO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Image
                unoptimized
                src="/service.png?height=500&width=770"
                alt="Services"
                width={770}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-6 text-[#0168ec]">QUAIS SERVIÇOS OFERECEMOS?</h2>
              <div className="text-gray-300 space-y-4">
                <p>OFERECEMOS SERVIÇOS DE TRANSPORTE DE NOIVA, VIAGENS, CITY TOUR.</p>
                <p>RECEPÇÃO DE AEROPORTOS COM MOTORISTA ALTAMENTE QUALIFICADO.</p>
                <p>
                  PROPORCIONANDO MAIS COMODIDADE AOS NOSSOS CLIENTES, ALÉM DISSO, TEMOS CARROS BLINDADOS, DISPONÍVEIS
                  PARA O TRANSPORTE DE AUTORIDADES NACIONAIS E INTERNACIONAIS, DIPLOMATAS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6 text-[#0168ec]">
                ESTAMOS LOCALIZADOS EM
                <br />
                BRASÍLIA - DF
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  OFERECEMOS EXPERIÊNCIA EM MOBILIDADE, SERVIÇOS DE QUALIDADE E ATENDIMENTO PERSONALIZADO E INDIVIDUAL,
                  GARANTINDO A SUA SATISFAÇÃO.
                </p>
                <p>
                  TEMOS UMA FROTA MODERNA E EXECUTIVA EM PERFEITO ESTADO PARA OFERECER O MELHOR CONFORTO E SEGURANÇA.
                </p>
              </div>
              <a href={process.env.NEXT_PUBLIC_WPP} className="flex self-start cursor-pointer bg-[#0168ec] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors mt-8">
                FAÇA UM ORÇAMENTO
              </a>
            </div>
            <div>
              <Image
                unoptimized
                src="/location.png?height=500&width=770"
                alt="Location"
                width={770}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="frota" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#0168ec]">FROTAS DE VEÍCULOS</h2>
          {categories && <div className="flex space-x-4 mb-12">
            {categories.map((el, index) => <button onClick={() => setCurrentCategory(el)} className={`cursor-pointer ${(currentCategory == el || (!currentCategory && index == 0)) ? 'bg-[#0168ec]' : 'bg-transparent border-gray-600'} text-white px-6 py-2 rounded-md font-medium uppercase`}>{el}</button>)}
          </div>}

          {/* Vehicle Showcase */}
          <div className="relative">
            <div className="flex justify-between items-start mb-12">
              {/* <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-gray-400 text-sm">SPECS</h4>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500</div>
                  <div className="text-sm text-gray-400">KM</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-gray-400">SEATS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">328</div>
                  <div className="text-sm text-gray-400">HORSE POWER</div>
                </div>
              </div> */}
            </div>

            <div className="relative">
              {/* <div className="text-center -mb-6">
                <h3 className="text-3xl font-medium text-gray-400">{fleets[currentFleet]?.brand || "Mercedez"}</h3>
                <h2 className="text-9xl font-bold">{fleets[currentFleet]?.model || "S580"}</h2>
              </div> */}
              <Image
                priority
                src={fleets[currentFleet]?.image || "/mercedez.png?height=400&width=800"}
                alt="Mercedes S580"
                width={800}
                height={400}
                className="mx-auto object-contain transition-opacity duration-500 opacity-0 animate-fade-in"
              />
              {fleets.length > 1 &&
                <>
                  <Head>
                    <link rel="preload" as="image" href={fleets[currentFleet + 1 > fleets.length - 1 ? 0 : currentFleet + 1]?.image} />
                    <link rel="preload" as="image" href={fleets[currentFleet - 1 < 0 ? fleets.length - 1 : currentFleet - 1]?.image} />
                  </Head>
                  <button onClick={() => handleFleetChange("left")} className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={() => handleFleetChange("right")} className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full">
                    <ChevronRight size={24} />
                  </button>
                </>
              }
            </div>

            <div className="md:grid md:grid-cols-4 gap-4 mb-8 -mt-10 flex overflow-auto">
              {fleets[currentFleet]?.imagesAux?.map((img) => (
                <div key={img} className="border-2 border-white rounded-lg lg:w-full sm:min-w-1/2 min-w-full transition-opacity duration-500 opacity-0 animate-fade-in">
                  <Image
                    src={img}
                    alt={`Interior ${img}`}
                    width={200}
                    height={100}
                    priority
                    className="w-full md:h-[200px] h-50 object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href={process.env.NEXT_PUBLIC_WPP} className="cursor-pointer bg-[#0168ec] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
                QUERO SABER MAIS
                <ArrowRight className="ml-2" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 z-0">
          <Image
            unoptimized
            src="/contact.png?height=800&width=1920"
            alt="Mountain landscape"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                PROFISSIONALISMO, CONFORTO<br />
                E SEGURANÇA
              </h2>
              <p className="text-gray-300 mb-6 uppercase">
                Preencha o formulário e nos conte como podemos te ajudar hoje. Receberemos seu email e o mais rápido possível retornaremos com um orçamento que com toda certeza você irá adorar!
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    className="bg-white text-black px-4 py-2 rounded-md w-full"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="bg-white text-black px-4 py-2 rounded-md w-full"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Telefone"
                    className="bg-white text-black px-4 py-2 rounded-md w-full"
                  />
                  <input
                    type="text"
                    placeholder="Assunto"
                    className="bg-white text-black px-4 py-2 rounded-md w-full"
                  />
                </div>
                <textarea
                  placeholder="Mensagem"
                  rows={4}
                  className="bg-white text-black px-4 py-2 rounded-md w-full"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#0168ec] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors w-full"
                >
                  ENVIAR SOLICITAÇÃO
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-[#0168ec]">NOSSO BLOG</h2>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-[#151515] rounded-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      unoptimized
                      src={post?.image}
                      alt={`Blog post ${post}`}
                      width={500}
                      height={550}
                      className="object-cover sm:w-auto w-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="capitalize text-lg font-bold mb-2">{post?.title}</h3>
                    <p className="text-sm text-gray-400 mb-3" dangerouslySetInnerHTML={{ __html: post?.content.slice(0, 50) + "..." }}></p>
                    <Link href="#" className="text-[#0168ec] text-sm hover:underline">
                      Leia mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full md:-left-6">
              <ChevronLeft size={24} />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full md:-right-6">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#0168ec] border border-[#0168ec] px-6 py-2 rounded-md hover:bg-[#0168ec] hover:text-white transition-colors"
            >
              VER TODAS AS POSTAGENS
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicle Categories Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-12 text-center text-[#0168ec]">OUTRAS CATEGORIAS DE VEÍCULOS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <a href="/populares" className="transition-all hover:scale-105 bg-[#151515] rounded-lg overflow-hidden sm:w-[380px]">
              <div className="relative">
                <Image
                  unoptimized
                  src="/categories/populares.png?height=300&width=400"
                  alt="Carros Populares"
                  width={380}
                  height={300}
                  className="object-cover sm:w-auto w-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-center">Carros Populares</h3>
                <p className="text-sm text-gray-400 text-center">
                  Clique e saiba mais sobre a categoria de carros populares disponíveis em nosso modelo.
                </p>
              </div>
            </a>

            <a href="/blindados" className="transition-all hover:scale-105 bg-[#151515] rounded-lg overflow-hidden sm:w-[380px]">
              <div className="relative">
                <Image
                  unoptimized
                  src="/categories/blindados.png?height=300&width=400"
                  alt="Carros Blindados"
                  width={380}
                  height={300}
                  className="object-cover sm:w-auto w-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-center">Carros Blindados</h3>
                <p className="text-sm text-gray-400 text-center">
                  Clique e saiba mais sobre a categoria de carros blindados disponíveis em nosso modelo.
                </p>
              </div>
            </a>

            <a href="/vans" className="transition-all hover:scale-105 bg-[#151515] rounded-lg overflow-hidden sm:w-[380px]">
              <div className="relative">
                <Image
                  unoptimized
                  src="/categories/vans.png?height=300&width=400"
                  alt="Vans"
                  width={380}
                  height={300}
                  className="object-cover sm:w-auto w-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-center">Vans</h3>
                <p className="text-sm text-gray-400 text-center">
                  Clique e saiba mais sobre a categoria de vans disponíveis em nosso modelo.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 ">
        <FaqSection />
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="text-[#0168ec] mb-4">ENTRE EM CONTATO</div>
              <h2 className="text-2xl font-bold mb-8">CONTATE-NOS</h2>

              <p className="text-gray-300 mb-8">
                SE PRECISAR DE UMA CONSULTA CONOSCO, VOCÊ PODE ESCREVER UMA MENSAGEM OU NOS LIGAR, RESPONDEREMOS O MAIS
                RÁPIDO POSSÍVEL.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-transparent p-2 mr-4">
                    <Mail className="text-[#0168ec]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p>contato@shekinahlocacoes.com.br</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-transparent p-2 mr-4">
                    <Phone className="text-[#0168ec]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Telefone</p>
                    <p>+55 61 9 8454.1625</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-transparent p-2 mr-4">
                    <Clock className="text-[#0168ec]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Horário</p>
                    <p>Everyday : 08:00-21:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-transparent p-2 mr-4">
                    <MapPin className="text-[#0168ec]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Endereço</p>
                    <p>Setor Hoteleiro Sul, Q 02, Bloco F, Loja 07/08 - Asa Sul, Brasília - DF</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Link href="#" className="bg-[#151515] p-2 rounded-md hover:bg-[#0168ec] transition-colors">
                  <Linkedin size={20} />
                </Link>
                <Link href="#" className="bg-[#151515] p-2 rounded-md hover:bg-[#0168ec] transition-colors">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="bg-[#151515] p-2 rounded-md hover:bg-[#0168ec] transition-colors">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="bg-[#151515] p-2 rounded-md hover:bg-[#0168ec] transition-colors">
                  <Instagram size={20} />
                </Link>
              </div>
            </div>

            <div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative", paddingBottom: "75%", height: 0, overflow: "hidden" }}>
                  <iframe
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                    loading="lazy" allowFullScreen src="https://maps.google.com/maps?q=Shekinah+loca%C3%A7%C3%A3o&z=16&output=embed">
                  </iframe>
                </div>
                <a href="https://mapembeds.com/" rel="noopener" target="_blank"
                  style={{
                    position: "absolute", width: 1, height: 1, padding: 0,
                    margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap", border: 0
                  }}
                >
                  embed google maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="border-t border-[#0168ec] mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <a href="/" className="text-white font-bold text-2xl">
                <Image src="/logo.svg" alt="Shekinah" width={180} height={45} className="object-contain mb-6" />
              </a>

              <h3 className="text-lg font-bold mb-4">FALE CONOSCO</h3>

              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <Phone className="mr-2" size={16} />
                  <span>+55 (61) 98454-1625</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2" size={16} />
                  <span>contato@shekinahlocacoes.com.br</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-2 mt-1" size={16} />
                  <span>Setor Hoteleiro Sul, Q 02, Bloco F, Loja 07/08 - Asa Sul, Brasília - DF</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-[#0168ec]">CONHEÇA NOSSAS OUTRAS FROTAS</h3>

              <div className="flex flex-wrap gap-4">
                <a href="/" className="bg-[#0168ec] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  EXECUTIVO
                </a>
                <a href="/populares" className="bg-[#151515] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
                  POPULAR
                </a>
                <a href="/vans" className="bg-[#151515] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
                  VANS
                </a>
                <a href="/blindados" className="bg-[#151515] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
                  BLINDADOS
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Shekinah Locação de Veículos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main >
  )
}
