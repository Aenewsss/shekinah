"use client"
import { useEffect, useState } from "react";
import { ref, onValue, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { auth, db, storage } from "@/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { Label } from "@/components/label";

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
    const [newPost, setNewPost] = useState({ title: "", content: "" });
    const [user, setUser] = useState(null);

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
        if (!newBanners[category.label]) return;
        const file = newBanners[category.label];
        const storageReference = storageRef(storage, `banners/${category.label}/${file.name}`);
        await uploadBytes(storageReference, file);
        const url = await getDownloadURL(storageReference);
        await push(ref(db, `banners/${category.label}`), { url });
        setNewBanners((prev) => ({ ...prev, [category.label]: null }));
    };

    const handleAddFleet = async (category) => {
        const fleetData = newFleet[category.label];
        if (!fleetData?.image) return;
        const storageReference = storageRef(storage, `fleet/${category.label}/${fleetData.image.name}`);
        await uploadBytes(storageReference, fleetData.image);
        const url = await getDownloadURL(storageReference);
        await push(ref(db, `fleet/${category.label}`), {
            name: fleetData.name,
            description: fleetData.description,
            image: url,
        });
        setNewFleet((prev) => ({ ...prev, [category.label]: { name: "", description: "", image: null } }));
    };

    const handleAddPost = async () => {
        await push(ref(db, "blogPosts"), { title: newPost.title, content: newPost.content });
        setNewPost({ title: "", content: "" });
    };

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider);
        } catch (err) {
            alert("Erro ao fazer login");
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

    if (!user) {
        return (
            <div className="max-w-sm mx-auto mt-20 space-y-4 flex justify-center items-center flex-col">
                <h1 className="text-xl font-bold text-center">Login do Admin</h1>
                <Button onClick={handleLogin}>Entrar com google</Button>
            </div>
        );
    }

    return (
        <main className="p-4 py-10 space-y-20 relative">
            <h1 className="text-4xl font-bold text-center">Admin Shekinah</h1>

            <div className="text-right fixed top-4 right-4">
                <Button className="bg-red-500 hover:bg-red-700" onClick={handleLogout}>Sair</Button>
            </div>

            <section className="flex gap-10">
                {categories.map((category) => (
                    <div key={category.label} className="space-y-6 border border-gray-300 p-4 rounded-2xl shadow-lg shadow-gray-900">
                        <h2 className="text-2xl capitalize font-bold" style={{ color: category.color }}>{category.label}</h2>

                        {/* Banners */}
                        <section className="space-y-2">
                            <h3 className="text-xl font-semibold mb-2">Banners</h3>
                            <Label htmlFor={`banner-${category.label}`}>Escolher banner imagem do banner</Label>
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
                            <Button color={category.color} className="mt-4" onClick={() => handleUploadBanner(category)}>Salvar Banner</Button>
                            <ul className="mt-2 flex gap-2 flex-wrap">
                                {(banners[category.label] || []).map((b) => (
                                    <li key={b.id}><img src={b.url} alt="banner" className="w-40" /></li>
                                ))}
                            </ul>
                        </section>

                        {/* Frota */}
                        <section className="space-y-2">
                            <h3 className="text-xl font-semibold mb-2">Frota</h3>
                            <Input
                                placeholder="Nome"
                                value={newFleet[category.label]?.name || ""}
                                onChange={(e) =>
                                    setNewFleet((prev) => ({
                                        ...prev,
                                        [category.label]: { ...prev[category.label], name: e.target.value },
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
                            <Button className="mt-4" color={category.color} onClick={() => handleAddFleet(category)}>Adicionar Veículo</Button>
                            <ul className="mt-2 space-y-2">
                                {(fleet[category.label] || []).map((f) => (
                                    <li key={f.id} className="flex gap-2 items-center">
                                        <img src={f.image} alt="frota" className="w-20" />
                                        <div>
                                            <p className="font-semibold">{f.name}</p>
                                            <p>{f.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                ))}
            </section>

            {/* Blog */}
            <section className="space-y-2 border border-gray-300 p-4 rounded-2xl shadow-lg shadow-gray-900">
                <h2 className="text-2xl font-bold">Blog</h2>
                <Input
                    placeholder="Título"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="Conteúdo"
                    className="w-full p-2 border rounded"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <Button onClick={handleAddPost}>Publicar</Button>
                <ul className="mt-4 space-y-2">
                    {blogPosts.map((p) => (
                        <li key={p.id} className="border p-2 rounded">
                            <h3 className="font-bold text-lg">{p.title}</h3>
                            <p>{p.content}</p>
                        </li>
                    ))}

                </ul>
            </section>
        </main>
    );
}
