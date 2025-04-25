// hooks/useBanners.ts
"use client"

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/firebase";

export function useFleets(dto: { type: "executivos" | "vans" | "blindados" | "populares", category: string }) {
    const [fleets, setFleets] = useState<any[]>([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fleetsRef = ref(db, `fleet/${dto.type}`);
        const unsubscribe = onValue(fleetsRef, (snapshot) => {
            const data = snapshot.val();
            const all: any = Object.values(data);

            const filtered = dto.category
                ? all.filter((item: any) => item.category?.toLowerCase() === dto.category.toLowerCase())
                : all.some((el: any) => el.category)
                    ? Object.entries(Object.groupBy(all, (el: any) => el.category)).find(([key,]) => key != 'undefined')[1]
                    : all;

            all.some((el: any) => el.category) && setCategories(Array.from(new Set(all.filter((el: any) => el.category).map(el => el.category))))
            setFleets(filtered);
        });

        return () => unsubscribe();
    }, [dto.type, dto.category]);
    console.log(categories)
    return { fleets, categories };
}
