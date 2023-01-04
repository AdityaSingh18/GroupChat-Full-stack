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
    
        try {
            const response =  await axios.get(`http://localhost:3000/user/getMessage`  , {headers:{"Authorization" : token}})
            var newArr = response.data.arr
            saveToLocal(newArr);
            
        } catch (err) {
            console.log(err);
        }
    
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
