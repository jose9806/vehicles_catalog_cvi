import state from '../state'
const CameraButtons = ({}) => {
    const positions = {
        1:{
            cameraPosition: [4,-5,3],
            target: [3,-6,0],
            name:"Object_9"
        },
        2:{
            cameraPosition: [-4,-5,3],
            target: [-3,-6,0],
            name:"Object_72"
        }
    }
    const handleClick = (num) =>{
        state.cameraPos.set(...positions[num].cameraPosition)
        state.target.set(...positions[num].target)
        state.activeMeshName = positions[num].name
        state.shouldUpdate = true
    }
    return(
        <>
        <button
            onClick={e=>handleClick(2)}
            style={{
            zIndex:1,
            position:'absolute',
            bottom:'30vh',
            left:'40vw',
            width: '30px',
            height:'30px',
            background: 'white',
            textAlign:'center',
            borderRadius: '100%',
            fontSize: 20,
            fontWeight: 'bold',
            opacity: 0.7,
            border:'1px solid black',
            cursor:'pointer'}}>
                {'<'}
        </button>
        <button
        onClick={e=>handleClick(1)}
            style={{
                zIndex:1,
                position: 'absolute',
                bottom: '30vh',
                right:'40vw',
                width: '30px',
                height:'30px',
                background: 'white',
                textAlign:'center',
                borderRadius: '100%',
                fontSize: 20,
                fontWeight: 'bold',
                opacity: 0.7,
                border:'1px solid black',
                cursor: 'pointer'
            }}>
            {'>'}
        </button>
        </>
    )
}
export default CameraButtons