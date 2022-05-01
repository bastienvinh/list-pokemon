import React from "react"


interface RoundedBadgeProps {
  children?: React.ReactNode
  color?: string
}

const RoundedBadge: React.FC<RoundedBadgeProps> = ({ children, color }) => {
  return (
    <span className={`text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 ${color ?? ""} text-white rounded-full`}>{children}</span>
  )
}

export default RoundedBadge
