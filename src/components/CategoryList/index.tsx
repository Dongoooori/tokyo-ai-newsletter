import { Category } from '@/constant'
import Link from 'next/link'
import React from 'react'

const CategoryList = () => {
  const categories = Object.values(Category).map((category) => {
    return {
      id: category.slug,
      name: category.name,
    }
  })
  
  return (
    <div className='flex items-center justify-center max-w-lg mx-auto gap-x-4 border border-white rounded-full py-4'>
      <Link href="/">
        <button className='text-lg'>ALL</button>
      </Link>
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <button className='text-lg'>{category.name}</button>
        </Link>
      ))}
    </div>
  )
}

export default CategoryList