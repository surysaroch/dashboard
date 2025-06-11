interface ArrowProps {
    isFlipped?: boolean
}

const Arrow: React.FC<ArrowProps> = ({isFlipped = false}) => {
    return (
        <svg className={`${isFlipped && "flipped-svg"}`} fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
                <path d="M50.5,19.881c-1.104,0-2,0.896-2,2V72.17L33.193,56.609c-0.781-0.781-1.922-0.781-2.703,0
                    c-0.781,0.78-0.719,2.047,0.062,2.828l18.883,18.857c0.375,0.375,0.899,0.586,1.43,0.586s1.047-0.211,1.422-0.586l18.857-18.857
                    c0.781-0.781,0.783-2.048,0.002-2.828c-0.781-0.781-2.296-0.781-3.077,0L52.5,71.933V21.881C52.5,20.776,51.604,19.881,50.5,19.881
                    z"/>

        </svg>
    );
}

export default Arrow;