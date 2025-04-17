'use client'
import { useBlog } from "@/hooks/useBlog";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {

    const { lastPost, visiblePosts, hasMore, loadMore, hasLess, loadLess } = useBlog()

    return (
        <main className="min-h-screen bg-white text-black">
            <nav className="bg-[#0168EC] flex justify-center gap-20 text-white items-center h-[142px]">
                <a href="/" className="text-white font-bold text-2xl">
                    <Image src="/logo.svg" alt="Shekinah" width={180} height={45} className="mb-6" />
                </a>
                <a href="/blog">
                    <h2 className="text-4xl font-bold">NOSSO BLOG</h2>
                </a>
            </nav>

            <section className="bg-[#F4F0F8] h-[733px] md:px-0 px-4">
                <div className="container mx-auto flex md:flex-nowrap flex-wrap justify-between items-center h-full">
                    <div className="flex flex-col gap-10">
                        <h2 className="text-[#0168EC] text-5xl font-bold">Última postagem</h2>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-semibold capitalize">{lastPost?.title}</h1>
                            <p className="text-sm font-normal">{lastPost?.description}</p>
                        </div>
                        <a href={`/blog/${lastPost?.id}`} className="flex self-start cursor-pointer bg-[#0168ec] text-white px-12 py-6 rounded-md font-medium hover:bg-blue-700 transition-colors">
                            QUERO LER
                        </a>
                    </div>
                    {lastPost?.image && <Image src={lastPost?.image} alt="Shekinah" width={860} height={630} />}
                </div>
            </section>

            <section className="mx-auto container py-20 space-y-10 md:px-0 px-4">
                <h2 className="font-bold text-[#0168EC] text-5xl">Todas as postagens</h2>

                <hr />

                <div className="flex flex-col items-center">
                    <div className="flex flex-col gap-6">
                        {
                            visiblePosts?.map((post) => (
                                <div key={post?.id} className="flex flex-col md:flex-row gap-4 items-center h-full">
                                    <Image src={post?.image} alt={post?.title} width={490} height={318} />
                                    <div className="flex flex-col justify-between h-full">
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-5xl font-bold capitalize text-[#0168ec]">{post?.title}</h3>
                                            <p className="text-sm font-normal">{post?.description}</p>
                                        </div>
                                        <Link href={`/blog/${post?.id}`} className="flex self-start cursor-pointer text-[#0168ec] underline rounded-md font-medium hover:text-blue-700 transition-colors">
                                            QUERO LER
                                        </Link>
                                    </div>
                                </div>
                            ))}


                        <div className="flex gap-4">
                            {hasMore && (
                                <button onClick={loadMore} className="bg-[#0168ec] text-white px-12 py-6 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                    Próximo
                                </button>
                            )}
                            {hasLess && (
                                <button onClick={loadLess} className="bg-[#0168ec] text-white px-12 py-6 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                    Voltar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

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
                            <h3 className="text-lg font-bold mb-6 text-white">CONHEÇA NOSSAS OUTRAS FROTAS</h3>

                            <div className="flex flex-wrap gap-4">
                                <a href="/" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-[#0168ec] transition-colors">
                                    EXECUTIVO
                                </a>
                                <a href="/populares" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-[#0168ec] transition-colors">
                                    POPULAR
                                </a>
                                <a href="/vans" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-[#0168ec] transition-colors">
                                    VANS
                                </a>
                                <a href="/blindados" className="border text-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-[#0168ec] transition-colors">
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