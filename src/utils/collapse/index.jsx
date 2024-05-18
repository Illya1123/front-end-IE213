import React from 'react'
import * as bootstrap from 'bootstrap';

const Collapse = ({label, children, visible}) => {
    const id = new Date().getTime() + ''
    const [isVisible, setIsVisible] = React.useState(visible || false)

    const triggerBtn = React.useRef()

    /**
     * use effect to change is visible
     */
    React.useEffect(() => {
        const ele = document.getElementById(`${id}`)
        if (ele) {
            const bsCollapse = new bootstrap.Collapse(ele)
            if (isVisible) {
                bsCollapse.show()
            } else {
                bsCollapse.hide()
            }
        }
    }, [isVisible])

    /**
     * use effect to update visible from prop
     */
    React.useEffect(() => {
        setIsVisible(visible || false)
    }, [visible])

    return <>
        <div>
            <div className="gap-1">
                <a data-bs-toggle="collapse" role="button"
                   aria-expanded={isVisible}
                   aria-controls={id}
                   onClick={() => setIsVisible(prevState => !prevState)}
                >
                    {label}
                </a>
            </div>
            <div className="collapse" id={id}>
                {children}
            </div>
        </div>

    </>
}
export default Collapse