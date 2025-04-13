// hooks/useBanners.ts
"use client"

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/firebase";

export function useBanners(category: "executivos" | "vans" | "blindados" | "populares") {
    const [banners, setBanners] = useState<string[]>([]);

    useEffect(() => {
        const bannersRef = ref(db, `banners/${category}`);
        const unsubscribe = onValue(bannersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const urls = Object.values(data).map((item: any) => item.url);
                setBanners(urls);
            } else {
                setBanners([]);
            }
        });

        return () => unsubscribe();
    }, [category]);

    return banners;
}
