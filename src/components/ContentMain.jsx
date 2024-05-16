import React from 'react'
import { CoffeeGrids } from './CoffeeGrids'
import { Sidebar } from './Sidebar'
import {Box} from '@chakra-ui/react'

export const ContentMain = () => {
  return (
    <Box display={'flex'}>
        <CoffeeGrids/>
        <Sidebar/>
    </Box>
  )
}
