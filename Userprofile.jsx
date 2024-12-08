import React, { useState } from 'react'

function Userprofile() {

    const [ input ,Setinput] = useState ("");
    const [Data ,SetData] = useState (null);
    const [ loading,setLoading] = useState(false);


    const searchprofile = () =>{
        if(!input) return;
        setLoading(true);
        fetch(`https://api.github.com/users/${input}`)
        .then((response)=> response.json())
        .then((data)=>{
            SetData(data);
        })

    }
  return (
    <div>
        <input type="text" name="" id="" value={input}  onChange={(e)=> Setinput(e.target.value)}/>
        <button onClick={searchprofile}>Search profile</button>



        <div className="displaydata">

   {
         Data ? (
            <>
                <img src={Data.avatar_url} alt="" height={"200px"} width={"200px"} />
              <h1><b>Name: {Data.login}</b></h1>
              <h4>Bio: {Data.bio}</h4>
              <h4><b>Email: {Data.email ? Data.email : "No email available"}</b></h4>
              <p><b>Location: {Data.location ? Data.location : "No location found"}</b></p>
              <p><b>Twitter Username: {Data.twitter_username ? Data.twitter_username : "No Twitter username found"}</b></p>
              <h5>Followers: {Data.followers}</h5>
              <h6>Public Repos: {Data.public_repos}</h6>
            </>
          ) : (
            <p>No data found</p>
          )
   }
        </div>

    </div>


  )
}

export default Userprofile