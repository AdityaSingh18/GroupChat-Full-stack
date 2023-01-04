window.addEventListener('DOMContentLoaded', loadScreen)


async function loadScreen(e){
    e.preventDefault();

    document.getElementById('username').innerHTML = 'user'
        
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