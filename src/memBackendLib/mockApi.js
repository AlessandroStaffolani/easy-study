/*@flow*/
//TODO implement mock API
import {User,Subject,Section,Question,Image};

function getObjectFromStore(name:string):Promise<Object>
{
 switch (name)
 {
   case "User":
   return {
       email:"String",
       password:"String",
       salt:"String",
       active:true,
       name:"String",
       surname:"String",
       }
   break;

   case "Subject":
   break;

   case "Section":
   break;

   case "Question":
   break;

   case "Image":
   break;

   default:
 }
}
/*
{
    name: String
    date_exam: Date,
    user: User,
});

{
    name: String,
    subject: Subject,
});

{
    value: String
    important: Boolean
    result: Number// possible values: {-1, 0, 1} -1 = red, 0 = orange, 1 = green
    note: String
    images: Array<Image> , // array of Image object id
    section: Section ,
    user: User,
});

{
  name:String,
  ID:String,
}
*/
function createNewCardOnStore(card:Card):void
{
  console.log(card.name,card.contents);
}

export {createNewCardOnStore,getCardFromStore};
