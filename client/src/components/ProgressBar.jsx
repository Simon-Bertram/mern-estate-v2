const ProgressBar = ({ currentValue, maxValue }) => {
  return (
    <progress
      value={currentValue}
      max={maxValue}
      aria-label="progress bar"
      aria-hidden="true"
    >
      {currentValue}%
    </progress>
  )
}

export default ProgressBar
