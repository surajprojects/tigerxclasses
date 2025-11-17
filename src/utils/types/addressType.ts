import { StudentsList } from "./studentType";

export interface AddressData {
    id: string,
    flatHouseBuilding?: string,
    streetOrArea: string,
    landmark?: string,
    city: string,
    state: string,
    pincode?: string,
};

export type AddressList = AddressData[];