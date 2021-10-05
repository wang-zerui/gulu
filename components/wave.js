import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import { makeStyles, withStyles } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Slider from '@material-ui/core/Slider';
import { TextField, Popover, Button, Snackbar } from '@material-ui/core';

const useStyles = {
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
    width: 300,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    height: 120,
    width: "100%",
    backgroundColor: "rgba(232, 232, 232, 0.3)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  funcBtn: {
    width: 350,
    height: 100,
    lineHeight: "100px",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    backgroundColor: "rgba(16, 15, 15, 0.34)",
    color: "white",
    borderRadius: 50,
  }
};

class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      src: "",
    }
  }
  componentDidMount() {
    this.post_src = this.props.src;
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'violet',
      progressColor: 'purple',
      backend: 'MediaElement',
      mediaControls: false,
      barHeight: '5',
      audioRate: '1',//播放音频的速度
    })
    if (this.props.src != "") {
      this.wavesurfer.load(this.props.src)
    }
  }

  render() {
    const { classes } = this.props;
		this.open = Boolean(this.state.anchorEl);
		this.id = this.open ? 'simple-popover' : undefined;

		const handleClose = () => {
			this.setState({
				anchorEl: null
			})
			console.log("anchorEl: ", this.state.anchorEl);
		};
		
		const handleChange = (e, newTime) => {
			e.target.defaultValue = e.target.value;
			this.setState({
				startTime: e.target.value
			})
		}

		const handleChange2 = (e, newTime) => {
			e.target.defaultValue = e.target.value;
			this.setState({
				endTime: e.target.value
			})
		}

		const handleClick = (event) => {
			this.setState({
				anchorEl: event.currentTarget
			})
		}

		const getUserId = () => {
			return 1
		};

    let startSecond = "0";
    let endSecond = "0";
    let startTime = "2021-08-03T9:55";
    let endTime = "2021-08-03T9:56";

		const replay = () => {
			const s = startTime.replace('T', ' ') + `:${startSecond}`;
      const e = endTime.replace('T', ' ') + `:${endSecond}`;
			const userId = getUserId();
			this.wavesurfer.load('http://8.131.62.53:8080/api/audio/details?userId='+userId+'&start_time='+s+'&end_time='+e);
			handleClose();
			this.wavesurfer.play();
		}

    return (
      <div className='waveform'>
        <div className='wave'></div>
        <div className={classes.footer}>
          <div className={classes.funcBtn} onClick={() => {
						this.wavesurfer.playPause();
					}
					}>播放</div>
          <div className={classes.funcBtn}>列表</div>
          <Popover
            id={this.id}
            open={this.open}
            anchorEl={this.state.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-start"
                label="开始时间"
                type="datetime-local"
                defaultValue="2021-08-03T09:55"
                className={classes.textField}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Slider
                defaultValue={0}
                // getAriaValueText={startSecond}
                onChange={(e) => {
									startSecond = `${e.target.ariaValueNow}`
                }}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={59}
              />
              <br></br>
              <TextField
                id="datetime-start"
                label="结束时间"
                type="datetime-local"
                defaultValue="2021-08-03T09:56"
                className={classes.textField}
                onChange={handleChange2}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Slider
                defaultValue={0}
                // getAriaValueText={endSecond}
                onChange={(e) => {
									endSecond = `${e.target.ariaValueNow}`
                }}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={59}
              />
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<PlayArrowIcon />}
                onClick={replay}
              >
                回放
              </Button>
            </form>
          </Popover>
          <div className={classes.funcBtn} onClick={handleClick}>回放</div>
        </div>

      </div>
    )
  }
}

export default withStyles(useStyles)(Waveform)