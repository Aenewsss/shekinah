"use client";

import { useEffect, useState } from "react";
import { ref, onValue, get } from "firebase/database";
import { db } from "@/firebase";

interface BlogPost {
    id?: string;
    title: string;
    content: string;
    createdAt?: number;
    image?: string;
    [key: string]: any;
}

const POSTS_PER_PAGE = 5;

export function useBlog() {
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>([]);
    const [lastPost, setLastPost] = useState<BlogPost | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const blogRef = ref(db, "blogPosts/");
        const unsubscribe = onValue(blogRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const entries = Object.entries(data).map(([id, value]: [string, any]) => ({
                    id,
                    ...value,
                }));

                // ordena do mais novo para o mais antigo (se houver createdAt)
                const sortedPosts = entries.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

                setAllPosts(sortedPosts);
                setVisiblePosts(sortedPosts.slice(0, POSTS_PER_PAGE));
                setLastPost(sortedPosts[0] || null);
            } else {
                setAllPosts([]);
                setVisiblePosts([]);
                setLastPost(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const loadMore = () => {
        const nextPage = currentPage + 1;
        const start = 0;
        const end = nextPage * POSTS_PER_PAGE;
        setVisiblePosts(allPosts.slice(start, end));
        setCurrentPage(nextPage);
    };

    const loadLess = () => {
        const nextPage = currentPage - 1;
        const start = 0;
        const end = nextPage * POSTS_PER_PAGE;
        setVisiblePosts(allPosts.slice(start, end));
        setCurrentPage(nextPage);
    };

    const hasMore = visiblePosts.length < allPosts.length;
    const hasLess = currentPage - 1 > 0

    const getPostById = async (id: string): Promise<BlogPost | null> => {
        try {
            const postRef = ref(db, `blogPosts/${id}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                return { id, ...snapshot.val() };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar post por ID:", error);
            return null;
        }
    };

    return {
        allPosts,
        visiblePosts,
        lastPost,
        loadMore,
        loadLess,
        hasMore,
        hasLess,
        getPostById
    };
}