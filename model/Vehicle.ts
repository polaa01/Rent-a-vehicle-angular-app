import { VehicleStatus } from "./VehicleStatus";

export interface Vehicle
{
    id: number;
    model: string;
    purchasePrice: number;
    vehicleId: string;
    image: string;
    //status: 'AVAILABLE' | 'IN_REPAIR' | 'RENTED';
    status: VehicleStatus;
    type: 'car' | 'bike' | 'scooter';
    positionX: number;
    positionY: number;
    description?: string;
    purchaseDate?: Date;
    maxSpeed?: number;
    autonomy?: number;

}