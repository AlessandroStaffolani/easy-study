/*@flow*/
import assert from 'assert';
import  {init,getCardFromStore,createNewCardOnStore,modifyCardOnStore,isInitiated} from '../../src/memBackendLib/dropBoxApi.js';
import {parseQueryString} from '/home/andrea/Documenti/worksapceEclipse/ProgettoCampe/campe/src/utils.js';

var token="9ZxYq9BRjKsAAAAAAAAGihUtySwG-Evs32ZZevTkKNx6a3tOH04nwUN810DIx9hF";

init(token);

var card={contents:"ciao lisaaaa ciula fiuuuu",name:"lisaaaa"};
//createNewCardOnStore(card);
modifyCardOnStore(card);
//getCardFromStore("lis.txt");
//isInitiated().then(console.log);
for (let i=0;i<30;i++)
{
  card.contents=i+"cioa";
  modifyCardOnStore(card);
}
