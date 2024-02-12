
export interface IPlace{
    title:string,
    address:string,
    photos:string[],
    description:string,
    perks:string[],
    extraInfo:string,
    checkIn:string,
    checkOut:string,
    maxGuests:string,
}

export interface IPlaceData  extends IPlace{
    _id:string;
    owner:string
}