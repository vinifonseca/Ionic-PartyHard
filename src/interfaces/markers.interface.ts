export interface marker {
    id?: string
    point: {
        type: "Point",
        coordinates: [Number, Number] //[lat, lng]
    },
    name: string,
    description: string
}