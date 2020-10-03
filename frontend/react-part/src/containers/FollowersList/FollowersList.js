import React, {Component} from 'react';
import NavigationBar from '../../components/Navbar/Navbar';
import Person from '../../components/Person/Person';
import classes from './FollowersList.module.css';
import {Link} from 'react-router-dom';


class FollowersList extends Component {


    render(){
  return (
    <>
    <NavigationBar />
    <Person />

    </>
  );
}
}

export default FollowersList;