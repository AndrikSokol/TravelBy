

export interface IPlace{
    title:string,
    address:string,
    photos:string[],
    description:string,
    perks:string[],
    extraInfo:string,
    checkIn:number,
    checkOut:number,
    maxGuests:number,
    price:number
}

export interface IPlaceData  extends IPlace{
    _id:string;
    owner:string
}