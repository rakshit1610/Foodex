import React, {Component} from 'react';
import NavigationBar from '../Navbar/Navbar';
import classes from './Profile.module.css';
import {Link} from 'react-router-dom';


class Profile extends Component {

    upload(e){
        console.warn(e.target.files)
        const files= e.target.files
        const formData= new FormData();
        fetch('http://apiUrl',{
            method:"POST",
            body:formData
        }).then((resp)=>{
            resp.json().then((result)=>{
                console.warn("result",result)
            })
        })
    }

    render(){
  return (
    <>
    <NavigationBar />     
    <div className={classes.cover}>
    <div className={classes.wrapper}>
    <div className={classes.dp}>
    <img  src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
    <input className={classes.avatar} id="uploadpic" type="file" className={classes.avatar} onChange={(e)=>this.upload(e)} name="img" accept="image/*" />
    <label className={classes.change} for="uploadpic">Change Picture</label>
    </div>
    <h3>Sheela Kumari</h3>
    </div>

    <div className={classes.options}>
        <div>
            <h5>Following</h5>
            <p className={classes.nums}>34</p>
        </div>
        <div>
            <h5>Followers</h5>
            <p className={classes.nums}>34</p>
        </div>
        <div>
            <h5>Posts</h5>
            <p className={classes.nums}>34</p>
        </div>

    </div>

    </div>

    </>
  );
}
}

export default Profile;