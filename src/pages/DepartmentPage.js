import React from 'react'
import { useParams } from 'react-router-dom'

function DepartmentPage() {
  const { objectid } = useParams();

  return (
    <div>DepartmentPage</div>
  )
}

export default DepartmentPage