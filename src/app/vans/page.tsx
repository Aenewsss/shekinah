"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
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
    Star,
    Users,
    Truck,
    Shield,
    Award,
    Headphones,
    Calendar,
    Map,
    UserCheck,
    Car,
} from "lucide-react"
import { useBanners } from "@/hooks/useBanners.hook"
import { useFleets } from "@/hooks/useFleets.hook"
import { useBlog } from "@/hooks/useBlog"

const testimonials = [
    {
        name: "Pedro Silva",
        rating: 5,
        text: "Serviço excepcional! O carro blindado me deu total segurança durante minha viagem de negócios.",
        image: "/feedbacks/1.png?height=100&width=100",
    },
    {
        name: "Ana Costa",
        rating: 5,
        text: "A blindagem do veículo me deu tranquilidade para viajar com minha família.",
        image: "/feedbacks/3.png?height=100&width=100",
    },

    {
        name: "Mário Oliveira",
        rating: 5,
        text: "Motorista profissional e veículo em perfeito estado. Recomendo!",
        image: "/feedbacks/9.png?height=100&width=100",
    },
    {
        name: "Carlos Mendes",
        rating: 4,
        text: "Excelente atendimento e pontualidade. O carro era muito confortável.",
        image: "/feedbacks/4.png?height=100&width=100",
    },
    {
        name: "Roberto Alves",
        rating: 5,
        text: "Serviço de primeira linha. Motorista educado e veículo impecável.",
        image: "/feedbacks/5.png?height=100&width=100",
    },
    {
        name: "Ana Ferreira",
        rating: 5,
        text: "Utilizei o serviço para uma viagem corporativa e fiquei impressionado com a qualidade e profissionalismo.",
        image: "/feedbacks/3.png?height=100&width=100",
    },
    {
        name: "Juliana Santos",
        rating: 5,
        text: "Me senti muito segura com o carro blindado durante todo o trajeto.",
        image: "/feedbacks/6.png?height=100&width=100",
    },

    {
        name: "Marcos Pereira",
        rating: 5,
        text: "Atendimento personalizado e veículo de luxo com toda segurança necessária.",
        image: "/feedbacks/2.png?height=100&width=100",
    },
    {
        name: "Fernanda Lima",
        rating: 5,
        text: "Experiência incrível! O conforto do veículo blindado superou minhas expectativas.",
        image: "/feedbacks/8.png?height=100&width=100",
    },
]

const features = [
    {
        icon: <Users size={32} className="text-white" />,
        title: "Transporte Executivo",
        description: "Vans de luxo para eventos corporativos e transporte de executivos",
    },
    {
        icon: <Calendar size={32} className="text-white" />,
        title: "Receptivo de Aeroporto",
        description: "Recepção e transporte de passageiros do aeroporto com conforto",
    },
    {
        icon: <Map size={32} className="text-white" />,
        title: "City Tour",
        description: "Conheça os pontos turísticos de Brasília com conforto e segurança",
    },
    {
        icon: <Award size={32} className="text-white" />,
        title: "Eventos Sociais",
        description: "Transporte para casamentos, formaturas e eventos especiais",
    },
    {
        icon: <Truck size={32} className="text-white" />,
        title: "Viagens Interestaduais",
        description: "Viagens para cidades próximas com todo conforto necessário",
    },
    {
        icon: <Shield size={32} className="text-white" />,
        title: "Transporte Corporativo",
        description: "Soluções de transporte para empresas e eventos corporativos",
    },
]

export default function VansPage() {
    const banners = useBanners("vans"); // 🔸 categoria de banner
    const fleets = useFleets("vans"); // 🔸 categoria de banner
    const posts = useBlog(); // 🔸 categoria de banner

    const [currentFleet, setCurrentFleet] = useState(0);
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        if (!banners.length) return;
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000); // troca a cada 5 segundos
        return () => clearInterval(interval);
    }, [banners]);

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
            ))
    }

    function handleFleetChange(direction: "left" | "right") {
        if (direction === "left") {
            setCurrentFleet((prev) => (prev - 1 + fleets.length) % fleets.length);
        } else {
            setCurrentFleet((prev) => (prev + 1) % fleets.length);
        }
    }

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-10">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <a href="/" className="text-white font-bold text-2xl">
                        <Image src="/logo.svg" alt="Shekinah" width={120} height={30} className="object-contain" />
                    </a>
                    <nav className="hidden md:flex space-x-8">
                        <Link href="#frota" className="text-white hover:text-[#0168ec] transition-colors">
                            FROTAS DE VEÍCULOS
                        </Link>
                        <Link href="#blog" className="text-white hover:text-[#0168ec] transition-colors">
                            BLOG
                        </Link>
                        {/* <Link href="#faq" className="text-white hover:text-[#0168ec] transition-colors">
                            FAQ
                        </Link> */}
                        <Link
                            href="#contato"
                            className="text-white hover:text-[#0168ec] transition-colors"
                        >
                            CONTATO
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-screen">
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
                                    src="/banners/vans.png?height=1080&width=1920"
                                    alt="Carro Blindado"
                                    fill
                                    className="object-cover brightness-50"
                                    priority
                                />
                            </div>
                        )
                    }
                </div>
                <div className="relative z-1 container mx-auto px-4 h-full flex flex-col justify-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            TRANSPORTE EXECUTIVO COM
                            <br />
                            VANS DE ALTO PADRÃO
                        </h1>
                        <p className="text-lg mb-6">
                            ALUGUE VANS EXECUTIVAS COM SERVIÇO DE QUALIDADE
                            <br />E MOTORISTAS PARA SEUS TRAJETOS E EVENTOS.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href={process.env.NEXT_PUBLIC_WPP}
                                className="bg-[#0168ec] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                            >
                                FAÇA UM ORÇAMENTO
                            </a>
                            <a href={process.env.NEXT_PUBLIC_WPP} className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
                                CONHEÇA NOSSA FROTA
                            </a>
                        </div>
                    </div>
                </div>

                {/* Feature thumbnails */}
                <div className="absolute md:bottom-8 -bottom-10 left-0 right-0 z-10">
                    <div className="container mx-auto px-4">
                        <div className="sm:grid grid-cols-4 gap-4 max-w-3xl">
                            <div className="bg-black/60 backdrop-blur-sm p-3 rounded-md">
                                <div className="flex items-center mb-2">
                                    <Users className="text-[#0168ec] mr-2" size={20} />
                                    <span className="text-sm font-medium">Motoristas Qualificados</span>
                                </div>
                                <p className="text-xs text-gray-300">Profissionais com experiência e treinamento</p>
                            </div>
                            <div className="bg-black/60 backdrop-blur-sm p-3 rounded-md">
                                <div className="flex items-center mb-2">
                                    <Truck className="text-[#0168ec] mr-2" size={20} />
                                    <span className="text-sm font-medium">Vans Executivas</span>
                                </div>
                                <p className="text-xs text-gray-300">Veículos de luxo com máximo conforto</p>
                            </div>
                            <div className="bg-black/60 backdrop-blur-sm p-3 rounded-md">
                                <div className="flex items-center mb-2">
                                    <Calendar className="text-[#0168ec] mr-2" size={20} />
                                    <span className="text-sm font-medium">Eventos</span>
                                </div>
                                <p className="text-xs text-gray-300">Transporte para eventos corporativos e sociais</p>
                            </div>
                            <div className="bg-black/60 backdrop-blur-sm p-3 rounded-md">
                                <div className="flex items-center mb-2">
                                    <Headphones className="text-[#0168ec] mr-2" size={20} />
                                    <span className="text-sm font-medium">Suporte 24h</span>
                                </div>
                                <p className="text-xs text-gray-300">Assistência completa durante todo o serviço</p>
                            </div>
                        </div>
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

            {/* WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Link href="#" className="block bg-[#25D366] p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5522 2.63234 20.9666 3.76401 23.0742L2.28601 29.714L9.05998 28.2701C11.1146 29.3426 13.4746 30 16 30Z"
                            fill="white"
                        />
                        <path
                            d="M23 20.2C22.7 20.05 21.15 19.3 20.9 19.2C20.6 19.1 20.4 19.05 20.2 19.35C20 19.65 19.4 20.35 19.25 20.55C19.1 20.75 18.9 20.8 18.65 20.65C18.4 20.5 17.35 20.15 16.15 19.1C15.2 18.25 14.55 17.2 14.35 16.95C14.2 16.7 14.3 16.55 14.45 16.4C14.55 16.3 14.7 16.1 14.8 15.95C14.9 15.8 14.95 15.7 15.05 15.5C15.15 15.3 15.1 15.15 15.05 15C15 14.85 14.35 13.3 14.1 12.8C13.85 12.3 13.6 12.4 13.45 12.4C13.3 12.4 13.1 12.35 12.9 12.35C12.7 12.35 12.4 12.4 12.15 12.65C11.9 12.9 11.1 13.65 11.1 15.2C11.1 16.75 12.2 18.25 12.35 18.45C12.5 18.65 14.35 21.45 17.15 22.8C17.85 23.1 18.4 23.3 18.85 23.45C19.55 23.7 20.2 23.65 20.7 23.6C21.25 23.55 22.5 22.9 22.75 22.3C23 21.7 23 21.2 22.95 21.1C22.9 21 22.7 20.95 22.4 20.8C22.1 20.65 22.1 20.65 22.1 20.65C22.1 20.65 23.3 20.35 23 20.2Z"
                            fill="#25D366"
                        />
                    </svg>
                </Link>
            </div>

            {/* Fleet Section */}
            <section id="frota" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-[#0168ec]">FROTAS DE VEÍCULOS</h2>
                    {/* <div className="flex space-x-4 mb-12">
            <button className="cursor-pointer bg-[#0168ec] text-white px-6 py-2 rounded-md font-medium">SEDAN</button>
            <button className="cursor-pointer bg-transparent border border-gray-600 text-white px-6 py-2 rounded-md font-medium">
              SUV
            </button>
            <button className="cursor-pointer bg-transparent border border-gray-600 text-white px-6 py-2 rounded-md font-medium">
              LUXO
            </button>
          </div> */}

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

                        <div className="relative mb-8">
                            <div className="text-center md:-mb-20 -mb-10">
                                <h3 className="md:text-3xl text-2xl font-medium text-gray-400">{fleets[currentFleet]?.brand || "Mercedez"}</h3>
                                <h2 className="md:text-9xl text-7xl font-bold">{fleets[currentFleet]?.model || "Splinter"}</h2>
                            </div>
                            <Image
                                unoptimized
                                src={fleets[currentFleet]?.image || "/mercedez-splinter.png?height=400&width=800"}
                                alt="Mercedes S580"
                                width={800}
                                height={400}
                                className="mx-auto object-contain"
                            />
                            {fleets.length > 1 &&
                                <>
                                    <button onClick={() => handleFleetChange("left")} className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={() => handleFleetChange("right")} className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full">
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            }
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8">
                            {[1, 2, 3, 4].map((img) => (
                                <div key={img} className="border-8 border-white rounded-lg overflow-hidden">
                                    <Image
                                        unoptimized
                                        src={`/interior-mercedez/${img}.png?height=100&width=200`}
                                        alt={`Interior ${img}`}
                                        width={200}
                                        height={100}
                                        className="w-full h-full object-cover"
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
            <section className="py-32 relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        unoptimized
                        src="/profissionalismo-blindados.png?height=800&width=1920"
                        alt="Mountain landscape"
                        fill
                        className="object-cover brightness-50"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">
                                PROFISSIONALISMO, CONFORTO
                                <br />E SEGURANÇA
                            </h2>
                            <p className="text-gray-300 mb-6">
                                PREENCHA O FORMULÁRIO E ENTRAREMOS EM CONTATO COM VOCÊ. TE OFERECEMOS CARROS BLINDADOS COM CONFORTO,
                                SEGURANÇA E MOTORISTAS QUALIFICADOS EM BRASÍLIA.
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

                {/* Service icons */}
                <div className="container mx-auto px-4 mt-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-[#0168ec] p-4 rounded-md text-center">
                            <Shield className="mx-auto mb-2" size={24} />
                            <span className="text-sm">BLINDAGEM NÍVEL III-A</span>
                        </div>
                        <div className="bg-[#0168ec] p-4 rounded-md text-center">
                            <UserCheck className="mx-auto mb-2" size={24} />
                            <span className="text-sm">MOTORISTAS QUALIFICADOS</span>
                        </div>
                        <div className="bg-[#0168ec] p-4 rounded-md text-center">
                            <Car className="mx-auto mb-2" size={24} />
                            <span className="text-sm">VEÍCULOS PREMIUM</span>
                        </div>
                        <div className="bg-[#0168ec] p-4 rounded-md text-center">
                            <Headphones className="mx-auto mb-2" size={24} />
                            <span className="text-sm">SUPORTE 24H</span>
                        </div>
                    </div>
                </div>
            </section>

               {/* Testimonials Section */}
               <section className="py-16 bg-black">
                <div className="container mx-auto px-4">
                    <div className="flex gap-4 md:flex-nowrap flex-wrap">
                        <div className="flex flex-col gap-4 md:w-auto w-full">
                            {testimonials.slice(0, 3).map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={` bg-[#0168ec] h-full p-4 rounded-lg`}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="flex">{renderStars(testimonial.rating)}</div>
                                        <span className="ml-2 text-sm">{testimonial.rating}.0</span>
                                    </div>
                                    <p className="text-sm mb-4">{testimonial.text}</p>
                                    <div className={`flex items-center ${(index === 0) && 'md:flex-col'}`}>
                                        <Image
                                            unoptimized
                                            src={testimonial.image || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            width={40}
                                            height={40}
                                            className={`rounded-full mr-3 ${(index === 0) && 'md:w-full md:h-full'}`}
                                        />
                                        <span className="font-medium">{testimonial.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 md:w-auto w-full">
                            {testimonials.slice(3, 6).map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={` bg-[#0168ec] h-full p-4 rounded-lg`}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="flex">{renderStars(testimonial.rating)}</div>
                                        <span className="ml-2 text-sm">{testimonial.rating}.0</span>
                                    </div>
                                    <p className="text-sm mb-4">{testimonial.text}</p>
                                    <div className={`flex items-center ${(index === 2) && 'md:flex-col'}`}>
                                        <Image
                                            unoptimized
                                            src={testimonial.image || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            width={40}
                                            height={40}
                                            className={`rounded-full mr-3 ${(index === 2) && 'md:w-full md:h-full'}`}
                                        />
                                        <span className="font-medium">{testimonial.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 md:w-auto w-full">
                            {testimonials.slice(6, 9).map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={` bg-[#0168ec] h-full p-4 rounded-lg`}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="flex">{renderStars(testimonial.rating)}</div>
                                        <span className="ml-2 text-sm">{testimonial.rating}.0</span>
                                    </div>
                                    <p className="text-sm mb-4">{testimonial.text}</p>
                                    <div className={`flex items-center ${(index == 1) && 'md:flex-col'}`}>
                                        <Image
                                            unoptimized
                                            src={testimonial.image || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            width={40}
                                            height={40}
                                            className={`rounded-full mr-3 ${(index == 1) && 'md:w-full md:h-full'}`}
                                        />
                                        <span className="font-medium">{testimonial.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-[#0168ec]">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-12 text-center text-white">VENHA CONHECER</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-[#0168ec] inline-flex items-center justify-center p-4 rounded-full border-2 border-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-white/80">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-16 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-12 text-[#0168ec]">NOSSO BLOG</h2>

                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <div key={post} className="bg-[#151515] rounded-lg overflow-hidden">
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
            <section className="py-16 bg-black">
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

            {/* Contact Section */}
            <section id="contato" className="py-16 bg-black">
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
            <footer className="bg-black pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="border-t border-[#0168ec] mb-16"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <Image src="/logo.svg" alt="Shekinah" width={180} height={45} className="object-contain mb-6" />

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
                                <a href="/" className="bg-[#151515] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                    EXECUTIVO
                                </a>
                                <a href="/populares" className="bg-[#151515] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
                                    POPULAR
                                </a>
                                <a href="/vans" className="bg-[#0168ec] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
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
        </main>
    )
}
