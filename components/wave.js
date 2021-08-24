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
    this.post_src = this.props.src;
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
  
  render() {
    return (
      <div className='waveform'>
        <div className='wave'></div>
        <button onClick={()=>{
          if(this.post_src === this.props.src){
            this.wavesurfer.playPause();
          }else{
            this.post_src = this.props.src;
            this.wavesurfer.load(this.props.src)
            this.wavesurfer.play()
          }
        }}>播放/暂停</button>
      </div>
    )
  }
}

Waveform.defaultProps = {
  src: ""
}