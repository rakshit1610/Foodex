import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from '../AddRecipe/AddRecipe.module.css';
import {Link, Redirect} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import serverService from '../../../services/serverService'
import LoadingOverlay from 'react-loading-overlay';

class EditRecipe extends Component {

    state = { 
    title:"",
    titleLimit:50,
    ingredients:"",
    ingredientsLimit: 300,
    content:"",
    recipe:[],
    img: "",
    contentLimit:4000,
    category:"starters",
    veg:true,
    cook_time: "",
    owner:2

  }

  componentDidMount(){
    const data= this.props.location.state.recipeid;
  // axios.get('http://af3c2d386213.ngrok.io/recipe/'+this.props.location.state.recipeid+'/')
  serverService.readrecipe(data)
  .then(response=>{
    console.log(response);
    this.setState({recipe: response.data})
    this.setState({title: response.data.title, ingredients: response.data.ingredients, content: response.data.content,
    veg: response.data.veg, cook_time: response.data.cook_time, category: response.data.category, img: response.data.img
    })

  })
}


    handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }   

    handleimg=(e)=>{

        this.setState({img:e.target.files[0]})

    }
    
    createSuccess = (info) => {
        NotificationManager.success( info, 'Success');
    };

    handlesubmit = (event) => {

    this.setState({isLoading:true });

        event.preventDefault();
// console.log(this.state.veg)

      const data={
        title: this.state.title,
        category: this.state.category,
        ingredients: this.state.ingredients,
        content: this.state.content,
        veg: this.state.veg,
        cook_time: this.state.cook_time,
        owner: this.state.owner,
        img: this.state.img
      }
        
      const formdata = new FormData();
      const recipeid= this.props.location.state.recipeid

    for (let formElement in data) {
      formdata.append(formElement, data[formElement]);
    //   console.log(formElement, data[formElement]);
    }

        serverService.editrecipe(formdata, recipeid)
        .then((resp)=>{
          console.log(resp)
          if(resp.status===202){
            this.createSuccess("Recipe Edited!")
            this.setState({ redirect: "/profile", isLoading:false });
          }
      
        })
        .catch(err => {console.log(err.response)})
      
    
      }


    render(){

        if(this.state.redirect){
            return <Redirect to= {this.state.redirect} />
          }

        return (
          <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text='Loading...'
          >
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.addrecipe}>
                <h1>Share Your Recipe</h1>
                
                

        <form onSubmit = {this.handleOnSubmit}>

            <label className={classes.labels}><h3 >Recipe Title</h3></label>
            <input type="text" className={classes.area} name = 'title'  value={this.state.title} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.title.length}/{this.state.titleLimit}</p>
            <label ><h3>Ingredients</h3></label>
            <textarea rows="5" className={classes.area} name = 'ingredients' value={this.state.ingredients}  onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.ingredients.length}/{this.state.ingredientsLimit}</p>
            <label ><h3>Instructions</h3></label>
            <textarea rows="10" className={classes.area} name = 'content' value={this.state.content} placeholder={this.state.instructions} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.content.length}/{this.state.contentLimit}</p>
            <label><h3>Category</h3></label>
            <select name='category' value={this.state.category} className={classes.ddlist}  onChange={this.handlechangeall}>
            <option value="starter">Starters</option>
            <option value="main_course">Main Course</option>
            <option value="desserts">Desserts</option>
            <option value="drinks">Drinks and Smoothies</option>
            <option value="others">Others</option>
            </select>

            <label className={classes.labels}><h3>Tag</h3></label>
            <select name='veg' value={this.state.veg} className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="true">Vegetarian</option>
            <option value="false">Non-Vegetarian</option>
            </select>

            <label className={classes.labels}><h3>Cooking Time:</h3></label>
            <input type="number" value={this.state.cook_time} className={classes.cooktime} name = 'cook_time' onChange = {this.handlechangeall} /> minutes
   
   <br />

            <label className={classes.labels}><h3>Upload Image:</h3></label>
            {/* <div className={classes.imgcontainer}> */}
            <input onChange={this.handleimg} className={classes.hidden} id="postimage" type="file" name="file" accept="image/*" />
            <label className={classes.imgbtn} htmlFor="postimage"><i className="fa fa-upload" aria-hidden="true"></i>Add Image</label>
            {/* </div> */}

            <input className={classes.submitrecipe} type="submit" onClick={this.handlesubmit} value="EDIT RECIPE" />

        </form>

                </div>
                <div className={classes.tips}>
                <Card style={{ width: '18rem' }} className={classes.tipscard}>
                <Card.Header className={classes.tiphead}><i className="fa fa-bullhorn"> </i> Q U I C K - T I P S</Card.Header>
                <Card.Body className={classes.bulletpoints}>
                <Card.Text>
                <ul>
                <li>Write a good, catchy title</li>
                <li>Give clear details about your recipe preparation</li>
                <li>Add a relevant topic to reach the right members</li>
                <li>Check your spelling and grammar</li>
                <li>Become an active member to get recognized</li>
                </ul>
                </Card.Text>
                </Card.Body>
                </Card>
                </div>
                </div>
            </LoadingOverlay>
        );
    }
}

export default EditRecipe;








