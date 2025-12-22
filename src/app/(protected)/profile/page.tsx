import Card from "@/components/card/card";
import { formatDate } from "@/utils/dateAndTime";
import CardData from "@/components/card/cardData";
import CardBody from "@/components/card/cardBody";
import CardHeader from "@/components/card/cardHeader";
import getUserProfile from "@/lib/server/getUserProfile";
import ProfileImageUpload from "@/components/home/profileImageUpload";
import EditUserProfileBtn from "@/components/button/users/editUserProfileBtn";
import { UserIcon, HomeIcon, AcademicCapIcon, CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default async function Profile() {
    const userData = await getUserProfile();
    if (!userData) {
        return <p className="italic font-medium">User not found!!!</p>;
    }
    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <h6 className="text-4xl text-blue-500 font-bold">Profile</h6>
                        <p className="my-2 font-medium text-gray-500 text-base">Manage your account information.</p>
                    </div>
                    <EditUserProfileBtn userProfileData={userData} />
                </div>

                {/* User Summary */}
                <div className="bg-blue-50 p-6 rounded-2xl my-8 shadow-sm flex items-center justify-between">
                    <div className="flex items-center">
                        <ProfileImageUpload
                            type="profile"
                            userId={userData.id}
                            profileImg={userData.photo ? `${userData.photo}?t=${Date.now()}` : "/avatar.png"}
                        />
                        <div className="ml-4">
                            <p className="text-2xl font-medium text-gray-800 capitalize">{userData.fullName}</p>
                            <p className="text-gray-600 mt-0.5">{userData.username}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-gray-500 text-sm">Status</p>
                        <p className="text-gray-800 font-semibold text-lg"><span className="bg-amber-300 px-2.5 py-0.5 text-xs rounded-xl shadow-xs">{userData.status}</span></p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-gray-500 text-sm">Verified</p>
                        <p className="text-gray-800 font-semibold text-lg mt-1">{userData.verified ? <CheckBadgeIcon className="size-5 text-green-500" /> : <XCircleIcon className="size-5 text-red-500" />}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-4">
                            <p className="text-2xl font-medium text-gray-800 capitalize">{userData.instituteName}</p>
                            <p className="text-gray-600 mt-0.5">{userData.contactNo ? userData.contactNo : 1234567890}</p>
                        </div>
                        <ProfileImageUpload
                            type="institute"
                            userId={userData.id}
                            profileImg={userData.logo ? `${userData.logo}?t=${Date.now()}` : "/avatar.png"}
                        />
                    </div>
                </div>

                {/* Personal Information */}
                <Card key={1}>
                    <CardHeader
                        title="Personal Information"
                        description="User basic details"
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
                        <CardData key={4} fieldName="Date of Birth" fieldValue={formatDate(userData.dob.split("T")[0])} />
                        {/* Gender */}
                        <CardData key={5} fieldName="Gender" fieldValue={userData.gender.toLowerCase()} capitalize={true} />
                        {/* Category */}
                        <CardData key={6} fieldName="Category" fieldValue={userData.category} />
                        {/* Mobile No */}
                        <CardData key={7} fieldName="Mobile No." fieldValue={userData.mobileNo} />
                        {/* Email */}
                        <CardData key={8} fieldName="Email" fieldValue={userData.email} />
                    </CardBody>
                </Card>

                {/* Address Information */}
                <Card key={2}>
                    <CardHeader
                        title="Address Information"
                        description="User address details"
                    >
                        <HomeIcon className="size-5 mr-1.5 text-blue-500" strokeWidth={2} />
                    </CardHeader>
                    <CardBody>
                        {/* Flat/House/Building */}
                        <CardData key={1} fieldName="Flat/House/Building" fieldValue={userData.address && userData.address.flatHouseBuilding} capitalize={true} />
                        {/* Street/Area */}
                        <CardData key={2} fieldName="Street/Area" fieldValue={userData.address && userData.address.streetOrArea} capitalize={true} />
                        {/* Landmark */}
                        <CardData key={3} fieldName="Landmark" fieldValue={userData.address && userData.address.landmark} capitalize={true} />
                        {/* City */}
                        <CardData key={4} fieldName="City" fieldValue={userData.address && userData.address.city} capitalize={true} />
                        {/* State */}
                        <CardData key={5} fieldName="State" fieldValue={userData.address && userData.address.state.toLowerCase()} capitalize={true} />
                        {/* Pincode */}
                        <CardData key={6} fieldName="Pincode" fieldValue={userData.address && userData.address.pincode} />
                    </CardBody>
                </Card>

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

            </div >
        </>
    );
};