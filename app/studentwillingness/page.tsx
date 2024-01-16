"use client"
import React from 'react'
import CompanyComponent from '../../components/companyComponent/companyComponent';
import { Typography } from '../../components/components';

export default function page() {

    return (
        <div>
            <div>
                <Typography order={1} className="border-b-4">Opportunities</Typography>
            </div>
            <div>
                <CompanyComponent />
            </div>
        </div>
    )
}
