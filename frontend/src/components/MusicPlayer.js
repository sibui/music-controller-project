import React, { Component } from 'react';
import { Grid, 
         Typography, 
         Card, 
         IconButton, 
         LinearProgress 
        } from "@material-ui/core";
import { PlayArrow, SkipNext, Pause } from "@material-ui/icons";

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100;
        return (<Card>
            <Grid container alignItems="center">
                <Grid item xs={4} alignItems="center">
                    <img src={this.props.image_url} height="100%" width="100%" padding="0" />
                </Grid>
                <Grid item xs={8} alignItems="center">
                    <Typography component="h5" variant="h5" align="center">
                        {this.props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1" align="center">
                        {this.props.artist}
                    </Typography>
                    <div align="center">
                        <IconButton>
                            { this.props.is_playing ? <Pause/> : <PlayArrow/> }
                        </IconButton>
                        <IconButton>
                            <SkipNext/>
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress align="center" variant="determinate" value= { songProgress }/>
        </Card>)
    }
}