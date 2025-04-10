"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Star,
    Twitter,
    PhoneIcon as WhatsApp,
} from "lucide-react"

export default function PopularesPage() {
    const [selectedCategory, setSelectedCategory] = useState("POPULAR")

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Hero Section */}
            <section className="bg-white py-8 md:py-16">
                <div className="flex flex-col md:flex-row items-center relative">
                    <div className="container mx-auto px-4 w-full h-[600px]">
                        <div className="mb-8 md:mb-0">
                            <Image src="/logo-azul.svg" alt="Shekinah" width={180} height={45} className="mb-6" />
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Aluguel de carros, <br />
                                sem <span className="text-[#0168ec]">Complicação</span>
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Alugue carros populares com serviço de qualidade <br />e preços acessíveis para seus trajetos.
                            </p>
                            <div className="flex space-x-4">
                                <button className="cursor-pointer bg-[#0168ec] text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                    FAÇA UM ORÇAMENTO
                                </button>
                                <button className="cursor-pointer border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                                    SAIBA MAIS
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-0 top-0">
                        <Image
                            src="/banners/populares.png?height=600&width=800"
                            alt="Carro Popular"
                            width={800}
                            height={600}
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="container mx-auto px-4">

                    {/* Car Categories */}
                    <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
                        {["a", "b", "c", "d", "e"].map((group, index) => (
                            <Image
                                key={index}
                                src={`/grupos/${group}.svg?height=200&width=120`}
                                alt={group}
                                width={200}
                                height={120}
                                className="object-contain"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="relative py-48">
                <div className="absolute inset-0 z-0">
                    <Image
                        unoptimized
                        src="/bg-populares-profissionalismo.png?height=8560&width=1920"
                        alt="Background"
                        fill
                        className="object-cover brightness-50"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                PROFISSIONALISMO, CONFORTO <br />E SEGURANÇA
                            </h2>
                            <p className="text-gray-300 mb-6">
                                PREENCHA O FORMULÁRIO E ENTRAREMOS EM CONTATO COM VOCÊ. TE OFERECEMOS CARROS COM CONFORTO, SEGURANÇA E
                                MOTORISTAS QUE ESTÃO SEMPRE AQUI EM BRASÍLIA.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Data de Retirada</label>
                                        <div className="relative">
                                            <input type="date" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md w-full" />
                                            <Calendar className="absolute right-3 top-2.5 text-gray-500" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Data de Devolução</label>
                                        <div className="relative">
                                            <input type="date" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md w-full" />
                                            <Calendar className="absolute right-3 top-2.5 text-gray-500" size={18} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Retirada</label>
                                        <div className="relative">
                                            <input type="time" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md w-full" />
                                            <Clock className="absolute right-3 top-2.5 text-gray-500" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Devolução</label>
                                        <div className="relative">
                                            <input type="time" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md w-full" />
                                            <Clock className="absolute right-3 top-2.5 text-gray-500" size={18} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria do Veículo</label>
                                    <select className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md w-full">
                                        <option>Popular</option>
                                        <option>Sedan</option>
                                        <option>SUV</option>
                                        <option>Blindado</option>
                                        <option>Van</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="cursor-pointer bg-[#0168ec] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors w-full"
                                >
                                    VERIFICAR DISPONIBILIDADE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fleet Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-2 text-center">CONFIRA NOSSA FROTA</h2>
                    <p className="text-gray-600 mb-8 text-center">Escolha o veículo que melhor atende às suas necessidades</p>

                    {/* Category Tabs */}
                    <div className="flex justify-center mb-8 space-x-4">
                        {["Todos", "Sedans", "Hatch"].map((category) => (
                            <button
                                key={category}
                                className={`cursor-pointer px-6 py-2 rounded-md font-medium ${selectedCategory === category
                                    ? "bg-[#0168ec] text-white"
                                    : "bg-white text-gray-700 border border-gray-300"
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Cars Grid */}
                    <div className="flex justify-center">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: "gol", price: "99.90" },
                                { name: "onix", price: "99.90" },
                                { name: "kwid", price: "89.90" },
                                { name: "ka", price: "79.90" },
                                { name: "clio", price: "79.90" },
                                { name: "uno", price: "79.90" },
                            ].map((car, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md w-[390px]">
                                    <Image src={`/frota-populares/${car.name}.png?height=260&width=390`} alt={car.name} width={390} height={260} className="object-cover" />
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold uppercase">{car.name}</h3>
                                            <div className="text-[#0168ec] font-bold">
                                                R$ {car.price}
                                                <span className="text-xs text-gray-500">/dia</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mb-4">
                                            <div className="flex flex-col items-center">
                                                <Image src="/placeholder.svg?height=24&width=24" alt="Portas" width={24} height={24} />
                                                <span className="text-xs text-gray-500 mt-1">4 Portas</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Image src="/placeholder.svg?height=24&width=24" alt="Ar" width={24} height={24} />
                                                <span className="text-xs text-gray-500 mt-1">Ar</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Image src="/placeholder.svg?height=24&width=24" alt="Pessoas" width={24} height={24} />
                                                <span className="text-xs text-gray-500 mt-1">5 Pessoas</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Image src="/placeholder.svg?height=24&width=24" alt="Malas" width={24} height={24} />
                                                <span className="text-xs text-gray-500 mt-1">2 Malas</span>
                                            </div>
                                        </div>

                                        <button className="cursor-pointer bg-[#0168ec] text-white w-full py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                            RESERVAR AGORA
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <button className="cursor-pointer bg-[#0168ec] text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                            VER TODOS OS VEÍCULOS
                        </button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                                <div key={index} className="bg-[#0168ec] text-white p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                            <Image
                                                src={`/placeholder.svg?height=40&width=40`}
                                                alt={`Cliente ${index}`}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium">Cliente {index}</div>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className="fill-current text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm">
                                        "Excelente serviço! Carros em ótimo estado e atendimento muito profissional. Recomendo!"
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full overflow-hidden">
                                <Image
                                    src="/placeholder.svg?height=200&width=200"
                                    alt="Cliente Destaque"
                                    width={200}
                                    height={200}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-12 text-center">NOSSOS VALORES</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { price: "199", days: "7 dias" },
                            { price: "189", days: "15 dias" },
                            { price: "179", days: "30 dias" },
                            { price: "129", days: "Mensal" },
                            { price: "119", days: "Anual" },
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg overflow-hidden shadow-md ${index === 4 ? "border-t-4 border-[#0168ec]" : ""}`}
                            >
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <span className="text-gray-500 text-sm">A partir de</span>
                                        <div className="text-3xl font-bold">
                                            R$ <span className="text-4xl">{plan.price}</span>
                                            <span className="text-sm text-gray-500">/dia</span>
                                        </div>
                                        <div className="text-[#0168ec] font-medium">{plan.days}</div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-center text-sm">
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Quilometragem livre
                                        </li>
                                        <li className="flex items-center text-sm">
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Seguro incluído
                                        </li>
                                        <li className="flex items-center text-sm">
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Assistência 24h
                                        </li>
                                        <li className="flex items-center text-sm">
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Limpeza incluída
                                        </li>
                                    </ul>

                                    <button className="cursor-pointer bg-[#0168ec] text-white w-full py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                        RESERVAR
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-[#0168ec]">
                                "Mas afinal, quem <br />
                                somos nós?"
                            </h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    A Shekinah Locação de Veículos, fundada por Brenda e Lucas, é uma
                                    empresa especializada em Aluguel de Carros e Transporte Executivo,
                                    com sede em Brasília-DF. Com anos de experiência no mercado,
                                    nossa missão é oferecer serviços de qualidade e um atendimento
                                    personalizado e individual, garantindo a satisfação de nossos
                                    clientes.
                                </p>
                                <p>
                                    Contamos com uma frota moderna, mantida em perfeito estado,
                                    para proporcionar o máximo de conforto e segurança durante o seu
                                    transporte. Nosso compromisso é com a excelência, visando sempre
                                    atender às suas necessidades de forma eficiente e profissional.
                                </p>
                                <p>
                                    Não perca mais tempo e faça sua reserva agora para desfrutar de
                                    um transporte de alto padrão com a Shekinah. Entre em contato
                                    conosco hoje mesmo e descubra a diferença de ser atendido por
                                    uma equipe dedicada e especializada.
                                </p>
                            </div>
                        </div>
                        <Image
                        unoptimized
                            src="/equipe.png?height=456&width=702"
                            alt="Sobre nós 1"
                            width={702}
                            height={456}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Link href="#" className="block bg-[#25D366] p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all">
                    <WhatsApp size={32} color="white" />
                </Link>
            </div>

            {/* Blog Section */}
            <section className="py-16 bg-[#0168EC]">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-12 text-[#0168ec]">NOSSO BLOG</h2>

                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((post) => (
                                <div key={post} className=" rounded-lg overflow-hidden">
                                    <div className="relative">
                                        <Image
                                            unoptimized
                                            src={`/blog/${post}.png?height=300&width=400`}
                                            alt={`Blog post ${post}`}
                                            width={500}
                                            height={550}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4 text-white">
                                        <h3 className="text-lg font-bold mb-2">TÍTULO DO BLOG</h3>
                                        <p className="text-sm mb-3">WITH VEHICLE RECOMMENDATIONS AND ALSO A CHOICE OF TOURIST DESTINATIONS, YOU MAY HAVE TO MAKE THE CONVENIENCE TO LIVE YOUR DREAM NOW</p>
                                        <Link href="#" className="text-[#0168ec] text-sm hover:underline">
                                            Leia mais
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full md:-left-6">
                            <ChevronLeft size={24} />
                        </button>
                        <button className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-[#0168ec] p-2 rounded-full md:-right-6">
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
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-12 text-center text-[#0168ec]">OUTRAS CATEGORIAS DE VEÍCULOS</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        <a href="/populares" className="transition-all hover:scale-105 bg-[#0168EC] text-white rounded-lg overflow-hidden w-[380px]">
                            <div className="relative">
                                <Image
                                    unoptimized
                                    src="/categories/populares.png?height=300&width=400"
                                    alt="Carros Populares"
                                    width={380}
                                    height={300}
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-center">Carros Populares</h3>
                                <p className="text-sm text-center">
                                    Clique e saiba mais sobre a categoria de carros populares disponíveis em nosso modelo.
                                </p>
                            </div>
                        </a>

                        <a href="/blindados" className="transition-all hover:scale-105 bg-[#0168EC] text-white rounded-lg overflow-hidden w-[380px]">
                            <div className="relative">
                                <Image
                                    unoptimized
                                    src="/categories/blindados.png?height=300&width=400"
                                    alt="Carros Blindados"
                                    width={380}
                                    height={300}
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-center">Carros Blindados</h3>
                                <p className="text-sm text-center">
                                    Clique e saiba mais sobre a categoria de carros blindados disponíveis em nosso modelo.
                                </p>
                            </div>
                        </a>

                        <a href="/vans" className="transition-all hover:scale-105 bg-[#0168EC] text-white rounded-lg overflow-hidden w-[380px]">
                            <div className="relative">
                                <Image
                                    unoptimized
                                    src="/categories/vans.png?height=300&width=400"
                                    alt="Vans"
                                    width={380}
                                    height={300}
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-center">Vans</h3>
                                <p className="text-sm text-center">
                                    Clique e saiba mais sobre a categoria de vans disponíveis em nosso modelo.
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <div className="text-[#0168ec] mb-4">ENTRE EM CONTATO</div>
                            <h2 className="text-2xl font-bold mb-8">CONTATE-NOS</h2>

                            <p className="text-black mb-8">
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
                                <Link href="#" className="bg-transparent border p-2 rounded-md hover:bg-[#0168ec] transition-colors">
                                    <Linkedin size={20} />
                                </Link>
                                <Link href="#" className="bg-transparent border p-2 rounded-md hover:bg-[#0168ec] transition-colors">
                                    <Twitter size={20} />
                                </Link>
                                <Link href="#" className="bg-transparent border p-2 rounded-md hover:bg-[#0168ec] transition-colors">
                                    <Facebook size={20} />
                                </Link>
                                <Link href="#" className="bg-transparent border p-2 rounded-md hover:bg-[#0168ec] transition-colors">
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
            <footer className="bg-[#0168EC] pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="border-t border-[#0168ec] mb-16"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-white">
                        <div>
                            <Image src="/logo.svg" alt="Shekinah" width={180} height={45} className="object-contain mb-6" />

                            <h3 className="text-lg font-bold mb-4">FALE CONOSCO</h3>

                            <div className="space-y-3 text-sm ">
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
                                <a href="/" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                    EXECUTIVO
                                </a>
                                <a href="/populares" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
                                    POPULAR
                                </a>
                                <a href="/vans" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
                                    VANS
                                </a>
                                <a href="/blindados" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-[#0168ec] transition-colors">
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
