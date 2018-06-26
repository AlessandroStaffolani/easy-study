let User={
    email:String,
    password:String,
    salt:String,
    active:Boolean,
    name:String,
    surname:String,
    };

let Subject ={
    name: String
    date_exam: Date,
    user: User,
};

let Section ={
    name: String,
    subject: Subject,
};

let Question ={
    value: String
    important: Boolean
    //BUG Creation of type result if really neaded
    result: Number// possible values: {-1, 0, 1} -1 = red, 0 = orange, 1 = green
    note: String
    images: Array<Image> , // array of Image object id
    section: Section ,
    user: User,
};

let Image={
  name:String,
  ID:String,
}

export {User,Subject,Section,Question,Image};
