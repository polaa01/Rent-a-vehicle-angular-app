export interface Rental{
   id: number;
   duration: number;
   startTime: Date;
   endTime: Date;
   startPositionX: number;
   startPositionY: number;
   endPositionX: number;
   endPositionY: number;
    client: {
    id: number;
    name: string;      
  };
  vehicle: {
    id: number;
    username: string;
  };

  price: number;

   
}