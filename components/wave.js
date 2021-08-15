import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'

export default class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'violet',
      progressColor: 'purple',
      backend: 'MediaElement',
      mediaControls: false,
      audioRate: '1',//播放音频的速度
    })
    if(this.props.src != ""){
        this.wavesurfer.load(this.props.src)
    }
  }
  componentWillUnmount() {

  }
  
  render() {
    return (
      <div className='waveform'>
        <div className='wave'></div>
        <button onClick={()=>{
            this.wavesurfer.load(this.props.src)
            this.wavesurfer.play()
        }}>播放</button>
      </div>
    )
  }
}

Waveform.defaultProps = {
  src: ""
}