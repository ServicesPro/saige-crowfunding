export class Project {

    constructor(
        public id: string = "",
        public type: string = "public",
        public location: string = "",
        public name: string = "",
        public description: string ="",
        public duration: number = 0,
        public video_link: string = "",
        public banner_img: string = "",
        public product_img: string = "",
        public approuved: string = "none",
        public domain: string = "",
        public currency: string = "",
        public user_uid: string = "",
        public money_wanted: number = 0,
        public money_earned: number = 0,
        public created_at: Date,
        public summary: string = "",
        public organisation: string = "",
        public sec_one: string = "",
        public sec_one_img: string = "",
        public sec_two: string = "",
        public sec_two_img: string = "",
        public sec_three: string = "",
        public sec_three_img: string = "",
        public sec_four: string = "",
        public sec_four_img: string = "",
    ){}
}