'use client'

import { Label } from '@/components/label'
import QuillEditor from './QuillEditor'
import { useState } from 'react'
import { Input } from '@/components/input'
import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from './page'

export default function BlogSection({ handleAddPost, blogPosts }: any) {
    const [newPost, setNewPost] = useState({ title: '', content: '', image: null })

    const getPreviewUrl = (file) => file ? URL.createObjectURL(file) : null;

    const handleFileSelect = (file, setter) => {
        if (file && file.size > MAX_FILE_SIZE) {
            alert(`Arquivo muito grande. Máximo permitido: ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }
        setter(file);
    };

    return (
        <section className="space-y-4 border p-4 rounded-2xl shadow">
            <h2 className="text-2xl font-bold">Blog</h2>

            {/* Banner */}
            <Label htmlFor={`banner-blog`}>Escolher imagem do banner</Label>
            <Input
                id={`banner-blog`}
                accept="image/*"
                type="file"
                hidden
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null, (file) =>
                    setNewPost({ ...newPost, image: file })
                )}
            />
            {newPost.image && (
                <img src={getPreviewUrl(newPost.image)} alt="Preview" className="w-full h-64 object-contain rounded" />
            )}

            <input
                type="text"
                placeholder="Título"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-2 border rounded mt-4"
            />

            <QuillEditor
                value={newPost.content}
                onChange={(content) => setNewPost({ ...newPost, content })}
            />

            <button onClick={() => handleAddPost(newPost)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Publicar
            </button>
        </section>
    )
}