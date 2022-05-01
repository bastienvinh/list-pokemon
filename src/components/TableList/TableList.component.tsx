import React, { useMemo } from "react"
import { useTable, CellProps, useRowSelect } from "react-table"
import PokemonModel, { PokemonModelType } from "../../models/Pokemon.model"
import RoundedBadge from "../RoundedBadge/RoundedBadge.component"

import "./TableList.styles.scss"

interface TableListProps {
  data: Array<PokemonModel>
}

// Default color for types
const TypesColor = {
  "normal": "bg-neutral-300",
  "fighting": "bg-amber-800",
  "flying": "bg-amber-600",
  "poison": "bg-violet-900",
  "ground": "bg-amber-900",
  "rock": "bg-stone-500",
  "bug": "bg-green-700",
  "ghost": "bg-violet-700",
  "steel": "bg-neutral-500",
  "fire": "bg-red-700",
  "water": "bg-blue-400",
  "grass": "bg-green-600",
  "electric": "bg-yellow-400",
  "psychic": "bg-violet-900",
  "ice": "bg-blue-300",
  "dragon": "bg-lime-100",
  "dark": "blackbg-slate-900",
  "shadow": "bg-gray-800"
}

type KEYOF_TypesColor = keyof typeof TypesColor

export const TableList: React.FC<TableListProps> = ({ data }) => {
  
  const onChangeSelectedMonsterHandler = () => {
    
  }

  const columns = useMemo(() => [
    {
      Header: "",
      accessor: "caught",
      Cell: ({ row }: CellProps<PokemonModel>) => {
        const data = row.original
        return <input type="checkbox" name={`input-checkbox-${data.id}`} onChange={onChangeSelectedMonsterHandler} />
      }
    },
    {
      Header: "#",
      accessor: "id"
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value, row: { original } }: CellProps<PokemonModel>) => {
        return <div className="flex flex-col justify-center items-center">
          <img src={original.defaultImageUrl} alt={value} />
          <span>{value}</span>
        </div>
      }
    },
    {
      Header: "Types",
      accessor: "types",
      Cell: ({ value }: CellProps<object>) => {
        return value.map((type: PokemonModelType) => (<RoundedBadge color={TypesColor[type.name as KEYOF_TypesColor]} >{type.name}</RoundedBadge>))
      }
    },
    {
      Header: "Action",
      Cell: () => (<button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Show</button>)
    }
  ], [])

  // @ts-expect-error
  const tableInstance = useTable({ columns, data }, useRowSelect)
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  // #endregion

  return (
    <form className="grid">
      <table className="table-list-pokemon table-auto" {...getTableProps()}>
        <colgroup>
          <col className="table-group-caught"></col>
          <col className="table-group-id"></col>
          <col className="table-group-name"></col>
        </colgroup>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td className="text-center" {...cell.getCellProps()}>
                      {// Render the cell contents
                      cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </form>
  )
}


export default TableList