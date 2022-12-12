function LengthIndicator({ inputString, maxLength }) {
    return (
        <p className={inputString.trimStart().length <= maxLength? "length__indicator" : "length__indicator__exceeded" }>
            {inputString.trimStart().length} / {maxLength}
        </p>
    )
}

export default LengthIndicator;