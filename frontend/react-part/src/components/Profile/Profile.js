import React, {Component} from 'react';
import NavigationBar from '../Navbar/Navbar';
import classes from './Profile.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import FollowingList from '../../containers/FollowingList/FollowingList';
import FollowersList from '../../containers/FollowersList/FollowersList';

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

    componentDidMount(){
 axios.get('https://04fab899189c.ngrok.io/user/1/',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                
            })
            .then((resp)=>{
                console.log(resp)          
              })

    }

    render(){
  return (
    <>
    <NavigationBar />     
    <div className={classes.totalwrap}>
    <div className={classes.bookmarks}>
    <button className={classes.bookmarkbtn}> <i className="fa fa-bookmark" aria-hidden="true"></i>
    <span className={classes.savetext}>My Bookmarks</span></button>
    </div>
    <div className={classes.cover}>
    <div className={classes.wrapper}>
    <div className={classes.dp}>
    <img  src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
    <input className={classes.avatar} id="uploadpic" type="file" className={classes.avatar} onChange={(e)=>this.upload(e)} name="img" accept="image/*" />
    <label className={classes.change} for="uploadpic">Change Picture</label>
    </div>
    <h3>Sheela Kumari</h3>
    {/* <p className={classes.bookmark}>my bookmarks</p> */}
    </div>

    <div className={classes.options}>
        <div>
            <h5 className={classes.headingnums}>Following</h5>
            <p className={classes.nums}>34</p>
        </div>
        <div>
            <h5 className={classes.headingnums}>Followers</h5>
            <p className={classes.nums}>34</p>
        </div>
        <div>
            <h5 className={classes.headingnums}>Posts</h5>
            <p className={classes.nums}>34</p>
        </div>

    </div>

    </div>
    </div>

    <Router>
        <Switch>
        {/* <Route path='/profile' exact component={MyRecipes} /> */}
        <Route path='/profile/following' component={FollowingList} />
        <Route path='/profile/followers' component={FollowersList} />
        {/* <Route path='/profile/bookmarks' component={Bookmarks} /> */}

        </Switch>
    </Router>

    </>
  );
}
}

export default Profile;