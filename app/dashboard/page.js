"use client"
import React from 'react'
import Barchart from '../../components/Bachart'  
import Layout from '@/components/Layout'

import Notification from '../../components/Notification'  
import Box from '../../components/Box'
const page = ({session,signOut}) => {
 
   
  return (
    
    <Layout session={session} signOut={signOut}>
      <Box/>
    <div className='flex flex-row items-center p-4 rounded-xl border-2 gap-10 sm:flex-col md:flex-row lg:flex-row '> 
     
    <div className="hidden lg:block">
  <Barchart />
</div>

     <Notification/>
     

    
      
    </div>
   
   </Layout>
  )
}

export default page
