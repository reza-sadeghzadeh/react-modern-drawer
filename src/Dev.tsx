import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import EZDrawer from '.'
import './dev.css'

const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [direction, setDirection] = useState<
        'left' | 'right' | 'top' | 'bottom'
    >('right')
    const [enableOverlay, setEnableOverlay] = useState(true)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                display: 'flex',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                    style={{
                        backgroundColor: 'rgb(3, 173, 252)',
                        color: 'rgb(255, 255, 255)',
                        borderRadius: '5px',
                        border: 'none',
                        padding: '10px 25px',
                        cursor: 'pointer',
                        margin: '5px',
                        width: '200px',
                    }}
                    onClick={() => {
                        toggleDrawer()
                    }}
                >
                    Open
                </button>

                <select
                    value={direction}
                    style={{
                        width: '200px',
                        margin: '5px',
                        padding: '10px 0',
                        borderRadius: '5px',
                        border: '1px solid rgb(204, 204, 204)',
                        cursor: 'pointer',
                    }}
                    onChange={(e) =>
                        setDirection(
                            e.target.value as
                                | 'left'
                                | 'right'
                                | 'top'
                                | 'bottom',
                        )
                    }
                >
                    <option value='left'>Left</option>
                    <option value='right'>Right</option>
                    <option value='top'>Top</option>
                    <option value='bottom'>Bottom</option>
                </select>
                <button
                    style={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: enableOverlay
                            ? 'rgb(66, 190, 103)'
                            : 'rgb(255, 0, 0)',
                        borderRadius: '5px',
                        border: enableOverlay
                            ? '1px solid rgb(66, 190, 103)'
                            : '1px solid red',
                        padding: '10px 25px',
                        cursor: 'pointer',
                        margin: '5px',
                        width: '200px',
                    }}
                    onClick={() => setEnableOverlay((prev) => !prev)}
                >
                    {enableOverlay ? 'Enabled' : 'Disabled'} Overlay
                </button>
            </div>
            <EZDrawer
                open={isOpen}
                onClose={toggleDrawer}
                direction={direction}
                enableOverlay={enableOverlay}
                overlayColor='#000000' // Ensure valid hex format
                className='custom-drawer'
                overlayClassName='custom-overlay'
            >
                <div style={{ padding: '20px' }}>
                    <h2>EZDrawer Content</h2>
                    <p>
                        This is the content of the drawer. You can customize it
                        as needed.
                    </p>
                    <button onClick={toggleDrawer}>Close Drawer</button>
                </div>
            </EZDrawer>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
