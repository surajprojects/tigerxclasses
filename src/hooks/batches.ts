import { useEffect, useState } from "react";
import { BatchesList } from "@/utils/types/batchType";
import { errorHandle } from "../utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";

export function useBatches() {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [batchesData, setBatchesData] = useState<BatchesList>([]);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const result = await axiosProtected.get("/batch");
                const allBatches: BatchesList = result.data.allBatches;
                setBatchesData(allBatches);
            } catch (error) {
                errorHandle(error);
            }
            setIsLoading(false);
        };
        getData();
    }, []);
    return { batchesData, isLoading, };
};