import getBatches from "@/lib/server/getBatches";
import BatchCard from "@/components/card/batchCard";
import AddBatchBtn from "@/components/button/batch/addBatchBtn";

export default async function Batch() {
    const batchData = await getBatches();
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-3xl text-gray-800 font-bold">Batches</h6>
                        <p className="mt-0.5 font-normal text-gray-500 text-base">Manage student batches and schedules</p>
                    </div>
                    <AddBatchBtn />
                </div>
                <div className="my-8 grid grid-cols-3 gap-6">
                    {batchData && batchData.length > 0 ? batchData.map((batch) => {
                        return <BatchCard
                            key={batch.id}
                            batchData={batch}
                        />
                    })
                        :
                        <p>No batches found!!!</p>
                    }
                </div>
            </div>
        </>
    );
};