import type { CSSProperties, PropsWithChildren } from 'react'
import React, { useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import './styles.css'

type Direction = 'left' | 'right' | 'top' | 'bottom'

interface DrawerProps {
    open: boolean
    onClose?: () => void
    direction: Direction
    lockBackgroundScroll?: boolean
    duration?: number
    overlayOpacity?: number
    overlayColor?: string
    enableOverlay?: boolean
    style?: CSSProperties
    zIndex?: number
    size?: number
    className?: string
    customIdSuffix?: string
    overlayClassName?: string
}

type DirectionStyle = Pick<
    CSSProperties,
    'top' | 'left' | 'right' | 'bottom' | 'width' | 'height' | 'transform'
>

const getDirectionStyle = (
    dir: Direction,
    size?: number,
    open?: boolean,
): DirectionStyle => {
    const directionStyle: Record<Direction, DirectionStyle> = {
        left: {
            top: 0,
            left: open ? 0 : `-${size}px`,
            width: size,

            height: '100vh',
        },
        right: {
            top: 0,
            right: open ? 0 : `-${size}px`,
            width: size,
            height: '100vh',
        },
        bottom: {
            left: 0,
            right: 0,
            bottom: open ? 0 : `-${size}px`,
            width: '100%',
            height: size,
        },
        top: {
            left: 0,
            right: 0,
            top: open ? 0 : `-${size}px`,
            width: '100%',
            height: size,
        },
    }
    return directionStyle[dir]
}

const EZDrawer: React.FC<PropsWithChildren<DrawerProps>> = ({
    open,
    onClose = () => {},
    children,
    style,
    enableOverlay = true,
    overlayColor = '#000',
    overlayOpacity = 0.4,
    zIndex = 100,
    duration = 500,
    direction,
    size = 250,
    className = '',
    customIdSuffix,
    lockBackgroundScroll = false,
    overlayClassName = '',
}) => {
    const bodyRef = useRef<HTMLBodyElement | null>(null)

    useEffect(() => {
        const updatePageScroll = () => {
            bodyRef.current = document.body as HTMLBodyElement
            if (bodyRef.current && lockBackgroundScroll) {
                bodyRef.current.style.overflow = open ? 'hidden' : ''
            }
        }
        updatePageScroll()
    }, [open, lockBackgroundScroll])

    const idSuffix = useMemo(() => {
        return customIdSuffix || (Math.random() + 1).toString(36).substring(7)
    }, [customIdSuffix])

    const overlayStyles: CSSProperties = {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        zIndex: zIndex,
    }

    const drawerStyles: CSSProperties = {
        zIndex: zIndex + 1,
        transitionDuration: `${duration}ms`,
        ...getDirectionStyle(direction, size, open),
        ...style,
    }

    const drawerContent = (
        <div id={`EZDrawer${idSuffix}`} className={`EZDrawer ${className}`}>
            <input
                type='checkbox'
                id={`EZDrawer__checkbox${idSuffix}`}
                className='EZDrawer__checkbox'
                onChange={onClose}
                checked={open}
            />
            <nav
                role='navigation'
                id={`EZDrawer__container${idSuffix} EZDrawer__container_${open ? 'open' : ''} EZDrawer__container_${direction}`}
                style={drawerStyles}
                className={`EZDrawer__container ${className} EZDrawer__container_${open ? 'open' : 'closed'} EZDrawer__container_${direction}`}
            >
                {children}
            </nav>
            {enableOverlay && (
                <label
                    htmlFor={`EZDrawer__checkbox${idSuffix}`}
                    id={`EZDrawer__overlay${idSuffix}`}
                    className={`EZDrawer__overlay ${overlayClassName}`}
                    style={overlayStyles}
                />
            )}
        </div>
    )

    return <>{createPortal(drawerContent, document.body)}</>
}

export default EZDrawer
