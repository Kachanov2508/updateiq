import classes from './Progress.module.scss';

const Progress = (props) => {

    function clickHandler(e) {
        let rect = e.target.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / e.target.offsetWidth
        props.updateTimeProgess(pos * props.duration);
        console.table({clientX: e.clientX, rectLeft: rect.left, offsetWidth: e.target.offsetWidth });
    }


    return (
        <div className={classes.progress}  >
            <progress value="0" min="0" max={props.duration} style={{width: `${props.progress}%`}} onClick={clickHandler}>
                
            </progress>
            <div className={classes.play} style={{width: `${props.progress}%`}} ></div>
            {/* <div className={classes.hover}></div> */}
            {/* <div className={classes.rewind} onClick={onMouseMove}></div> */}
        </div>
    )
}

export default Progress
