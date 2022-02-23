import React, {Component} from 'react';
import { useNavigate } from 'react-router-dom'
import {Button, 
    Grid, 
    Typography, 
    TextField, 
    FormControl,
    FormHelperText, 
    Radio, 
    RadioGroup, 
    FormControlLabel,

} from '@material-ui/core';
import { Link } from "react-router-dom";
import {withRouter} from './withRouter';
import { Collapse } from "@material-ui/core";
import { Alert }  from "@material-ui/lab"

class CreateRoomPage extends Component {

    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallBack: () => {},
    };
    
    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: "",
        };
    }

    handleVotesChange = (e) => {
        this.setState({
            votesToSkip: e.target.value,

        });
    }

    handleGuestCanPauseChange = (e) => {
        this.setState({
            guestCanPause:  e.target.value === "true" ? true: false
        })
    }

    handleRoomButtonPressed = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            }),
        };
        fetch('/api/create-room', requestOptions).then((response)=> 
            response.json()
            ).then((data)=> this.props.navigate("/room/" + data.code));
    }

    handleUpdateButtonPressed = (e) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            }),
        };
        fetch('/api/update-room', requestOptions)
            .then((response)=> {
                if (response.ok) {
                    this.setState({
                        successMsg: "Room updated successfully!"
                    })
                } else {
                    this.setState({
                        errorMsg: "Error updating room..."
                    })

                }
                this.props.updateCallBack();
            });
    }

    renderCreateButtons = (e) => {
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={this.handleRoomButtonPressed}>
                    Create a Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
    </Grid>);
    }

    renderUpdateButtons = (e) => {
        return (
            <Grid item xs={12} align="center">
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={this.handleUpdateButtonPressed}>
                    Update Room
                </Button>
            </Grid>
        )
    }
    render() {
        const title = this.props.update ? "Update Room" : "Create a Room"
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>
                        {this.state.successMsg != "" ? (
                            <Alert severity="success" 
                                onClose={() => {
                                    this.setState({
                                        successMsg: ""
                                    })
                                }}
                            >
                                {this.state.successMsg}
                            </Alert>)
                        : this.state.errorMsg != "" ? (
                            <Alert severity="error">
                                onClose={() => {
                                    this.setState({
                                        errorMsg: ""
                                    })
                                }}
                            </Alert>) : false
                        }
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                    <FormHelperText>
                            <div align='center'>Guest Control of Playback State</div>         
                    </FormHelperText>
                        <RadioGroup 
                            row 
                            defaultValue={this.props.guestCanPause.toString()}
                            onChange={this.handleGuestCanPauseChange}
                        >
                            <FormControlLabel
                                value="true" 
                                control={<Radio color="primary"/>}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false" 
                                control={<Radio color="secondary"/>}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                            required={true} 
                            type="number"
                            onChange={this.handleVotesChange} 
                            defaultValue={this.props.votesToSkip}
                            inputProps={{
                                min:1,
                                style: {textAlign: "center"},
                            }}
                        />
                        <FormHelperText>
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
            </Grid>
        );
    }
}
export default withRouter(CreateRoomPage);