"use client"
import React, { useEffect, useState } from 'react'
import { Pagination } from '@mantine/core'
import CompanyCard from './companyCard';
export default function CompanyComponent() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const data = { length: 30 }
    return (
        <div>
            <div className='flex flex-row justify-end mt-4'>
                <Pagination total={data.length} defaultValue={currentPage} onChange={setCurrentPage} />
            </div>
            <div><CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard /></div>
        </div>
    )
}
