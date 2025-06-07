'use client';

import { atom, useAtom } from 'jotai';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'

import { useGeolocation } from '@uidotdev/usehooks'

const useGeolocationAtom = atom(false)

const onClick = atom(async (ge))

export const GeolocationCard = () => {
  const [geolocation, usingGeolocation] = useAtom(useGeolocationAtom)
  return (
    <Card className='mb-6 border-orange-200 border-dashed bg-gradient-to-r from-orange-50 to-orange-100'>
      <CardContent className='p-4'>
        <div className='flex items-start space-x-3'>
          <div className='flex-1 min-w-0'>
            <h3 className='text-sm font-medium text-gray-900 mb-1'>📍 grant location permission</h3>
            <p className='text-xs text-gray-600 mb-3'>granting permission gives me more accurate data. i wont sell it, i promise</p>

            <div className='flex gap-2 items-center'>
              <Button></Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
