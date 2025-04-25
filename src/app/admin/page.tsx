"use client"
import { useEffect, useState } from "react";
import { ref, onValue, push, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Label } from "@/components/label";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/components/loader";
import BlogSection from "./blog.section";

const categories = [{ label: "executivos", color: "#BE9C71" }, { label: "vans", color: "#F0F0F0" }, { label: "populares", color: "#0168EC" }, { label: "blindados", color: "#252525" }];
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 1MB

async function convertToWebP(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                        type: "image/webp",
                    });
                    resolve(webpFile);
                }, "image/webp", 0.8);
            };
            img.src = event.target.result as string;
        };
        reader.readAsDataURL(file);
    });
}

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
        }
    };

    const handleAddFleet = async (category) => {
        setLoading(true)
        try {
            const fleetData = newFleet[category.label];
            if (!fleetData?.image) return;
            const storageReference = storageRef(storage, `fleet/${category.label}/${fleetData.image.name}`);
            await uploadBytes(storageReference, fleetData.image);
            const url = await getDownloadURL(storageReference);
            await push(ref(db, `fleet/${category.label}`), {
                brand: fleetData?.brand,
                model: fleetData?.model,
                description: fleetData?.description || "",
                image: url,
                category: fleetData?.category,
            });
            toast.success("Veículo adicionado com sucesso!");
            setNewFleet((prev) => ({ ...prev, [category.label]: { brand: "", model: "", description: "", image: null, category: '' } }));
        } catch (err) {
            toast.error("Erro ao adicionar veículo")
        } finally {
            setLoading(false)
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

    const handleDeleteFleet = async (categoryLabel: string, fleetId: string, imageUrl: string) => {
        setLoading(true)
        try {
            // Remover do storage
            const urlPath = new URL(imageUrl).pathname;
            const storagePath = decodeURIComponent(urlPath.split("/o/")[1]); // preserva as barras
            const storageReference = storageRef(storage, storagePath);

            await deleteObject(storageReference);

            // Remover do database
            const fleetRef = ref(db, `/fleets/${categoryLabel}/${fleetId}`);
            await remove(fleetRef);

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

    return (
        <main className="p-4 py-10 space-y-20 relative">
            {loading && <Loader />}
            <h1 className="text-4xl font-bold text-center">Admin Shekinah</h1>

            <div className="text-right fixed top-4 right-4">
                <Button className="bg-red-500 hover:bg-red-700" onClick={handleLogout}>Sair</Button>
            </div>

            <section className="flex gap-10 xl:flex-nowrap flex-wrap">
                {categories.map((category) => (
                    <div key={category.label} className="space-y-6 border border-gray-300 p-4 rounded-2xl shadow-lg shadow-gray-900 w-[500px]">
                        <h2 className="text-2xl capitalize font-bold" style={{ color: category.color }}>{category.label}</h2>

                        {/* Banners */}
                        <section className="space-y-2">
                            <h3 className="text-xl font-semibold mb-2">Banners</h3>
                            <Label htmlFor={`banner-${category.label}`}>Escolher imagem do banner</Label>
                            <Input
                                id={`banner-${category.label}`}
                                type="file"
                                hidden
                                onChange={(e) => handleFileSelect(e.target.files?.[0] || null, (file) =>
                                    setNewBanners((prev) => ({ ...prev, [category.label]: file }))
                                )}
                            />
                            {newBanners[category.label] && (
                                <img src={getPreviewUrl(newBanners[category.label])} alt="preview banner" className="w-40 my-2" />
                            )}
                            <Button disabled={!Boolean(newBanners[category.label])} color={category.color} className="mt-4" onClick={() => handleUploadBanner(category)}>Salvar Banner</Button>
                            <ul className="mt-2 flex gap-2 flex-wrap">
                                {(banners[category.label] || []).map((b) => (
                                    <li
                                        key={b.id}
                                        onMouseEnter={() => setHoveredBanner(b.id)}
                                        onMouseLeave={() => setHoveredBanner(null)}
                                        className="relative group cursor-pointer"
                                    >
                                        <img src={b.url} alt="banner" className="w-40 rounded-md" />
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

                        {/* Frota */}
                        <section className="space-y-2">
                            <h3 className="text-xl font-semibold mb-2">Frota</h3>
                            <div className="relative">
                                <Input
                                    placeholder="Categoria"
                                    value={newFleet[category.label]?.category || ""}
                                    onChange={(e) => {
                                        setSearchCategory(fleet[category.label]?.filter(el => el.category?.toLowerCase()?.includes(newFleet[category.label]?.category.toLowerCase())))
                                        setNewFleet((prev) => ({
                                            ...prev,
                                            [category.label]: { ...prev[category.label], category: e.target.value },
                                        }))
                                    }}
                                />
                                {Boolean(searchCategory.length) &&<div className="absolute top-10 bg-black text-white flex flex-column">
                                    {
                                        searchCategory?.map(el => <span key={el._id} className="p-2">{el.category}</span>)
                                    }
                                </div>}
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
                                <img src={getPreviewUrl(newFleet[category.label].image)} alt="preview veículo" className="w-40 my-2" />
                            )}
                            <Button disabled={!(Boolean(newFleet[category.label]?.image) && newFleet[category.label]?.brand && newFleet[category.label]?.model)} className="mt-4" color={category.color} onClick={() => handleAddFleet(category)}>Adicionar Veículo</Button>
                            <ul className="mt-2 space-y-2">
                                {(fleet[category.label] || []).map((f) => (
                                    <li
                                        key={f.id}
                                        onMouseEnter={() => setHoveredFleet(f.id)}
                                        onMouseLeave={() => setHoveredFleet(null)}
                                        className="flex gap-2 items-center relative w-fit">
                                        <img src={f.image} alt="frota" className="w-20" />
                                        <div>
                                            <p className="font-semibold">{f.brand}</p>
                                            <p className="font-semibold">{f.model}</p>
                                            <p>{f.description}</p>
                                        </div>
                                        {hoveredFleet === f.id && (
                                            <button
                                                onClick={() => handleDeleteFleet(category.label, f.id, f.url)}
                                                className=" cursor-pointer hover:scale-105 transition-all absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center shadow hover:bg-red-700"
                                            >
                                                ×
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
