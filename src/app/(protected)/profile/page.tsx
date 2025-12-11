import Card from "@/components/card/card";
import CardData from "@/components/card/cardData";
import CardBody from "@/components/card/cardBody";
import CardHeader from "@/components/card/cardHeader";
import ProfileImageUpload from "@/components/home/profileImageUpload";
import { UserIcon, HomeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export default function Profile() {
    return (
        <>
            <div>
                <div>
                    <h6 className="text-4xl text-blue-500 font-bold">Profile</h6>
                    <p className="my-2 font-medium text-gray-500 text-base">Manage your account information.</p>
                </div>

                {/* User Summary */}
                <div className="bg-blue-50 p-6 rounded-2xl my-8 shadow-sm">
                    <ProfileImageUpload />
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
                        <CardData key={1} fieldName="Full Name" fieldValue={"john"} capitalize={true} />
                        {/* Father Name */}
                        <CardData key={2} fieldName="Father Name" fieldValue={"john"} capitalize={true} />
                        {/* Mother Name */}
                        <CardData key={3} fieldName="Mother Name" fieldValue={"john"} capitalize={true} />
                        {/* Date of Birth */}
                        <CardData key={4} fieldName="Date of Birth" fieldValue={"2025-01-01"} capitalize={true} />
                        {/* Gender */}
                        <CardData key={5} fieldName="Gender" fieldValue={"male"} capitalize={true} />
                        {/* Category */}
                        <CardData key={6} fieldName="Category" fieldValue={"st"} />
                        {/* Mobile No */}
                        <CardData key={7} fieldName="Mobile No." fieldValue={"1234567897"} />
                        {/* Email */}
                        <CardData key={8} fieldName="Email" fieldValue={"john@gmail.com"} />
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
                        <CardData key={1} fieldName="Flat/House/Building" fieldValue={"117/kha"} capitalize={true} />
                        {/* Street/Area */}
                        <CardData key={2} fieldName="Street/Area" fieldValue={"sheopur"} capitalize={true} />
                        {/* Landmark */}
                        <CardData key={3} fieldName="Landmark" fieldValue={"sheopur"} capitalize={true} />
                        {/* City */}
                        <CardData key={4} fieldName="City" fieldValue={"sheopur"} capitalize={true} />
                        {/* State */}
                        <CardData key={5} fieldName="State" fieldValue={"mp"} capitalize={true} />
                        {/* Pincode */}
                        <CardData key={6} fieldName="Pincode" fieldValue={"476337"} />
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
                        <CardData key={1} fieldName="Institute Name" fieldValue={"tiger classes"} capitalize={true} />
                        {/* Institute Address */}
                        <CardData key={2} fieldName="Institute Address" fieldValue={"pali road"} capitalize={true} />
                        {/* Contact No */}
                        <CardData key={3} fieldName="Contact No." fieldValue={"1234657890"} />
                    </CardBody>
                </Card>

            </div >
        </>
    );
};