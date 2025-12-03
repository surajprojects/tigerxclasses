import { UserPaymentsList } from "./paymentType";

export interface SubscriptionData {
    id: string,
    name: string,
    amount: number,
    plan: string,
    startedOn: string,
    expiresOn: string,
    remarks?: string,
    payments: UserPaymentsList,
};

export type SubscriptionsList = SubscriptionData[];

export type UserSubscriptionFormData = Omit<Required<SubscriptionData>, "payments" | "id" | "amount"> & { amount: string };