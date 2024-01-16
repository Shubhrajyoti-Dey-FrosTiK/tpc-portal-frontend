"use client"
import { Typography } from '../../components/components'
import { Url } from 'next/dist/shared/lib/router/router';
import React from 'react'
import { Card, Image, Text } from "../../components/components"

export interface CompanyData {
    [key:string] : string
}

export default function CompanyCard(props: CompanyData) {
    return (
        <div>
            <Card
                shadow="md"
                component="a"
                target="_blank"
                className='mt-4 p-6 sm:w-full w-[95%] h-[220px]'
            >
                <div className='flex flex-row justify-between'>
                    <div>
                        <img
                            className="h-[120px] w-[120px] rounded-full"
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" // Replace with your image URL
                            alt="Your Alt Text"
                        />
                        <div className='mt-2'>
                        <Typography order={5}>Company Name</Typography>
                        <Typography order={5}>Internship 2023-24</Typography>
                        </div>
                    </div>
                    <div>
                        <Typography order={4}>Eligibility Criteria</Typography>
                        <p>X:95%</p>
                    </div>
                    <div>
                        <Typography order={4}>Details</Typography>
                    </div>
                    <div>
                    <Typography order={4}>Choice</Typography>
                    </div>
                </div>

            </Card>
        </div>
    )
}
