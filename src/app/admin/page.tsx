"use client"
import { useEffect, useState } from "react";
import { ref, onValue, push, remove, get, update, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Label } from "@/components/label";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/components/loader";
import BlogSection from "./blog.section";
import Image from "next/image";

const categories = [{ label: "executivos", color: "#BE9C71" }, { label: "vans", color: "#F0F0F0" }, { label: "populares", color: "#0168EC" }, { label: "blindados", color: "#252525" }];
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 1MB

export default function AdminDashboard() {
    const [banners, setBanners] = useState({});
    const [newBanners, setNewBanners] = useState({});
    const [fleet, setFleet] = useState({});
    const [newFleet, setNewFleet] = useState({});
    const [blogPosts, setBlogPosts] = useState([]);
    const [newPost, setNewPost] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchCategory, setSearchCategory] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [showAddBanner, setShowAddBanner] = useState(false);
    const [showAddFleet, setShowAddFleet] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        categories.forEach((category) => {
            const bannersRef = ref(db, `banners/${category.label}`);
            onValue(bannersRef, (snapshot) => {
                const data = snapshot.val() || {};
                setBanners((prev) => ({ ...prev, [category.label]: Object.entries(data).map(([id, val]: [id: any, val: any]) => ({ id, ...val })) }));
            });

            const fleetRef = ref(db, `fleet/${category.label}`);
            onValue(fleetRef, (snapshot) => {
                const data = snapshot.val() || {};
                setFleet((prev) => ({ ...prev, [category.label]: Object.entries(data).map(([id, val]: [id: any, val: any]) => ({ id, ...val })) }));
            });
        });

        const postsRef = ref(db, "blogPosts");
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val() || {};
            setBlogPosts(Object.entries(data).map(([id, val]: [id: any, val: any]) => ({ id, ...val })));
        });
    }, [user]);

    const handleUploadBanner = async (category) => {
        setLoading(true)
        try {
            if (!newBanners[category.label]) return;
            const file = newBanners[category.label];
            const storageReference = storageRef(storage, `banners/${category.label}/${file.name}`);
            await uploadBytes(storageReference, file);
            const url = await getDownloadURL(storageReference);
            await push(ref(db, `banners/${category.label}`), { url });
            toast.success("Banner adicionado com sucesso!");
            setNewBanners((prev) => ({ ...prev, [category.label]: null }));
        } catch (err) {
            toast.error("Erro ao adicionar banner");
        } finally {
            setLoading(false)
            setShowAddBanner(false)
        }
    };

    function handleEditFleet(category: string, id: string) {
        const fleetToEdit = fleet[category].find(el => el.id == id)
        console.log(fleetToEdit)
        setNewFleet({ [category]: fleetToEdit })
        setShowAddFleet(true)
    }

    async function handleUpdateFleet(categoryLabel: string) {
        setLoading(true)
        try {
            const fleetData = newFleet[categoryLabel];
            if (!fleetData?.image || !fleetData?.imagesAux) return;

            let url
            if (typeof fleetData.image != 'string') {
                const storageReference = storageRef(storage, `fleet/${categoryLabel}/${generateUniqueImageId(fleetData.image)}`);
                await uploadBytes(storageReference, fleetData.image);
                url = await getDownloadURL(storageReference);
            } else {
                url = fleetData.image
            }

            const auxUrls = await Promise.all(fleetData?.imagesAux?.map(async el => {
                if (typeof el != 'string') {
                    const storageReference = storageRef(storage, `fleet/${categoryLabel}/${generateUniqueImageId(el)}`);
                    await uploadBytes(storageReference, el, { cacheControl: 'public,max-age=31536000' });
                    return await getDownloadURL(storageReference);
                } return el
            }))

            await set(ref(db, `fleet/${categoryLabel}/${fleetData.id}`), {
                brand: fleetData?.brand,
                model: fleetData?.model,
                description: fleetData?.description || "",
                image: url,
                category: fleetData?.category,
                imagesAux: auxUrls
            });
            toast.success("Veículo alterado com sucesso!");
            setShowAddFleet(false)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    function generateUniqueImageId(file: File): string {
        const extension = file.name.split('.').pop(); // pega extensão original
        const uniqueId = crypto.randomUUID(); // gera id único
        return `${uniqueId}.${extension}`; // ex: 72fa56dc-3e9b-4b15-b0f0-68e1b8fd13ef.jpg
    }

    const handleAddFleet = async (category) => {
        setLoading(true)
        try {
            const fleetData = newFleet[category.label];
            if (!fleetData?.image || !fleetData?.imagesAux) return;
            const storageReference = storageRef(storage, `fleet/${category.label}/${fleetData.image.name}`);
            await uploadBytes(storageReference, fleetData.image);
            const url = await getDownloadURL(storageReference);

            const auxUrls = await Promise.all(fleetData?.imagesAux?.map(async el => {
                const storageReference = storageRef(storage, `fleet/${category.label}/${generateUniqueImageId(el)}`);
                await uploadBytes(storageReference, el, { cacheControl: 'public,max-age=31536000' });
                const url = await getDownloadURL(storageReference);
                return url
            }))

            await push(ref(db, `fleet/${category.label}`), {
                brand: fleetData?.brand,
                model: fleetData?.model,
                description: fleetData?.description || "",
                image: url,
                category: fleetData?.category,
                imagesAux: auxUrls
            });
            toast.success("Veículo adicionado com sucesso!");
            setNewFleet((prev) => ({ ...prev, [category.label]: { brand: "", model: "", description: "", image: null, category: '' } }));
        } catch (err) {
            toast.error("Erro ao adicionar veículo")
        } finally {
            setLoading(false)
            setShowAddFleet(false)
        }
    }

    const handleAddPost = async (data: any) => {
        setLoading(true)
        try {
            if (!data?.image) return;
            const storageReference = storageRef(storage, `blog/${data.image.name}`);
            await uploadBytes(storageReference, data.image);
            const url = await getDownloadURL(storageReference);
            await push(ref(db, "blogPosts"), {
                title: data.title,
                content: data.content,
                description: data.description,
                image: url,
                createdAt: new Date().toISOString(),
            });
            setNewPost({ title: "", content: "" });
        } catch (err) {
            toast.error("Erro ao adicionar post")
        } finally {
            setLoading(false)
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (err) {
            alert("Erro ao fazer login. Verifique seu email e senha.");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    const getPreviewUrl = (file) => file ? URL.createObjectURL(file) : null;

    const handleFileSelect = (file, setter) => {
        if (file && file.size > MAX_FILE_SIZE) {
            alert(`Arquivo muito grande. Máximo permitido: ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }
        setter(file);
    };

    const [hoveredBanner, setHoveredBanner] = useState<string | null>(null);
    const [hoveredFleet, setHoveredFleet] = useState<string | null>(null);

    const handleDeleteBanner = async (categoryLabel: string, bannerId: string, imageUrl: string) => {
        setLoading(true)
        try {
            // Remover do storage
            const urlPath = new URL(imageUrl).pathname;
            const storagePath = decodeURIComponent(urlPath.split("/o/")[1]); // preserva as barras
            const storageReference = storageRef(storage, storagePath);

            await deleteObject(storageReference);

            // Remover do database
            const bannerRef = ref(db, `/banners/${categoryLabel}/${bannerId}`);
            await remove(bannerRef);

            console.log("Banner removido com sucesso");
        } catch (err) {
            console.error("Erro ao remover banner:", err);
        } finally {
            setLoading(false)
        }
    };

    const handleDeleteFleet = async (categoryLabel: string, fleetId: string, imageUrl: string, auxUrls?: string[]) => {
        setLoading(true)
        try {
            // Remover do storage
            const urlPath = new URL(imageUrl).pathname;
            const storagePath = decodeURIComponent(urlPath.split("/o/")[1]); // preserva as barras
            const storageReference = storageRef(storage, storagePath);

            // Remover do database
            const fleetRef = ref(db, `/fleet/${categoryLabel}/${fleetId}`);
            await remove(fleetRef);

            if (auxUrls && auxUrls.length) {
                await Promise.all(auxUrls?.map(async el => {
                    const urlPath = new URL(el).pathname;
                    const storagePath = decodeURIComponent(urlPath.split("/o/")[1]); // preserva as barras
                    const storageReference = storageRef(storage, storagePath);
                    await deleteObject(storageReference);
                }))
            }

            await deleteObject(storageReference);

            console.log("Veículo removido com sucesso");
        } catch (err) {
            console.error("Erro ao remover fleet:", err);
        } finally {
            setLoading(false)
        }
    };

    if (!user) {
        return (
            <div className="max-w-sm mx-auto mt-20 space-y-6 flex justify-center items-center flex-col">
                <h1 className="text-xl font-bold text-center">Login do Admin</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                />

                <Button onClick={handleLogin} className="w-full">
                    Entrar
                </Button>
            </div>
        );
    }

    async function handleRemoveImageAux(image: string | File, categoryLabel: string, fleetId: string) {
        console.log(image, categoryLabel, fleetId)
        if (typeof image == 'string') {
            const urlPath = new URL(image).pathname;
            const storagePath = decodeURIComponent(urlPath.split("/o/")[1]); // preserva as barras

            const storageReference = storageRef(storage, storagePath);
            deleteObject(storageReference);
        }

        const fleetRef = ref(db, `/fleet/${categoryLabel}/${fleetId}/imagesAux`)
        const result = await get(fleetRef)
        const data = result.val().filter(el => el != image)
        await set(fleetRef, data);
    }

    return (
        <main className="p-4 py-10 space-y-20 relative">
            {loading && <Loader />}
            <h1 className="text-4xl font-bold text-center">Admin Shekinah</h1>

            <div className="text-right fixed top-4 right-4">
                <Button className="bg-red-500 hover:bg-red-700" onClick={handleLogout}>Sair</Button>
            </div>

            <h2 className="text-3xl text-center mb-10 font-semibold">Páginas</h2>

            <div className="flex  items-center justify-center w-full gap-4">
                {
                    categories.map((el, index) => <span key={index} onClick={() => setActiveTab(index)} className={`cursor-pointer capitalize p-2 w-30 text-center rounded-md transition-all hover:bg-blue-900 hover:border-blue-900 ${index == activeTab ? 'bg-blue-700 border border-blue-700' : 'bg-transparent border border-white'}`}>{el.label}</span>)
                }
            </div>

            <section className="flex gap-10 flex-wrap -mt-10">
                {categories.slice(activeTab, activeTab + 1)?.map((category) => (
                    <div key={category.label} className="space-y-6 px-4 w-full">
                        <div className="flex gap-4">
                            <button onClick={() => setShowAddBanner(true)} className="cursor-pointer p-2 rounded-md bg-fuchsia-800">Novo bannner</button>
                            <button onClick={() => setShowAddFleet(true)} className="cursor-pointer p-2 rounded-md bg-amber-600">Novo veículo</button>
                        </div>
                        {/* Banners */}
                        {showAddBanner && <section className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
                            <div onClick={() => setShowAddBanner(false)} className="absolute h-screen w-screen bg-black opacity-90 top-0 left-0 z-10"></div>
                            <div className="relative z-20 bg-black h-[90%] p-14 overflow-y-auto overflow-x-hidden">
                                <h3 className="text-xl font-semibold mb-2">Novo banner</h3>
                                <div className="flex justify-between">
                                    <Label className="max-w-[240px]" htmlFor={`banner-${category.label}`}>Escolher imagem do banner</Label>
                                    {newBanners[category.label] && <Button disabled={!Boolean(newBanners[category.label])} color={category.color} className="mt-4" onClick={() => handleUploadBanner(category)}>Salvar Banner</Button>}
                                </div>
                                <Input
                                    id={`banner-${category.label}`}
                                    type="file"
                                    hidden
                                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null, (file) =>
                                        setNewBanners((prev) => ({ ...prev, [category.label]: file }))
                                    )}
                                />
                                {newBanners[category.label] && (
                                    <img src={getPreviewUrl(newBanners[category.label])} alt="preview banner" className="max-w-[1000px] my-2" />
                                )}
                            </div>

                            <button
                                onClick={() => setShowAddBanner(false)}
                                className=" cursor-pointer hover:scale-105 transition-all absolute z-20 top-10 left-10 bg-red-600 text-white p-2 rounded-full text-xs flex items-center justify-center shadow hover:bg-red-700"
                            >
                                × Fechar
                            </button>
                        </section>}

                        {/* Frota */}
                        {showAddFleet && <section className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
                            <div onClick={() => setShowAddFleet(false)} className="absolute h-screen w-screen bg-black opacity-90 top-0 left-0 z-10"></div>
                            <div className="relative z-20 bg-black h-[90%] w-1/2 p-14 overflow-y-auto overflow-x-hidden">
                                <div className="flex justify-between mb-4 items-center">
                                    <h3 className="text-xl font-semibold mb-0 p-0">Novo veículo</h3>
                                    <Button disabled={!(Boolean(newFleet[category.label]?.image) && newFleet[category.label]?.brand && newFleet[category.label]?.model)} className="mt-4" color={category.color} onClick={() => {
                                        newFleet[category.label]?.id ? handleUpdateFleet(category.label) : handleAddFleet(category)
                                    }}>{newFleet[category.label]?.id ? 'Editar' : 'Adicionar'} Veículo</Button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="relative">
                                        <Input
                                            placeholder="Categoria"
                                            value={newFleet[category.label]?.category || ""}
                                            onChange={(e) => {
                                                setNewFleet((prev) => ({
                                                    ...prev,
                                                    [category.label]: { ...prev[category.label], category: e.target.value },
                                                }))
                                            }}
                                        />
                                        {Boolean(Array.from(new Set(fleet[category.label]?.map(el => el.category))).length) && <select onChange={(e: any) => {
                                            setNewFleet((prev) => ({
                                                ...prev,
                                                [category.label]: { ...prev[category.label], category: e.target.value },
                                            }))
                                        }} className="border border-white bg-black text-gray-500 flex flex-col gap-1 py-2 w-full">
                                            <option value="">Clique para selecionar categoria</option>
                                            {
                                                Array.from(new Set(fleet[category.label]?.map(el => el.category)))?.map((el: string, index) => <option onClick={() => {

                                                }} value={el} key={index} className="px-2">{el}</option>)
                                            }
                                        </select>}
                                    </div>
                                    <Input
                                        placeholder="Marca"
                                        value={newFleet[category.label]?.brand || ""}
                                        onChange={(e) =>
                                            setNewFleet((prev) => ({
                                                ...prev,
                                                [category.label]: { ...prev[category.label], brand: e.target.value },
                                            }))
                                        }
                                    />
                                    <Input
                                        placeholder="Modelo"
                                        value={newFleet[category.label]?.model || ""}
                                        onChange={(e) =>
                                            setNewFleet((prev) => ({
                                                ...prev,
                                                [category.label]: { ...prev[category.label], model: e.target.value },
                                            }))
                                        }
                                    />
                                    <Input
                                        className="mb-4"
                                        placeholder="Descrição"
                                        value={newFleet[category.label]?.description || ""}
                                        onChange={(e) =>
                                            setNewFleet((prev) => ({
                                                ...prev,
                                                [category.label]: { ...prev[category.label], description: e.target.value },
                                            }))
                                        }
                                    />
                                    <Label htmlFor={`fleet-${category.label}`}>Escolher imagem do veículo</Label>
                                    <Input
                                        id={`fleet-${category.label}`}
                                        hidden
                                        type="file"
                                        onChange={(e) => handleFileSelect(e.target.files?.[0] || null, (file) =>
                                            setNewFleet((prev) => ({
                                                ...prev,
                                                [category.label]: { ...prev[category.label], image: file },
                                            }))
                                        )}
                                    />
                                    {newFleet[category.label]?.image && (
                                        <img src={typeof newFleet[category.label].image == 'string' ? newFleet[category.label].image : getPreviewUrl(newFleet[category.label].image)} alt="preview veículo" className="max-w-[500px] my-2" />
                                    )}
                                    <div className="pt-5">
                                        <Label htmlFor={`fleet-aux-${category.label}`}>Escolher imagens auxiliares</Label>
                                        <Input
                                            id={`fleet-aux-${category.label}`}
                                            hidden
                                            type="file"
                                            onChange={(e) => handleFileSelect(e.target.files?.[0] || null, (file) =>
                                                setNewFleet((prev) => ({
                                                    ...prev,
                                                    [category.label]: { ...prev[category.label], imagesAux: [...(prev[category.label]?.imagesAux || []), file] },
                                                }))
                                            )}
                                        />
                                        <div className="flex gap-2 flex-wrap">
                                            {newFleet[category.label]?.imagesAux?.map((el, index) =>
                                                <div key={index} className="flex gap-2">
                                                    <img src={typeof el == 'string' ? el : getPreviewUrl(el)} alt="preview veículo" className="w-[300px] my-2 object-cover" />
                                                    <button
                                                        onClick={() => handleRemoveImageAux(el, category.label, newFleet[category.label].id)}
                                                        className=" cursor-pointer hover:scale-105 transition-all bg-red-600 text-white rounded-full text-xs flex items-center shadow hover:bg-red-700 self-center p-2"
                                                    >
                                                        × Excluir Imagem
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAddFleet(false)}
                                className=" cursor-pointer hover:scale-105 transition-all absolute z-20 top-10 left-10 bg-red-600 text-white p-2 rounded-full text-xs flex items-center justify-center shadow hover:bg-red-700"
                            >
                                × Fechar
                            </button>
                        </section>}

                        {/* Listagem banner */}
                        <section>
                            <h3 className="text-3xl font-semibold">Banners</h3>
                            <ul className="mt-2 flex gap-2 flex-wrap">
                                {(banners[category.label] || []).map((b) => (
                                    <li
                                        key={b.id}
                                        onMouseEnter={() => setHoveredBanner(b.id)}
                                        onMouseLeave={() => setHoveredBanner(null)}
                                        className="relative group cursor-pointer"
                                    >
                                        <img src={b.url} alt="banner" className="w-[500px] rounded-md" />
                                        {hoveredBanner === b.id && (
                                            <button
                                                onClick={() => handleDeleteBanner(category.label, b.id, b.url)}
                                                className=" cursor-pointer hover:scale-105 transition-all absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center shadow hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Listagem frota */}
                        <section>
                            <h3 className="text-3xl font-semibold">Frota</h3>
                            <ul className="mt-2 flex gap-5 flex-wrap w-full">
                                {(fleet[category.label] || []).map((f) => (
                                    <li
                                        key={f.id}
                                        onMouseEnter={() => setHoveredFleet(f.id)}
                                        onMouseLeave={() => setHoveredFleet(null)}
                                        className="flex flex-col gap-3 relative p-4 border w-full rounded-md lg:w-[32%]">
                                        <img src={f.image} alt="frota" className="w-80" />
                                        <p>Marca:&nbsp;<span className="font-semibold">{f.brand}</span></p>
                                        <p>Modelo:&nbsp;<span className="font-semibold">{f.model}</span></p>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-semibold text-xl">Galeria</h3>
                                            <div className="flex gap-2 flex-wrap">
                                                {f.imagesAux?.map((el, index) =>
                                                    <img key={index} src={el} alt="frota" className="w-40 h-32 object-cover" />
                                                )}
                                            </div>
                                        </div>
                                        <p>{f.description}</p>
                                        {hoveredFleet === f.id && (
                                            <button
                                                onClick={() => handleDeleteFleet(category.label, f.id, f.image, f.imagesAux)}
                                                className=" cursor-pointer hover:scale-105 transition-all absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center shadow hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        )}
                                        {hoveredFleet === f.id && (
                                            <button
                                                onClick={() => handleEditFleet(category.label, f.id)}
                                                className="cursor-pointer hover:scale-105 transition-all absolute bottom-1 right-1 bg-white text-black p-2 rounded-md text-xs flex items-center justify-center shadow hover:bg-amber-50"
                                            >
                                                Editar
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                ))}
            </section>


            {/* Blog */}
            <BlogSection blogPosts={blogPosts} handleAddPost={handleAddPost} />
            <ToastContainer />
        </main>
    );
}
