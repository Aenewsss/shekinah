// hooks/useBanners.ts
"use client"

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/firebase";

export function useBlog() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fleetsRef = ref(db, `blogPosts/`);
        const unsubscribe = onValue(fleetsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setPosts(Object.values(data));
            else setPosts([]);
        });

        return () => unsubscribe();
    }, []);

    return posts;
}
