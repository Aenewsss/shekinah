// hooks/useBanners.ts
"use client"

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/firebase";

export function useFleets(category: "executivos" | "vans" | "blindados" | "populares") {
    const [fleets, setFleets] = useState<any[]>([]);

    useEffect(() => {
        const fleetsRef = ref(db, `fleet/${category}`);
        const unsubscribe = onValue(fleetsRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            if (data) setFleets(Object.values(data));
            else setFleets([]);
        });

        return () => unsubscribe();
    }, [category]);

    return fleets;
}
