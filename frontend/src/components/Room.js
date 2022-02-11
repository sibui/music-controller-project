import React, { Component,useState, useEffect } from "react";
import { useParams,useNavigate, renderMatches } from "react-router-dom";
import {Grid, Button, Typography } from '@material-ui/core';
import {withRouter} from './withRouter';

class Room extends Component {
    constructor(props){
        super(props);
        this.state= {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false
        }
        this.roomCode= this.props.roomCode ? this.props.roomCode : window.location.pathname.split('/room/')[1]
        this.getRoomDetails();
    };
   
    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
        .then(res => {
            if(!res.ok){
                this.props.leaveRoomCallBack();
                this.props.navigate('/');
            }
            return res.json()
        })
        .then(data=>{
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    }
    leaveButtonPressed() {
        const requestOptions ={
            method: "POST",
            headers: {'Content-Type': "application/json"},
        };
        fetch('/api/leave-room', requestOptions)
        .then((_response) => {
            this.props.leaveRoomCallBack();
            this.props.navigate('/');
        }); 
    };

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest Can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={() => {this.leaveButtonPressed()}}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>

        );
    }
}

export default withRouter(Room);    
