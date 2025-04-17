'use client'
import { useBlog } from "@/hooks/useBlog";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

    const params = useParams();
    const id = params?.id;

    const { getPostById } = useBlog();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        if (id) {
            getPostById(id as string).then(setPost);
        }
    }, [id]);


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

            <section className="flex flex-col gap-10 mt-10 ">
                <h1 className="text-center text-5xl text-[#0168EC] capitalize">{post?.title}</h1>

                {post?.image && <Image unoptimized className="w-full max-h-[700px] object-cover" src={post?.image} alt={post?.title + 'imagem'} width={180} height={45} />}

                <div className="flex justify-center md:px-0 px-4">
                    <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
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