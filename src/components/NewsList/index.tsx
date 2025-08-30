import { useCategory } from '@/hooks/useCategory';
import { PageObjectResponse } from '@notionhq/client';
import Image from 'next/image';
import React from 'react'

interface NewsListProps {
  properties: PageObjectResponse['properties'][];
}

const NewsList = ({ properties }: NewsListProps) => {
  const data = useCategory(properties);
  const mainNewsletter = data[0];
  const subNewsletters = data.slice(1);
  console.log("data: ", data)
  return (
    <div className='flex flex-col mt-40 space-y-4'>
      {mainNewsletter && (
        <div className='flex gap-4 border border-white'>
          {mainNewsletter.fileUrl && (
            <Image 
              className='aspect-16-9'
              src={mainNewsletter.fileUrl} 
              alt={mainNewsletter.fileName || ""} 
              width={400} 
              height={300} 
              loading='eager' 
            />
          )}
          <div className='flex flex-col gap-2 p-4'>
            {mainNewsletter.title && <span className="text-xl font-bold">{mainNewsletter.title}</span>}
            {mainNewsletter.titleDescription && <span className="text-sm text-gray-600">{mainNewsletter.titleDescription}</span>}
          </div>
        </div>
      )}  
      <div className='grid grid-cols-2 gap-4'>
        {subNewsletters.map((item, index) => (
          <div key={index} className="flex gap-4 border border-white">
            {item.fileUrl && (
              <Image 
                className='aspect-16-9'
                src={item.fileUrl} 
                alt={item.fileName || ""} 
                width={200} 
                height={100}
                loading='eager'
              />
            )}
            <div className='flex flex-col gap-2 p-4'>
              {item.title && <span className="text-xl font-bold">{item.title}</span>}
              {item.titleDescription && <span className="text-sm text-gray-600 line-clamp-3">{item.titleDescription}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList