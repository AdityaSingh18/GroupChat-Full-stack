let chatArray = []
const chatContainer = document.querySelector('.chat-container-div');
const User = localStorage.getItem('name')
window.addEventListener('DOMContentLoaded', loadScreen)


async function loadScreen(e){
    e.preventDefault();

    document.getElementById('username').innerHTML = 'user'
    getMessage()
        
    }
        


const token = localStorage.getItem('userToken');

document.getElementById('chat-form').onsubmit = async function(e){
    e.preventDefault();
    
    const message = {
        message : e.target.message.value
    }
    try {
        const token = localStorage.getItem('userToken');
        const response =  await axios.post(`http://localhost:3000/user/postMessage` , message  , {headers:{"Authorization" : token}})
        // console.log(response.data.arr);

        e.target.message.value = ""
        //saveToLocal(response.data.arr);
        
    } catch (err) {
        console.log(err);
    }
}

async function getMessage(){
    
 setInterval(async () => {
    try {
        const response =  await axios.get(`http://localhost:3000/user/getMessage`  , {headers:{"Authorization" : token}})
        // console.log(response.data.arr)
        var newArr = response.data.arr
        saveToLocal(newArr);
        
    } catch (err) {
        console.log(err);
    }
},1000)
}

function saveToLocal(arr){

    let oldMessages = JSON.parse(localStorage.getItem(`msg$`));
    
    if(oldMessages == undefined || oldMessages.length == 0){
        chatArray = chatArray.concat(arr)
    }else{
        chatArray =[]
        chatArray = chatArray.concat(oldMessages,arr);
    }
    localStorage.setItem(`msg` , JSON.stringify(chatArray))



    showChatsOnScreen()
}


function showChatsOnScreen(){
    
    chatContainer.innerHTML = ""
    
    chatArray.forEach(chat =>{

        if(User == chat.name){
            let child = `<div class="msg-div">
            <div class="resize-sent">
              <div class="sent" id=${chat.id}>
                <p class="sent-name">${chat.name}</p>
                <p class="sent-msg">${chat.message}</p>
                <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
              </div>
            </div>
          </div>`
        
          chatContainer.innerHTML += child
        }
        else{
            let child = `<div class="msg-div">
            <div class="resize-received">
              <div class="received" id=${chat.id}>
                <p class="received-name">${chat.name}</p>
                <p class="received-msg">${chat.message}</p>
                <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
              </div>
            </div>
          </div>`
        
          chatContainer.innerHTML += child

            
        }
    })

    function ShowExpenses(user){
        console.log(user)
       let parentNode = chatContainer;
       let childHTML = `<li id=${user.id}> ${user.amount}-${user.descip}-${user.category}
        <button onclick=deleteUser('${user.id}')> Delete </button>
      </li>`
      ;
      
      
      parentNode.innerHTML= parentNode.innerHTML+childHTML;
        }

    document.getElementById(`${lastId}`).scrollIntoView()
    console.log(lastId)
}