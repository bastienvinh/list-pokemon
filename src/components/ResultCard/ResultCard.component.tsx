import React from 'react'
import "./ResultCard.styles.scss"

interface ResultCardProps {
  max: number
  nb: number
  percent: number
}

const ResultCard: React.FC<ResultCardProps> = ({ max, nb, percent }) => {
  return (
    <div className="result rounded p-4 shadow bg-green-200">
      <div className="total-caught">
        <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded">{percent}%</span>
      </div>
      <div className="seperator bg-green-900"></div>
      <div className="total-numbers">
        <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded">{nb} / {max}</span>
      </div>
    </div>
  )
}

export default ResultCard
