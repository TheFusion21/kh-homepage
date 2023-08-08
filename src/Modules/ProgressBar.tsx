import React from 'react';

/**
 * A progress bar component with slight animation.
 * 
 * @param {number} progress - The progress value from 0 to 100.
 * @param {string} label - The label to display.
 * @param {boolean} hiddenLabel - Whether the label should be hidden.
 */
const ProgressBar = (
  {
    progress,
    label,
    hiddenLabel,
    style = 'default',
    color = 'bg-sky-500'
  }: {
    progress: number,
    label?: string,
    hiddenLabel?: boolean,
    style?: 'striped' | 'default' | 'arrow',
    color?: 'bg-sky-500' | 'bg-green-500' | 'bg-yellow-500' | 'bg-red-500' | 'bg-blue-500' | 'bg-indigo-500' | 'bg-purple-500' | 'bg-pink-500' | 'bg-zinc-500'
  }
) => {

  return (
    <div className={`progress-bar progress-bar-${style}`} aria-label={label}>
      <div
        className={color}
        style={{ width: `${progress}%` }}
      />
      <label aria-hidden={hiddenLabel}>
        {label}
      </label>
    </div>
  )
}

export default ProgressBar;