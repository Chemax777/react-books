import { CirclesWithBar } from "react-loader-spinner"

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

function Loader() {
    return (
        <div style={style}>
            <CirclesWithBar
                height="100"
                width="100"
                color="#8E2C96"
                visible={true}
                ariaLabel='circles-with-bar-loading'
            />
        </div>
    )
}

export default Loader