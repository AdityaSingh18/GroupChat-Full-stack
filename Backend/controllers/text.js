let arr=[{name:"siva",email:"paruchuri@gmail.com",password:"asd"},{name:"raj",email:"raj@gmail.com",password:"asdf"}]

async(req,res,next)=>{

    const {email,password}= req.body;
for(let i=0;i<arr.length;i++){

    if(!email || !password){
        console.log('please enter all details')
    
    }

    if(email==arr[i].email){
        if(password==arr[i].password){
            console.log('password match')
        }
        else{
            console.log('incorrect password')
        }
    }

    c
    if(arr[i].email==email && arr[i].password==password){
        console.log('user exist')
    }

    else{
        console.log('user does not exist')
    }
}
}