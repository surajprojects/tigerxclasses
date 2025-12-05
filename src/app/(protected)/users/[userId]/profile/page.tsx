import Card from "@/components/card/card";
import getUser from "@/lib/server/getUser";
import { BookOpenText } from "lucide-react";
import BackBtn from "@/components/button/backBtn";
import CardData from "@/components/card/cardData";
import CardBody from "@/components/card/cardBody";
import CardHeader from "@/components/card/cardHeader";
import EditUserBtn from "@/components/button/users/editUserBtn";
import UserDeleteBtn from "@/components/button/users/userDeleteBtn";
import UserStatusBtn from "@/components/button/users/userStatusBtn";
import UserSubscriptionCard from "@/components/card/user/userSubscriptionCard";
import { UserIcon, HomeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import AddUserSubscriptionBtn from "@/components/button/users/addUserSubscriptionBtn";

export default async function UserProfile({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params;
    const userData = await getUser(userId);

    if (!userData) {
        return <p className="italic text-red-500 font-semibold">User not found!!!</p>;
    }

    return (
        <>
            <div>
                {/* Header */}
                <div className="flex items-center">
                    <BackBtn />
                    <p className="flex-1 text-3xl font-bold text-gray-800 mx-4">{userData.fullName}</p>
                    <EditUserBtn userId={userId} />
                    <div className="border border-gray-200/70 bg-gray-50 rounded-xl ml-2">
                        <UserDeleteBtn userId={userId} />
                    </div>
                </div>

                {/* User Summary */}
                <div className="bg-blue-50 p-6 rounded-2xl my-8 shadow-sm">
                    <ul className="flex justify-between items-center">
                        <li>
                            <ul>
                                <li className="text-gray-500 text-sm">Username</li>
                                <li className="text-gray-800 font-semibold text-lg">{userData.username}</li>
                            </ul>
                        </li>
                        <li className="flex items-end gap-2">
                            <ul>
                                <li className="text-gray-500 text-sm">Status</li>
                                <li className="text-gray-800 font-semibold text-lg">{userData.status}</li>
                            </ul>
                            <UserStatusBtn userId={userId} />
                        </li>
                        <li>
                            <ul>
                                <li className="text-gray-500 text-sm">Deleted Status</li>
                                <li className="text-gray-800 font-semibold text-lg">{`${userData.isDeleted}`}</li>
                            </ul>
                        </li>
                        <li>
                            {/* <div className="border rounded-full p-8"></div> */}
                        </li>
                    </ul>
                </div>

                {/* Personal Information */}
                <Card key={1}>
                    <CardHeader
                        title="Personal Information"
                        description="Basic user details"
                    >
                        <UserIcon className="size-5 mr-1 text-blue-500" strokeWidth={2} />
                    </CardHeader>
                    <CardBody>
                        {/* Full Name */}
                        <CardData key={1} fieldName="Full Name" fieldValue={userData.fullName} capitalize={true} />
                        {/* Father Name */}
                        <CardData key={2} fieldName="Father Name" fieldValue={userData.fatherName} capitalize={true} />
                        {/* Mother Name */}
                        <CardData key={3} fieldName="Mother Name" fieldValue={userData.motherName} capitalize={true} />
                        {/* Date of Birth */}
                        <CardData key={4} fieldName="Date of Birth" fieldValue={userData.dob.split("T")[0]} capitalize={true} />
                        {/* Gender */}
                        <CardData key={5} fieldName="Gender" fieldValue={userData.gender.toLowerCase()} capitalize={true} />
                        {/* Category */}
                        <CardData key={6} fieldName="Category" fieldValue={userData.category} />
                        {/* Mobile No */}
                        <CardData key={7} fieldName="Mobile No." fieldValue={userData.mobileNo} />
                        {/* Email */}
                        <CardData key={8} fieldName="Email" fieldValue={userData.email} />
                        {/* Remarks */}
                        <CardData key={9} fieldName="Remarks" fieldValue={userData.remarks} />
                    </CardBody>
                </Card>

                {/* Address Information */}
                {userData.address &&
                    <>
                        <Card key={2}>
                            <CardHeader
                                title="Address Information"
                                description="User address details"
                            >
                                <HomeIcon className="size-5 mr-1.5 text-blue-500" strokeWidth={2} />
                            </CardHeader>
                            <CardBody>
                                {/* Flat/House/Building */}
                                <CardData key={1} fieldName="Flat/House/Building" fieldValue={userData.address.flatHouseBuilding} capitalize={true} />
                                {/* Street/Area */}
                                <CardData key={2} fieldName="Street/Area" fieldValue={userData.address.streetOrArea} capitalize={true} />
                                {/* Landmark */}
                                <CardData key={3} fieldName="Landmark" fieldValue={userData.address.landmark} capitalize={true} />
                                {/* City */}
                                <CardData key={4} fieldName="City" fieldValue={userData.address.city} capitalize={true} />
                                {/* State */}
                                <CardData key={5} fieldName="State" fieldValue={userData.address.state.split("_").join(" ").toLowerCase()} capitalize={true} />
                                {/* Pincode */}
                                <CardData key={6} fieldName="Pincode" fieldValue={userData.address.pincode} />
                            </CardBody>
                        </Card>
                    </>
                }

                {/* Institute Information */}
                <Card key={3}>
                    <CardHeader
                        title="Institute Information"
                        description="User institute details"
                    >
                        <AcademicCapIcon className="size-5 mr-1.5 text-blue-500" strokeWidth={2} />
                    </CardHeader>
                    <CardBody>
                        {/* Institute Name */}
                        <CardData key={1} fieldName="Institute Name" fieldValue={userData.instituteName} capitalize={true} />
                        {/* Institute Address */}
                        <CardData key={2} fieldName="Institute Address" fieldValue={userData.instituteAddress} capitalize={true} />
                        {/* Contact No */}
                        <CardData key={3} fieldName="Contact No." fieldValue={userData.contactNo} />
                    </CardBody>
                </Card>

                {/* User Subscriptions */}
                <Card key={4}>
                    <div className="flex justify-between items-center">
                        <CardHeader
                            title="User Subscriptions"
                            description="User subscriptions information"
                        >
                            <BookOpenText className="size-5 mr-2 text-blue-500" strokeWidth={2} />
                        </CardHeader>
                        <AddUserSubscriptionBtn userId={userId} />
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-6">
                        {userData.subscriptions.length > 0 ? userData.subscriptions.map((subscription) => {
                            return <UserSubscriptionCard
                                key={subscription.id}
                                userId={userId}
                                userSubscriptionData={subscription}
                            />;
                        })
                            :
                            <p className="italic text-gray-500/80 text-sm">No user subscriptions!!!</p>
                        }
                    </div>
                </Card>
            </div >
        </>
    );
};