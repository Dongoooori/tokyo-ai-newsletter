import { useCategory } from '@/hooks/useCategory';
import { PageObjectResponse } from '@notionhq/client';
import Image from 'next/image';
import React from 'react'

interface NewsListProps {
  properties: PageObjectResponse['properties'][];
}

const NewsList = ({ properties }: NewsListProps) => {
  const data = useCategory(properties);
  console.log("data: ", data)
  return (
    <div className='flex mt-40'>
      {data.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          {item.fileUrl && (
            <Image 
              src={item.fileUrl} 
              alt={item.fileName || ""} 
              width={100} 
              height={100}
              loading='eager'
            />
          )}
          <span className="text-xl font-bold">{item.title}</span>
          <span className="text-sm text-gray-600">{item.titleDescription}</span>
        </div>
      ))}
    </div>
  );
};

export default NewsList